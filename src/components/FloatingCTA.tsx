"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { openDownloadModal } from "@/components/DownloadModal";

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

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={openDownloadModal}
          className="fixed bottom-6 right-6 z-40 flex cursor-pointer items-center gap-2 rounded-full bg-[#1A3C34] px-5 py-3 font-semibold text-white shadow-lg transition hover:bg-[#0f2620]"
        >
          <span>🪴</span>
          <span>앱 다운받기</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
