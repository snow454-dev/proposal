"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import SectionLabel from "@/components/ui/SectionLabel";

export default function Amenities() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section ref={ref} className="py-32 px-8 md:px-16 bg-[#f8f6f2]">
      <div className="max-w-5xl mx-auto">
        <SectionLabel en="AMENITIES" ja="共用施設・設備" light />

        <motion.h2
          className="font-noto text-[#1a1a1a] text-3xl md:text-4xl mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          上質な日常を支える設備
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {siteConfig.amenities.map((item, i) => (
            <motion.div
              key={item.title}
              className="rounded-lg overflow-hidden group border border-[#e8e3db] hover:border-[#c9a84c]/40 transition-colors duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <div className="relative h-32 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-[600ms] group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent" />
              </div>

              <div className="bg-white px-4 py-3">
                <p className="font-cinzel text-brand-gold text-xs tracking-wider mb-0.5">{item.title}</p>
                <p className="font-inter text-[#4a4a4a] text-[11px]">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
