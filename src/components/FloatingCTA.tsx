"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  function scrollToCTA() {
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={scrollToCTA}
          className="fixed bottom-6 right-6 z-50 flex cursor-pointer items-center gap-2 rounded-full bg-[#52B788] px-5 py-3 font-semibold text-white shadow-lg hover:bg-[#3a9e72] transition-colors"
        >
          <span>🌱</span>
          <span>사전예약하기</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
