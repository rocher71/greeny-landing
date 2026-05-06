"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { openDownloadModal } from "@/components/DownloadModal";
import { trackDownloadClick } from "@/lib/ga";
import { getTranslations, type Locale } from "@/lib/i18n";

const leaves = [
  { emoji: "🌿", x: "8%", y: "15%", size: 40, duration: 4, delay: 0 },
  { emoji: "🍃", x: "85%", y: "10%", size: 32, duration: 5, delay: 1 },
  { emoji: "🌱", x: "75%", y: "70%", size: 28, duration: 3.5, delay: 0.5 },
  { emoji: "🪴", x: "5%", y: "75%", size: 36, duration: 4.5, delay: 2 },
  { emoji: "🌿", x: "90%", y: "45%", size: 24, duration: 6, delay: 1.5 },
  { emoji: "🍀", x: "15%", y: "50%", size: 20, duration: 3, delay: 3 },
  { emoji: "🌸", x: "60%", y: "85%", size: 26, duration: 5, delay: 0.8 },
  { emoji: "🌾", x: "40%", y: "5%", size: 22, duration: 4, delay: 2.5 },
];

export default function HeroSection({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const t = getTranslations(locale).hero;

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#c8f0dc,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_90%,#fff3c4,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_80%,#d1fae5,transparent)]" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {leaves.map((leaf, i) => (
          <motion.span
            key={i}
            className="absolute select-none"
            style={{ left: leaf.x, top: leaf.y, fontSize: leaf.size }}
            animate={{ y: [0, -14, 0], rotate: [-5, 5, -5], opacity: [0.4, 0.7, 0.4] }}
            transition={{
              repeat: Infinity,
              duration: leaf.duration,
              delay: leaf.delay,
              ease: "easeInOut",
            }}
          >
            {leaf.emoji}
          </motion.span>
        ))}
      </div>

      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center gap-2"
        >
          <motion.span
            className="text-4xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" as const }}
          >
            🪴
          </motion.span>
          <span className="text-2xl font-black tracking-tight text-[#52B788]">greeny</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 max-w-2xl whitespace-pre-line text-4xl font-black leading-tight tracking-tight text-[#1A3C34] sm:text-5xl md:text-6xl"
        >
          {t.headline}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 max-w-sm text-base leading-relaxed text-[#5a7a6e] sm:max-w-md sm:text-lg"
        >
          {t.sub}{" "}
          <span className="font-bold text-[#52B788]">{t.brandName}</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center gap-4"
        >
          <motion.button
            onClick={() => { trackDownloadClick("hero"); openDownloadModal(); }}
            whileTap={{ scale: 0.96 }}
            className="flex cursor-pointer items-center gap-2.5 rounded-full bg-[#1A3C34] px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-[#0f2620]"
          >
            <span className="text-xl">🪴</span>
            {t.cta}
          </motion.button>
          <div className="flex items-center gap-4 text-sm text-[#5a7a6e]">
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              iOS
            </span>
            <span className="text-[#c6e8d5]">·</span>
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="#34A853" d="M17.4 7.97L3.23-.07C2.4-.54 1.67-.47 1.22 0l12.08 12.07 4.1-4.1z"/><path fill="#EA4335" d="M1.22 0C.8.22.5.7.5 1.32v21.36c0 .62.3 1.1.72 1.32l12.08-12.07L1.22 0z"/><path fill="#FBBC04" d="M17.3 16.08l-3.99-3.99L1.22 24.01c.45.47 1.18.53 2.01.06l14.17-8.04-.09.05z"/><path fill="#4285F4" d="M22.03 10.13L17.4 7.97l-4.1 4.1 4.1 4.1 4.63-2.63c1.35-.77 1.35-2.02 0-2.79l-.01-.61z"/></svg>
              Android
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#5a7a6e]">{t.scrollHint}</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" as const }}
            className="h-5 w-3 rounded-full border-2 border-[#52B788]/50 flex items-start justify-center pt-1"
          >
            <div className="h-1.5 w-1 rounded-full bg-[#52B788]" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
