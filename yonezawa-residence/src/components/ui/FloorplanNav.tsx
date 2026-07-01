"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

// Polygon points in "0 0 100 100" viewBox space (4 corners each)
const ROOM_POLYGONS: Record<number, string> = {
  0: "5,70 40,70 40,96 5,96",    // Entrance Hall
  1: "42,68 62,68 62,96 42,96",  // Bathroom
  2: "5,52 40,52 40,68 5,68",    // Kitchen
  3: "5,5 60,5 60,50 5,50",      // Living Room
  4: "62,5 96,5 96,65 62,65",    // Master Bedroom
};

const ROOM_LABELS = [
  "玄関ホール",
  "バスルーム",
  "キッチン",
  "リビング",
  "ベッドルーム",
];

interface Props {
  activeIdx: number;
}

export default function FloorplanNav({ activeIdx }: Props) {
  const polyRef = useRef<SVGPolygonElement>(null);
  const pulseRef = useRef<SVGPolygonElement>(null);
  const pulseAnim = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const poly = polyRef.current;
    const pulse = pulseRef.current;
    if (!poly || !pulse) return;

    const pts = ROOM_POLYGONS[activeIdx] ?? ROOM_POLYGONS[0];

    gsap.to([poly, pulse], {
      attr: { points: pts },
      duration: 0.65,
      ease: "power2.inOut",
    });

    // Kill previous pulse and restart
    pulseAnim.current?.kill();
    pulseAnim.current = gsap.fromTo(
      pulse,
      { attr: { "stroke-opacity": 0.8 } },
      { attr: { "stroke-opacity": 0 }, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut" }
    );

    return () => { pulseAnim.current?.kill(); };
  }, [activeIdx]);

  return (
    <div className="absolute bottom-8 right-6 z-30 pointer-events-none select-none">
      {/* Room label */}
      <p
        className="font-cinzel text-[9px] tracking-[0.5em] uppercase mb-2 text-right"
        style={{ color: "#c9a84c" }}
      >
        {ROOM_LABELS[activeIdx]}
      </p>

      {/* Panel */}
      <div
        className="relative rounded-sm overflow-hidden"
        style={{ width: 280, height: 260, border: "1px solid rgba(201,168,76,0.2)" }}
      >
        {/* Floorplan image */}
        <Image
          src="/images/floorplan/floorplan.webp"
          alt="間取り図"
          fill
          className="object-cover"
          style={{ opacity: 0.45 }}
          sizes="280px"
          priority
        />

        {/* SVG highlight overlay */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="fp-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Fill highlight */}
          <polygon
            ref={polyRef}
            points={ROOM_POLYGONS[activeIdx] ?? ROOM_POLYGONS[0]}
            fill="rgba(201,168,76,0.22)"
            stroke="#c9a84c"
            strokeWidth="0.6"
            filter="url(#fp-glow)"
          />

          {/* Pulse ring */}
          <polygon
            ref={pulseRef}
            points={ROOM_POLYGONS[activeIdx] ?? ROOM_POLYGONS[0]}
            fill="none"
            stroke="#c9a84c"
            strokeWidth="1.2"
            strokeOpacity="0.8"
          />
        </svg>
      </div>
    </div>
  );
}
