"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import BuildingExterior from "./BuildingExterior";
import { siteConfig } from "@/config/site.config";

const CHROMA_OFFSET = new THREE.Vector2(0.0005, 0.0005);

// Camera dolly: front → diagonal → elevated
const KEYS = [
  { t: 0.00, pos: new THREE.Vector3(0,   1.5, 10),  look: new THREE.Vector3(0,  0.5, 0) },
  { t: 0.22, pos: new THREE.Vector3(3.5, 2.0,  9),  look: new THREE.Vector3(0,  0.5, 0) },
  { t: 0.45, pos: new THREE.Vector3(6.5, 2.5,  7),  look: new THREE.Vector3(0,  0.5, 0) },
  { t: 0.68, pos: new THREE.Vector3(5.0, 5.0,  8),  look: new THREE.Vector3(0,  1.5, 0) },
  { t: 1.00, pos: new THREE.Vector3(0,   7.0, 11),  look: new THREE.Vector3(0,  0.0, 0) },
];

function smoothstep(t: number) { return t * t * (3 - 2 * t); }

function CameraRig({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const lookRef = useRef(new THREE.Vector3(0, 0.5, 0));

  useFrame(() => {
    const p = Math.max(0, Math.min(1, scrollProgress));
    let i = KEYS.findIndex((k) => k.t > p) - 1;
    i = Math.max(0, Math.min(KEYS.length - 2, i));

    const a = KEYS[i], b = KEYS[i + 1];
    const raw = (p - a.t) / (b.t - a.t);
    const eased = smoothstep(Math.max(0, Math.min(1, raw)));

    camera.position.lerp(a.pos.clone().lerp(b.pos, eased), 0.06);
    lookRef.current.lerp(a.look.clone().lerp(b.look, eased), 0.06);
    camera.lookAt(lookRef.current);
  });

  return null;
}

const LABELS = [
  { threshold: 0.15, en: "LOBBY & AMENITIES",   ja: "エントランス・共用施設" },
  { threshold: 0.38, en: "STANDARD RESIDENCE",  ja: "スタンダードレジデンス" },
  { threshold: 0.58, en: "PREMIUM SUITE",        ja: "プレミアムスイート" },
  { threshold: 0.78, en: "PENTHOUSE VIEW",       ja: "最上階からの眺望" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLabel, setActiveLabel] = useState<{ en: string; ja: string } | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const total = containerRef.current.offsetHeight - window.innerHeight;
      const p = Math.max(0, Math.min(1, -rect.top / total));
      setScrollProgress(p);
      setActiveLabel([...LABELS].reverse().find((l) => p >= l.threshold) ?? null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={containerRef} style={{ height: "600vh" }} className="relative">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Night sky gradient behind canvas */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, #0a0a1a 0%, #1a1a2e 100%)" }}
        />

        <Canvas
          camera={{ position: [0, 1.5, 10], fov: 52 }}
          gl={{ antialias: true, alpha: true }}
          style={{ position: "absolute", inset: 0 }}
        >
          <ambientLight intensity={0.08} color="#8888bb" />
          <directionalLight
            position={[-6, 10, -4]}
            intensity={0.22}
            color="#aabbdd"
          />

          <CameraRig scrollProgress={scrollProgress} />
          <BuildingExterior />
          <Stars radius={80} depth={40} count={2500} factor={4} fade speed={0.4} />

          <EffectComposer>
            <Bloom intensity={1.2} luminanceThreshold={0.55} luminanceSmoothing={0.85} />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={CHROMA_OFFSET}
              radialModulation={false}
              modulationOffset={0}
            />
            <Vignette eskil={false} offset={0.38} darkness={0.72} />
          </EffectComposer>
        </Canvas>

        {/* Text overlay */}
        <div className="absolute inset-0 pointer-events-none flex flex-col justify-end pb-20 px-8 md:px-16">
          <AnimatePresence mode="wait">
            {scrollProgress < 0.1 && (
              <motion.div
                key="hero-main"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <p className="font-cinzel text-brand-gold text-xs tracking-[0.5em] mb-4">
                  YONEZAWA · YAMAGATA
                </p>
                <h1 className="font-cinzel text-brand-ice text-4xl md:text-6xl leading-tight mb-4">
                  YONEZAWA<br />
                  <span className="text-brand-gold">RESIDENCE</span>
                </h1>
                <p className="font-noto text-brand-ice-dim text-sm md:text-base leading-relaxed">
                  {siteConfig.tagline}
                </p>
                <div className="mt-8 flex items-center gap-2">
                  <span className="text-brand-gold-light font-inter text-xs tracking-widest">SCROLL</span>
                  <div className="w-12 h-px bg-brand-gold-light" />
                </div>
              </motion.div>
            )}
            {activeLabel && scrollProgress >= 0.1 && scrollProgress < 0.96 && (
              <motion.div
                key={activeLabel.en}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
              >
                <p className="font-cinzel text-brand-gold text-xs tracking-[0.4em] mb-2">
                  {activeLabel.en}
                </p>
                <p className="font-noto text-brand-ice text-lg">{activeLabel.ja}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Progress bar */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-1">
          <div className="w-px h-24 bg-brand-dark-2 relative overflow-hidden">
            <div
              className="absolute top-0 left-0 right-0 bg-brand-gold transition-all duration-100"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <span className="text-brand-gold font-inter text-[10px] tracking-widest rotate-90 mt-4">
            {Math.round(scrollProgress * 100)}
          </span>
        </div>
      </div>
    </section>
  );
}
