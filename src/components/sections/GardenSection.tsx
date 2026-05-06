"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const plants = [
  { emoji: "🪴", name: "몬스테라", trait: "호기심 많음", level: 12, color: "#52B788" },
  { emoji: "🌵", name: "선인장", trait: "과묵하고 단단함", level: 7, color: "#f59e0b" },
  { emoji: "🌸", name: "벚꽃나무", trait: "감성적이고 낭만", level: 3, color: "#ec4899" },
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
            최대 3개의 식물을 키우며 각자의 인격을 키워나가요.
            <br />
            대화가 쌓일수록 나만의 특별한 식물 친구가 됩니다.
          </p>
        </motion.div>

        {/* Garden preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl bg-white p-6 shadow-lg sm:p-10"
        >
          {/* Plants */}
          <div className="mb-8 flex items-end justify-center gap-6 sm:gap-12">
            {plants.map((plant, i) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                whileHover={{ y: -8, scale: 1.06 }}
                className="flex cursor-default flex-col items-center gap-2"
              >
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: plant.color }}
                >
                  Lv.{plant.level}
                </span>
                <div
                  className="flex items-center justify-center rounded-2xl border-2 bg-[#F0FFF4]"
                  style={{
                    borderColor: plant.color + "40",
                    width: i === 1 ? 88 : 72,
                    height: i === 1 ? 88 : 72,
                    fontSize: i === 1 ? 48 : 38,
                  }}
                >
                  {plant.emoji}
                </div>
                <span className="text-xs font-bold text-[#1A3C34]">{plant.name}</span>
                <span className="text-[10px] text-[#5a7a6e]">{plant.trait}</span>
              </motion.div>
            ))}
          </div>

          {/* Ground strip */}
          <div className="mx-auto mb-6 h-3 max-w-xs rounded-full bg-gradient-to-r from-[#c6e8d5] via-[#52B788] to-[#c6e8d5] opacity-40" />

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { emoji: "💬", label: "누적 대화", value: "1,240개" },
              { emoji: "🌱", label: "함께한 날", value: "38일" },
              { emoji: "✨", label: "형성된 인격", value: "3가지" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.55 + i * 0.1 }}
                className="rounded-2xl bg-[#F0FFF4] py-3 text-center"
              >
                <div className="text-xl">{stat.emoji}</div>
                <div className="mt-1 text-sm font-black text-[#1A3C34]">{stat.value}</div>
                <div className="text-[10px] text-[#5a7a6e]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
