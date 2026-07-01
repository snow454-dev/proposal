"use client";
import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const SLIDES = [
  {
    sub: "SNOW COUNTRY",
    title: "雪国仕様の設計",
    desc: "山形・米沢の豪雪にも耐える構造。融雪設備と断熱性能で、冬でも快適な暮らしを実現します。",
    image: "https://images.unsplash.com/photo-1551524559-8af4e6624178?w=1600",
  },
  {
    sub: "100 YEARS",
    title: "100年住み継げる建物",
    desc: "長期優良住宅認定基準を超える耐久性能。世代を超えて住み継げる、確かな品質。",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600",
  },
  {
    sub: "ASSET GROWTH",
    title: "価値が上がる資産としてのマンション",
    desc: "米沢駅前再開発エリアの立地。住むほどに価値が高まる、資産性を備えたマンションです。",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600",
  },
  {
    sub: "RENT TO OWN",
    title: "住んでから決められる購入プラン",
    desc: "まずは賃貸で暮らしを試し、納得したうえで購入へ。柔軟な住まい方を選べる新しい制度です。",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1600",
  },
  {
    sub: "PRIVATE GARDEN",
    title: "小さな庭のようなバルコニー",
    desc: "広々とした専用バルコニーは、季節の草花を育てる小さな庭に。街を見下ろす特等席です。",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1600",
  },
  {
    sub: "COVERED PARKING",
    title: "屋根付き駐車場・駐輪場",
    desc: "全戸専用駐車場を屋内に確保。雪の日も濡れずに車へアクセスでき、雪かきの負担もありません。",
    image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=1600",
  },
];

export default function Gallery() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-15%" });
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMouse({ x, y });
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: 0, y: 0 });
  }, []);

  const prev = () => setActive((a) => (a - 1 + SLIDES.length) % SLIDES.length);
  const next = () => setActive((a) => (a + 1) % SLIDES.length);

  return (
    <section ref={sectionRef} className="py-32 px-8 md:px-16 bg-[#f8f6f2] overflow-hidden">
      <div className="max-w-5xl mx-auto">
        <SectionLabel en="FEATURES" ja="特徴" light />

        <motion.h2
          className="font-noto text-[#1a1a1a] text-3xl md:text-4xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          特徴
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Main slide */}
          <div
            className="relative rounded-lg overflow-hidden h-72 md:h-[480px] cursor-none"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >
                {/* Image with parallax pan */}
                <motion.div
                  className="absolute inset-[-4%]"
                  animate={{
                    x: `${mouse.x * 2}%`,
                    y: `${mouse.y * 1}%`,
                    scale: 1.0,
                  }}
                  initial={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 60, damping: 20 }}
                >
                  <Image
                    src={SLIDES[active].image}
                    alt={SLIDES[active].title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 80vw"
                    priority={active === 0}
                  />
                </motion.div>

                {/* Gradient overlay — lighter per spec */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex items-end justify-between gap-6">
                  <div className="flex-1 min-w-0">
                    <p className="font-cinzel text-brand-gold text-xs tracking-[0.4em] mb-2">
                      {SLIDES[active].sub}
                    </p>
                    <p className="font-noto text-white text-xl md:text-2xl mb-2 leading-snug">
                      {SLIDES[active].title}
                    </p>
                    <p className="font-noto text-white/75 text-xs md:text-sm leading-relaxed hidden md:block">
                      {SLIDES[active].desc}
                    </p>
                  </div>
                  <p className="font-inter text-white/50 text-sm flex-shrink-0">
                    {active + 1} / {SLIDES.length}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Arrow buttons */}
            <button
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-brand-gold/60 hover:bg-black/60 transition-all duration-300 text-white/70 z-10"
            >
              ←
            </button>
            <button
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:border-brand-gold/60 hover:bg-black/60 transition-all duration-300 text-white/70 z-10"
            >
              →
            </button>
          </div>

          {/* Dot indicators */}
          <div className="flex items-center mt-5">
            <div className="flex gap-2 items-center">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-6 h-1.5 bg-brand-gold"
                      : "w-1.5 h-1.5 bg-[#e8e3db] hover:bg-[#c9a84c]/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="mt-4 grid grid-cols-6 gap-2">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative h-14 rounded overflow-hidden border-2 transition-all duration-300 ${
                  i === active
                    ? "border-brand-gold"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
                {i === active && (
                  <div className="absolute inset-0 ring-2 ring-brand-gold/50 ring-inset" />
                )}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
