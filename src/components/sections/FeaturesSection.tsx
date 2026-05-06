"use client";

import Link from "next/link";
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
    emoji: "🌤️",
    color: "#0ea5e9",
    bg: "#e0f2fe",
    title: "날씨 기반 맞춤 알림",
    desc: "위치를 감지해 오늘 날씨를 자동으로 파악해요. 강한 햇빛, 건조한 날, 흐린 날씨에 맞게 식물 관리 알림을 보내드려요.",
  },
  {
    emoji: "🔬",
    color: "#f59e0b",
    bg: "#fffbeb",
    title: "AI 식물 진단",
    desc: "사진 한 장으로 식물 종류 자동 인식, 잎 상태 분석, 병해충 진단까지 한번에.",
  },
  {
    emoji: "📖",
    color: "#8b5cf6",
    bg: "#f5f3ff",
    title: "100여 종 식물 도감",
    desc: "몬스테라, 여인초, 스투키 등 100여 가지 식물 정보를 담았어요. 초보 식집사도 그리니와 함께라면 무엇이든 쉽게 키울 수 있어요.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            주요 기능
          </p>
          <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
            그리니가 특별한 이유
          </h2>
        </motion.div>

        {/* 3열 그리드 → 마지막 2개는 2열 중앙 정렬 */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const isGuide = f.title === "100여 종 식물 도감";
            const card = (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-3xl bg-[#F0FFF4] p-7 transition-shadow ${
                  i === features.length - 1 && features.length % 3 !== 0
                    ? "lg:col-start-2"
                    : ""
                } ${isGuide ? "cursor-pointer hover:shadow-md hover:ring-2 hover:ring-[#8b5cf6]/30" : ""}`}
              >
                <div
                  className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl text-3xl"
                  style={{ background: f.bg }}
                >
                  {f.emoji}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[#1A3C34]">{f.title}</h3>
                <p className="text-sm leading-relaxed text-[#5a7a6e]">{f.desc}</p>
                {isGuide && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#8b5cf6]">
                    자세히 보기 →
                  </span>
                )}
              </motion.div>
            );
            return isGuide ? (
              <Link key={f.title} href="/plants" className="contents">
                {card}
              </Link>
            ) : (
              <div key={f.title} className="contents">
                {card}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
