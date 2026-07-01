"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { siteConfig } from "@/config/site.config";
import SectionLabel from "@/components/ui/SectionLabel";

const SEASONS = [
  {
    label: "春",
    en: "Spring",
    desc: "桜並木と上杉公園の彩り",
    image: "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?w=800",
  },
  {
    label: "夏",
    en: "Summer",
    desc: "青田に映える吾妻連峰",
    image: "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800",
  },
  {
    label: "秋",
    en: "Autumn",
    desc: "紅葉が染める城下町",
    image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800",
  },
  {
    label: "冬",
    en: "Winter",
    desc: "純白の雪景色と静けさ",
    image: "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800",
  },
];

function SnowParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: Math.random() * 0.6 + 0.2,
      opacity: Math.random() * 0.5 + 0.2,
    }));

    let rafId: number;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 238, 247, ${p.opacity})`;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.y > canvas.height) { p.y = -5; p.x = Math.random() * canvas.width; }
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      });
      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Concept() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section ref={ref} className="relative py-32 px-8 md:px-16 overflow-hidden bg-brand-dark">
      <SnowParticles />

      <div className="relative z-10 max-w-5xl mx-auto">
        <SectionLabel en="CONCEPT" ja="コンセプト" />

        <motion.h2
          className="font-noto text-brand-ice text-3xl md:text-5xl leading-relaxed mb-12 whitespace-pre-line"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {siteConfig.concept.title}
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-2 gap-12 items-start"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <p className="font-noto text-brand-ice-dim text-base leading-loose whitespace-pre-line">
            {siteConfig.concept.body}
          </p>

          <div className="grid grid-cols-2 gap-4">
            {SEASONS.map((s, i) => (
              <motion.div
                key={s.en}
                className="rounded-lg overflow-hidden relative h-44 group"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.7 + i * 0.1 }}
              >
                {/* Background image */}
                <Image
                  src={s.image}
                  alt={s.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/45 transition-colors duration-500" />
                {/* Content */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end">
                  <p className="font-cinzel text-[10px] tracking-widest text-brand-gold/80 mb-1">
                    {s.en}
                  </p>
                  <p className="font-noto text-brand-ice text-2xl mb-1">{s.label}</p>
                  <p className="font-noto text-brand-ice/70 text-xs">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="mt-16 border-l-2 border-brand-gold pl-6"
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="font-inter text-brand-ice-dim text-sm">
            竣工予定: <span className="text-brand-gold">{siteConfig.completion}</span>
            <span className="mx-4">|</span>
            全 <span className="text-brand-gold">{siteConfig.units}</span> 戸
            <span className="mx-4">|</span>
            地上 <span className="text-brand-gold">{siteConfig.floors}</span> 階
          </p>
        </motion.div>
      </div>
    </section>
  );
}
