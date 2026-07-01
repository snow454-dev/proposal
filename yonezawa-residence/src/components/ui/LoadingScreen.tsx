"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 12;
        return next >= 100 ? 100 : next;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100 && !doneRef.current) {
      doneRef.current = true;
      hideTimerRef.current = setTimeout(() => setVisible(false), 600);
    }
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-brand-black flex flex-col items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.p
            className="font-cinzel text-brand-gold text-2xl tracking-[0.4em] mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            YONEZAWA RESIDENCE
          </motion.p>

          <div className="w-48 h-px bg-brand-dark-2 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-brand-gold"
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          <motion.p
            className="mt-4 text-brand-ice-dim text-xs tracking-widest font-inter"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.4 }}
          >
            {Math.min(Math.round(progress), 100)}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
