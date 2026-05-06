"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

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

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Animated gradient background */}
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,#c8f0dc,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_90%,#fff3c4,transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_10%_80%,#d1fae5,transparent)]" />
      </motion.div>

      {/* Floating leaves */}
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

      {/* Main content */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 flex flex-col items-center"
      >
        {/* Logo */}
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

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-5 max-w-2xl text-4xl font-black leading-tight tracking-tight text-[#1A3C34] sm:text-5xl md:text-6xl"
        >
          내 식물과
          <br />
          대화해보세요
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10 max-w-sm text-base leading-relaxed text-[#5a7a6e] sm:max-w-md sm:text-lg"
        >
          대화를 나눌수록 성격이 자라나는 나만의 식물 친구,{" "}
          <span className="font-bold text-[#52B788]">그리니</span>
        </motion.p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex w-full flex-col items-center gap-3"
        >
          <WaitlistForm />
          <p className="text-sm text-[#5a7a6e]">출시 시 가장 먼저 알려드려요 · 스팸 없이</p>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-16 flex flex-col items-center gap-2"
        >
          <span className="text-xs text-[#5a7a6e]">스크롤해보세요</span>
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
