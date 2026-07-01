"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GoldParticles from "@/components/ui/GoldParticles";
import FloorplanNav from "@/components/ui/FloorplanNav";

gsap.registerPlugin(ScrollTrigger);

const ROOMS = [
  {
    en: "Entrance Hall",
    ja: "ラグジュアリーな玄関ホール",
    desc: "正面の窓から望む眺望。ゲストを迎え入れる、広々とした玄関ホール。",
    src: "/images/rooms/entrance.webp",
    area: null,
  },
  {
    en: "Hotel-Like Bathroom",
    ja: "ホテルライクなバスルーム",
    desc: "大判の石調タイルとガラスの間仕切り。まるで海外ホテルのような寛ぎ。",
    src: "https://images.unsplash.com/photo-1620626011761-996317b8d101?w=1600",
    area: null,
  },
  {
    en: "High-Spec Kitchen",
    ja: "ハイスペックなキッチン",
    desc: "ビルトイン家電と造作収納。料理も団らんも美しく仕上げる、上質なキッチン。",
    src: "/images/rooms/kitchen.webp",
    area: 9.42,
  },
  {
    en: "Open Living Room",
    ja: "開放感あふれるリビング",
    desc: "2面採光がもたらす明るさと眺望。大空間のLDKがもたらす、ゆとりの暮らし。",
    src: "/images/rooms/living.webp",
    area: 41.67,
  },
  {
    en: "Premium Bedroom",
    ja: "上質なベッドルーム",
    desc: "間接照明が照らす、落ち着いた寝室。一日の終わりを上質なくつろぎへ。",
    src: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=1600",
    area: 19.62,
  },
] as const;

const N = ROOMS.length;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function RoomShowcase() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imgWrapRefs = useRef<(HTMLDivElement | null)[]>(Array(N).fill(null));
  const glowRef = useRef<HTMLDivElement>(null);
  const glowRafRef = useRef<number | null>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });

  const prevScrollRoomRef = useRef(-1);
  const isFirstRoomEffect = useRef(true);

  const [activeIdx, setActiveIdx] = useState(0);
  const [displayArea, setDisplayArea] = useState(0);

  // ── Initial text fade-in ─────────────────────────────────────────────────
  useEffect(() => {
    if (!textRef.current) return;
    gsap.fromTo(
      textRef.current,
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.5, ease: "power2.out" }
    );
  }, []);

  // ── Area counter animation ───────────────────────────────────────────────
  useEffect(() => {
    const target = ROOMS[activeIdx].area;
    if (target === null) { setDisplayArea(0); return; }

    const duration = 1100;
    const start = performance.now();
    let rafId: number;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplayArea(target * easeOutCubic(t));
      if (t < 1) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [activeIdx]);

  // ── Ken Burns + text slide-up on room change ─────────────────────────────
  useEffect(() => {
    imgWrapRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.killTweensOf(el);
      if (i === activeIdx) {
        gsap.set(el, { scale: 1, y: 0 });
        gsap.to(el, { scale: 1.08, duration: 6, ease: "none" });
      }
    });

    if (!isFirstRoomEffect.current && textRef.current) {
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.72, ease: "power2.out" }
      );
    }
    isFirstRoomEffect.current = false;
  }, [activeIdx]);

  // ── ScrollTrigger: room index + parallax ────────────────────────────────
  useEffect(() => {
    if (!containerRef.current) return;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      onUpdate(self) {
        const raw = self.progress * N;
        const idx = Math.min(N - 1, Math.floor(raw));
        const roomLocal = raw - Math.floor(raw);

        if (idx !== prevScrollRoomRef.current) {
          prevScrollRoomRef.current = idx;
          setActiveIdx(idx);
        }

        const el = imgWrapRefs.current[idx];
        if (el) gsap.set(el, { y: roomLocal * -28 });
      },
    });

    return () => st.kill();
  }, []);

  // ── Cursor glow (desktop only) ───────────────────────────────────────────
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = () => {
      const glow = glowRef.current;
      if (glow) {
        glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
        glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;
        glow.style.left = `${glowPos.current.x - 120}px`;
        glow.style.top = `${glowPos.current.y - 120}px`;
      }
      glowRafRef.current = requestAnimationFrame(tick);
    };
    glowRafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (glowRafRef.current !== null) cancelAnimationFrame(glowRafRef.current);
    };
  }, []);

  // ── Dot click → smooth scroll to room midpoint ──────────────────────────
  const scrollToRoom = useCallback((idx: number) => {
    if (!containerRef.current) return;
    const total = containerRef.current.offsetHeight - window.innerHeight;
    const targetY = containerRef.current.offsetTop + total * ((idx + 0.5) / N);
    window.scrollTo({ top: targetY, behavior: "smooth" });
  }, []);

  // Progress bar fill: 0→100% across rooms
  const progressPct = ((activeIdx / (N - 1)) * 100).toFixed(1);

  return (
    <section ref={containerRef} style={{ height: "600vh" }} className="relative">
      <h1 className="sr-only">YONEZAWA RESIDENCE — 山形県米沢市の高級分譲マンション</h1>

      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Gold particle canvas */}
        <GoldParticles />

        {/* Cursor glow */}
        <div
          ref={glowRef}
          className="absolute z-[4] pointer-events-none rounded-full"
          style={{
            width: 240,
            height: 240,
            background: "radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)",
            top: -120,
            left: -120,
          }}
        />

        {/* ── Background image layers ── */}
        {ROOMS.map((room, i) => (
          <div
            key={room.en}
            aria-hidden={i !== activeIdx}
            className={`absolute inset-0 transition-opacity duration-[1100ms] ease-in-out ${
              i === activeIdx ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              ref={(el) => { imgWrapRefs.current[i] = el; }}
              className="absolute origin-center"
              style={{ inset: "-6%", willChange: "transform" }}
            >
              <Image
                src={room.src}
                alt={room.ja}
                fill
                className="object-cover"
                priority={i === 0}
                quality={85}
                sizes="110vw"
              />
            </div>
          </div>
        ))}

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.24) 40%, rgba(0,0,0,0.08) 100%)",
          }}
        />

        {/* ── Left vertical progress bar ── */}
        <div
          className="absolute left-5 top-1/2 -translate-y-1/2 z-20 pointer-events-none"
          style={{ width: 2, height: 120, background: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="absolute bottom-0 left-0 w-full transition-all duration-700 ease-in-out"
            style={{
              height: `${progressPct}%`,
              background: "linear-gradient(to top, #c9a84c, rgba(201,168,76,0.3))",
            }}
          />
        </div>

        {/* ── Room label + heading + description + area ── */}
        <div
          ref={textRef}
          className="absolute bottom-24 left-8 md:left-16 z-20 max-w-lg pointer-events-none"
        >
          <p
            className="font-cinzel text-[10px] tracking-[0.6em] uppercase mb-3"
            style={{ color: "#c9a84c" }}
          >
            {ROOMS[activeIdx].en}
          </p>
          <h2
            className="font-noto text-[1.85rem] md:text-5xl leading-snug mb-5"
            style={{ color: "#e8eef7" }}
          >
            {ROOMS[activeIdx].ja}
          </h2>
          <p
            className="font-noto text-sm md:text-base leading-[1.9]"
            style={{ color: "#a8b4c8" }}
          >
            {ROOMS[activeIdx].desc}
          </p>

          {/* Area counter */}
          {ROOMS[activeIdx].area !== null && (
            <p
              className="font-inter text-xs tracking-widest mt-4"
              style={{ color: "rgba(201,168,76,0.75)" }}
            >
              {displayArea.toFixed(2)} ㎡
            </p>
          )}
        </div>

        {/* ── SCROLL hint ── */}
        <div
          className={`absolute bottom-7 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-700 ${
            activeIdx === 0 ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <span
            className="font-cinzel text-[9px] tracking-[0.55em] uppercase"
            style={{ color: "#c9a84c" }}
          >
            SCROLL
          </span>
          <div
            className="w-px h-7 animate-bounce"
            style={{ background: "linear-gradient(to bottom, #c9a84c, transparent)" }}
          />
        </div>

        {/* ── Right-side progress dots ── */}
        <nav
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-[18px]"
          aria-label="部屋ナビゲーション"
        >
          {ROOMS.map((room, i) => (
            <button
              key={i}
              onClick={() => scrollToRoom(i)}
              aria-label={room.ja}
              aria-current={i === activeIdx ? "true" : undefined}
              className="relative flex items-center justify-center w-5 h-5 group"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i !== activeIdx
                    ? "w-[6px] h-[6px] bg-white/35 group-hover:bg-white/65 group-hover:scale-125"
                    : "w-[10px] h-[10px]"
                }`}
                style={i === activeIdx ? { background: "#c9a84c" } : {}}
              />
              {i === activeIdx && (
                <span
                  className="absolute inset-0 rounded-full border animate-ping"
                  style={{ borderColor: "rgba(201,168,76,0.4)" }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* ── Floorplan navigator (bottom-right) ── */}
        <FloorplanNav activeIdx={activeIdx} />

      </div>
    </section>
  );
}
