"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let rx = 0, ry = 0;
    let mx = 0, my = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
    };

    const animate = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring.current) {
        ring.current.style.transform = `translate(${rx - 16}px, ${ry - 16}px)`;
      }
      rafId = requestAnimationFrame(animate);
    };

    const onEnter = () => ring.current?.classList.add("scale-150");
    const onLeave = () => ring.current?.classList.remove("scale-150");

    document.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-cursor]").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });
    rafId = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dot}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-gold pointer-events-none z-[9999] transition-transform duration-0"
      />
      <div
        ref={ring}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-gold/60 pointer-events-none z-[9999] transition-transform duration-300"
      />
    </>
  );
}
