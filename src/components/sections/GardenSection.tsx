"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const plants = [
  { emoji: "🪴", name: "몬스테라", trait: "호기심 많음", level: 12, color: "#52B788" },
  { emoji: "🌵", name: "선인장", trait: "과묵하고 단단함", level: 7, color: "#f59e0b" },
  { emoji: "🌸", name: "벚꽃나무", trait: "감성적이고 낭만", level: 3, color: "#ec4899" },
];

const pots = [
  { emoji: "🪣", label: "테라코타" },
  { emoji: "⚪", label: "화이트 미니멀" },
  { emoji: "🟤", label: "우드 빈티지" },
  { emoji: "🔵", label: "블루 세라믹" },
];

const decorations = [
  { emoji: "🪨", label: "돌멩이" },
  { emoji: "🍄", label: "버섯" },
  { emoji: "🌈", label: "무지개" },
  { emoji: "⭐", label: "별" },
];

export default function GardenSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="overflow-hidden bg-[#F0FFF4] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            나만의 공간
          </p>
          <h2 className="mb-4 text-3xl font-black text-[#1A3C34] sm:text-4xl">
            내 텃밭을 꾸며요! 🌿
          </h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#5a7a6e] sm:text-base">
            최대 3개의 식물을 키우고, 화분과 장식으로 나만의 텃밭을 만들어보세요.
          </p>
        </motion.div>

        {/* Garden preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-10 rounded-3xl bg-white p-5 shadow-lg sm:p-8"
        >
          {/* Ground */}
          <div className="mb-6 flex items-end justify-center gap-4 sm:gap-8">
            {plants.map((plant, i) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                whileHover={{ y: -6, scale: 1.04 }}
                className="flex cursor-pointer flex-col items-center gap-2"
              >
                {/* Level badge */}
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: plant.color }}
                >
                  Lv.{plant.level}
                </span>

                {/* Plant */}
                <div
                  className="flex items-center justify-center rounded-2xl border-2 bg-[#F0FFF4]"
                  style={{
                    borderColor: plant.color + "40",
                    width: i === 1 ? 80 : 68,
                    height: i === 1 ? 80 : 68,
                    fontSize: i === 1 ? 44 : 36,
                  }}
                >
                  {plant.emoji}
                </div>

                {/* Name */}
                <span className="text-xs font-semibold text-[#1A3C34]">{plant.name}</span>
                <span className="text-[10px] text-[#5a7a6e]">{plant.trait}</span>
              </motion.div>
            ))}
          </div>

          {/* Ground strip */}
          <div className="mx-auto h-3 max-w-xs rounded-full bg-gradient-to-r from-[#c6e8d5] via-[#52B788] to-[#c6e8d5] opacity-40" />
        </motion.div>

        {/* Customization options */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Pot skins */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <p className="mb-3 text-sm font-bold text-[#1A3C34]">🪴 화분 스킨</p>
            <div className="grid grid-cols-4 gap-2">
              {pots.map((pot, i) => (
                <motion.div
                  key={pot.label}
                  whileTap={{ scale: 0.92 }}
                  className={`flex flex-col items-center gap-1 rounded-xl py-2 ${i === 0 ? "bg-[#e8f5e9] ring-2 ring-[#52B788]" : "bg-[#F0FFF4]"}`}
                >
                  <span className="text-xl">{pot.emoji}</span>
                  <span className="text-[9px] text-[#5a7a6e] leading-tight text-center">{pot.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <p className="mb-3 text-sm font-bold text-[#1A3C34]">✨ 텃밭 장식</p>
            <div className="grid grid-cols-4 gap-2">
              {decorations.map((deco, i) => (
                <motion.div
                  key={deco.label}
                  whileTap={{ scale: 0.92 }}
                  className={`flex flex-col items-center gap-1 rounded-xl py-2 ${i === 0 ? "bg-[#e8f5e9] ring-2 ring-[#52B788]" : "bg-[#F0FFF4]"}`}
                >
                  <span className="text-xl">{deco.emoji}</span>
                  <span className="text-[9px] text-[#5a7a6e] leading-tight text-center">{deco.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Coming soon badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-6 text-center text-xs text-[#5a7a6e]"
        >
          🔜 화분 스킨 · 배경 테마 · 친구 텃밭 방문 기능도 준비 중이에요
        </motion.p>
      </div>
    </section>
  );
}
