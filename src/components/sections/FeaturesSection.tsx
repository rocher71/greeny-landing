"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    emoji: "💬",
    color: "#52B788",
    bg: "#e8f5e9",
    title: "식물이 먼저 말을 걸어요",
    desc: "매일 식물이 먼저 안부를 물어봐요. 대화를 나눌수록 식물만의 고유한 인격이 만들어져요.",
  },
  {
    emoji: "💧",
    color: "#3b82f6",
    bg: "#eff6ff",
    title: "스마트 물주기 알림",
    desc: "식물 종류와 계절에 맞춰 물주기 주기를 자동 계산해요. 더 이상 식물을 죽이지 않아도 돼요.",
  },
  {
    emoji: "🔬",
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "AI 식물 진단",
    desc: "사진 한 장으로 식물 종류 자동 인식, 잎 상태 분석, 병해충 진단까지 한번에.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-[#F0FFF4] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#52B788]">
            주요 기능
          </p>
          <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
            그리니가 특별한 이유
          </h2>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-3xl bg-white p-8 shadow-sm"
            >
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                style={{ background: f.bg }}
              >
                {f.emoji}
              </div>
              <h3 className="mb-3 text-lg font-bold text-[#1A3C34]">{f.title}</h3>
              <p className="text-sm leading-relaxed text-[#5a7a6e]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
