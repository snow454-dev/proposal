"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import SectionLabel from "@/components/ui/SectionLabel";

const CATEGORY_COLORS: Record<string, string> = {
  交通: "#c9a84c",
  観光: "#7ec8a0",
  行政: "#a8c4e0",
  医療: "#f4a0a0",
  商業: "#c9a84c",
  教育: "#b0a8e0",
};

const LOCATION_IMAGES = [
  "/images/location/station.jpg",
  "/images/location/shrine.jpg",
  "/images/location/cityhall.jpg",
  "/images/location/hospital.jpg",
  "/images/location/mansion.jpg",
  "/images/location/shrine-detail.jpg",
];

export default function Location() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section ref={ref} className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionLabel en="LOCATION" ja="立地・アクセス" light />

        <motion.h2
          className="font-noto text-[#1a1a1a] text-3xl md:text-4xl mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          城下町の中心に位置する
        </motion.h2>
        <motion.p
          className="font-noto text-[#4a4a4a] mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {siteConfig.address}
        </motion.p>

        <div className="grid md:grid-cols-2 gap-8 items-start">

          {/* ── 施設リスト ── */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {siteConfig.location.map((loc, i) => (
              <div
                key={loc.name}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`flex items-center justify-between rounded-lg border px-5 py-4 transition-all duration-200 cursor-default select-none ${
                  hoveredIdx === i
                    ? "border-[#c9a84c]/50 bg-[#f8f6f2]"
                    : "border-[#e8e3db] bg-white hover:bg-[#f8f6f2]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="text-[10px] px-2 py-0.5 rounded font-inter shrink-0"
                    style={{
                      color: CATEGORY_COLORS[loc.category] ?? "#c9a84c",
                      border: "1px solid",
                      borderColor: `${CATEGORY_COLORS[loc.category] ?? "#c9a84c"}44`,
                    }}
                  >
                    {loc.category}
                  </span>
                  <span className="font-noto text-[#1a1a1a] text-sm">{loc.name}</span>
                </div>
                <span className="font-inter text-brand-gold text-sm shrink-0 ml-4">
                  {loc.time}
                </span>
              </div>
            ))}
          </motion.div>

          {/* ── 右パネル：画像クロスフェード ── */}
          <motion.div
            className="relative rounded-lg overflow-hidden border border-[#e8e3db]"
            style={{ minHeight: "360px" }}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {LOCATION_IMAGES.map((src, i) => (
              <div
                key={src}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  hoveredIdx === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <Image
                  src={src}
                  alt={siteConfig.location[i]?.name ?? ""}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={80}
                />
              </div>
            ))}

            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 pointer-events-none transition-opacity duration-500 ${
                hoveredIdx !== null ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="absolute bottom-4 left-5 z-20 pointer-events-none">
              <p
                className={`font-noto text-white text-sm tracking-wide transition-opacity duration-300 ${
                  hoveredIdx !== null ? "opacity-100" : "opacity-0"
                }`}
              >
                {hoveredIdx !== null ? siteConfig.location[hoveredIdx].name : ""}
              </p>
              <p
                className={`font-inter text-brand-gold text-xs mt-0.5 transition-opacity duration-300 ${
                  hoveredIdx !== null ? "opacity-100" : "opacity-0"
                }`}
              >
                {hoveredIdx !== null ? siteConfig.location[hoveredIdx].time : ""}
              </p>
            </div>

            {/* デフォルト表示（未ホバー時のプレースホルダー） */}
            <div
              className={`absolute inset-0 flex flex-col items-center justify-center gap-4 transition-opacity duration-300 pointer-events-none bg-[#f8f6f2] ${
                hoveredIdx === null ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="w-3 h-3 rounded-full bg-brand-gold animate-pulse" />
              <p className="font-noto text-[#4a4a4a] text-sm">施設にマウスオーバー</p>
              <p className="font-inter text-[#4a4a4a]/40 text-xs">で周辺画像を表示</p>

              <svg
                className="absolute inset-0 w-full h-full opacity-10"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <defs>
                  <pattern id="loc-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#loc-grid)" />
              </svg>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
