"use client";
import { useEffect, useRef } from "react";

const COUNT = 26;

export default function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Disable on mobile / touch devices
    if (window.matchMedia("(hover: none)").matches) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.22,
      vy: -(Math.random() * 0.32 + 0.08),
      r: Math.random() * 1.6 + 0.5,
      phase: Math.random() * Math.PI * 2,
    }));

    let rafId: number;
    let visible = true;

    const observer = new IntersectionObserver(
      (entries) => { visible = entries[0].isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    const draw = () => {
      rafId = requestAnimationFrame(draw);
      if (!visible) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const t = performance.now() * 0.001;

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.phase += 0.007;

        if (p.y < -4)              { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        if (p.x < -4)                p.x = canvas.width + 4;
        if (p.x > canvas.width + 4)  p.x = -4;

        const alpha = 0.05 + 0.10 * Math.abs(Math.sin(p.phase + t * 0.4));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${alpha.toFixed(3)})`;
        ctx.fill();
      }
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[5] pointer-events-none"
      aria-hidden
    />
  );
}
