"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import SectionLabel from "@/components/ui/SectionLabel";

export default function FloorGuide() {
  const [active, setActive] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const floors = siteConfig.floors_guide;

  return (
    <section ref={ref} className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-5xl mx-auto">
        <SectionLabel en="FLOOR GUIDE" ja="フロアガイド" light />

        <motion.h2
          className="font-noto text-[#1a1a1a] text-3xl md:text-4xl mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          各フロアのご案内
        </motion.h2>

        {/* Tab buttons */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {floors.map((f, i) => (
            <button
              key={f.range}
              onClick={() => setActive(i)}
              className={`px-6 py-3 rounded-md font-cinzel text-xs tracking-widest transition-all duration-300 ${
                active === i
                  ? "text-white"
                  : "bg-white text-[#1a1a1a] border border-[#c9a84c] hover:border-[#b8973f]"
              }`}
              style={active === i ? { backgroundColor: f.color } : {}}
            >
              {f.range}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2 gap-12"
          >
            {/* Floor info */}
            <div>
              <p
                className="font-cinzel text-xs tracking-[0.4em] mb-2"
                style={{ color: floors[active].color }}
              >
                {floors[active].label}
              </p>
              <p className="font-noto text-[#1a1a1a] text-2xl mb-6">{floors[active].labelJa}</p>
              <p className="font-noto text-[#4a4a4a] leading-loose mb-8">
                {floors[active].description}
              </p>
              <ul className="space-y-3">
                {floors[active].rooms.map((r) => (
                  <li key={r} className="flex items-center gap-3 font-inter text-sm text-[#4a4a4a]">
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: floors[active].color }}
                    />
                    {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Image preview panel */}
            <div className="relative rounded-lg overflow-hidden h-72 md:h-auto min-h-64 group">
              <Image
                src={floors[active].image}
                alt={floors[active].labelJa}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to top, ${floors[active].color}55 0%, transparent 60%)`,
                }}
              />
              <div className="absolute bottom-4 left-4">
                <p className="font-cinzel text-xs tracking-widest" style={{ color: floors[active].color }}>
                  {floors[active].range}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
