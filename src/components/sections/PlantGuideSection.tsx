"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const PLANTS = [
  {
    emoji: "🌿",
    name: "몬스테라",
    scientific: "Monstera deliciosa",
    difficulty: "쉬움",
    water: "주 1회",
    light: "반음지",
    desc: "넓은 잎에 구멍이 독특한 인기 관엽식물. 공기 정화 효과도 뛰어나요.",
  },
  {
    emoji: "🌴",
    name: "여인초",
    scientific: "Strelitzia reginae",
    difficulty: "보통",
    water: "주 1~2회",
    light: "양지",
    desc: "열대 분위기를 연출하는 큼직한 잎. 충분한 햇빛만 있으면 잘 자라요.",
  },
  {
    emoji: "🪴",
    name: "스투키",
    scientific: "Sansevieria cylindrica",
    difficulty: "매우 쉬움",
    water: "월 2회",
    light: "반음지~양지",
    desc: "원통형 잎이 개성 있는 공기정화 식물. 물을 자주 주지 않아도 돼요.",
  },
  {
    emoji: "🌱",
    name: "포토스",
    scientific: "Epipremnum aureum",
    difficulty: "매우 쉬움",
    water: "주 1회",
    light: "반음지",
    desc: "어디서나 잘 자라는 행잉 플랜트. 번식도 쉬워 초보자에게 딱이에요.",
  },
  {
    emoji: "🌵",
    name: "선인장",
    scientific: "Cactaceae",
    difficulty: "매우 쉬움",
    water: "월 1~2회",
    light: "양지",
    desc: "물을 거의 주지 않아도 되는 가장 키우기 쉬운 식물. 해만 잘 받으면 OK.",
  },
  {
    emoji: "🌸",
    name: "호접란",
    scientific: "Phalaenopsis",
    difficulty: "보통",
    water: "주 1회",
    light: "반음지",
    desc: "우아한 꽃이 오래가는 난 식물. 직사광선만 피하면 꽤 오래 꽃을 즐길 수 있어요.",
  },
  {
    emoji: "🌾",
    name: "아레카야자",
    scientific: "Dypsis lutescens",
    difficulty: "보통",
    water: "주 2회",
    light: "반양지",
    desc: "가는 잎이 우아하게 뻗는 야자. 공기 습도를 높여주는 천연 가습기예요.",
  },
  {
    emoji: "🍀",
    name: "율마",
    scientific: "Cupressus macrocarpa",
    difficulty: "보통",
    water: "주 2~3회",
    light: "양지",
    desc: "상쾌한 향기가 매력적인 미니 사이프러스. 햇빛과 물을 좋아해요.",
  },
  {
    emoji: "🌺",
    name: "안스리움",
    scientific: "Anthurium andraeanum",
    difficulty: "쉬움",
    water: "주 1~2회",
    light: "반음지",
    desc: "빨간 하트 모양 꽃이 오래 피는 식물. 공기정화 효과도 탁월해요.",
  },
  {
    emoji: "🪸",
    name: "알로에",
    scientific: "Aloe vera",
    difficulty: "매우 쉬움",
    water: "월 2~3회",
    light: "양지",
    desc: "피부 진정 효과로 유명한 다육식물. 방치해도 잘 자라는 강인한 식물이에요.",
  },
  {
    emoji: "🌿",
    name: "고무나무",
    scientific: "Ficus elastica",
    difficulty: "쉬움",
    water: "주 1회",
    light: "반양지",
    desc: "광택 있는 넓은 잎이 인테리어 효과 만점. 공기 정화 능력도 뛰어나요.",
  },
  {
    emoji: "🌻",
    name: "해바라기",
    scientific: "Helianthus annuus",
    difficulty: "쉬움",
    water: "주 2~3회",
    light: "양지",
    desc: "밝은 노란색 꽃이 기분을 업시켜 주는 식물. 햇빛을 충분히 쐬면 잘 자라요.",
  },
];

const DIFFICULTY_STYLE: Record<string, { color: string; bg: string }> = {
  "매우 쉬움": { color: "#3b82f6", bg: "#eff6ff" },
  쉬움: { color: "#52B788", bg: "#e8f5e9" },
  보통: { color: "#f59e0b", bg: "#fffbeb" },
  어려움: { color: "#ef4444", bg: "#fef2f2" },
};

export default function PlantGuideSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="bg-[#F0FFF4] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">

        {/* ── 헤더 ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            식물 도감
          </p>
          <h2 className="mb-4 text-3xl font-black text-[#1A3C34] sm:text-4xl">
            100여 종의 식물,
            <br className="sm:hidden" /> 모두 알려드려요
          </h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#5a7a6e] sm:text-base">
            몬스테라부터 선인장까지. 각 식물의 물주기, 빛, 관리법을 한눈에 확인하세요.
            초보 식집사도 그리니와 함께라면 절대 죽이지 않아요.
          </p>
        </motion.div>

        {/* ── 앱 목업 + 기능 설명 ── */}
        <div className="mb-16 flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-14">

          {/* 폰 목업 2개 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex shrink-0 items-end gap-3"
          >
            {/* 목록 화면 */}
            <div className="w-[140px] rounded-[36px] border-4 border-[#2d5243] bg-[#0d1f18] p-1.5 shadow-xl sm:w-[155px]">
              <div className="overflow-hidden rounded-[28px] bg-white">
                <div className="bg-[#52B788] px-3 pb-3 pt-2.5">
                  <p className="text-[11px] font-black text-white">식물 도감 📖</p>
                  <div className="mt-1.5 rounded-full bg-white/20 px-2 py-1">
                    <p className="text-[9px] text-white/70">🔍 검색...</p>
                  </div>
                </div>
                <div className="flex gap-1 overflow-x-hidden px-2 py-1.5">
                  {["전체", "관엽", "다육"].map((c, i) => (
                    <span
                      key={c}
                      className="shrink-0 rounded-full px-2 py-0.5 text-[8px] font-bold"
                      style={i === 0 ? { background: "#52B788", color: "#fff" } : { background: "#F0FFF4", color: "#5a7a6e" }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
                <div className="divide-y divide-[#f0f9f4]">
                  {[
                    { emoji: "🌿", name: "몬스테라", diff: "쉬움" },
                    { emoji: "🪴", name: "스투키", diff: "매우 쉬움" },
                    { emoji: "🌵", name: "선인장", diff: "매우 쉬움" },
                    { emoji: "🌸", name: "호접란", diff: "보통" },
                  ].map((p) => {
                    const d = DIFFICULTY_STYLE[p.diff] ?? DIFFICULTY_STYLE["쉬움"];
                    return (
                      <div key={p.name} className="flex items-center gap-2 px-2 py-2">
                        <span className="text-base">{p.emoji}</span>
                        <span className="flex-1 text-[9px] font-semibold text-[#1A3C34]">{p.name}</span>
                        <span className="rounded-full px-1.5 py-0.5 text-[8px] font-bold" style={{ background: d.bg, color: d.color }}>
                          {p.diff}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="flex justify-around border-t border-[#e8f5e9] py-2">
                  {["🌿", "📖", "💬", "⚙️"].map((icon, i) => (
                    <div key={icon} className="flex flex-col items-center gap-0.5">
                      <span className="text-sm">{icon}</span>
                      <div className={`h-0.5 w-3 rounded-full ${i === 1 ? "bg-[#52B788]" : "bg-transparent"}`} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 상세 화면 (살짝 크게) */}
            <div className="w-[148px] rounded-[36px] border-4 border-[#c6e8d5] bg-[#F0FFF4] p-1.5 shadow-2xl sm:w-[165px]">
              <div className="overflow-hidden rounded-[28px] bg-white">
                <div className="bg-[#52B788] px-3 pb-4 pt-2.5 text-center">
                  <div className="mx-auto mb-1.5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-4xl">
                    🌿
                  </div>
                  <p className="text-sm font-black text-white">몬스테라</p>
                  <p className="text-[9px] italic text-white/60">Monstera deliciosa</p>
                </div>
                <div className="grid grid-cols-3 divide-x divide-[#e8f5e9] border-b border-[#e8f5e9]">
                  {[{ icon: "💧", label: "물주기", value: "주 1회" }, { icon: "☀️", label: "햇빛", value: "반음지" }, { icon: "🌡️", label: "온도", value: "18~28°" }].map((s) => (
                    <div key={s.label} className="py-2 text-center">
                      <div className="text-sm">{s.icon}</div>
                      <div className="text-[8px] text-[#5a7a6e]">{s.label}</div>
                      <div className="text-[9px] font-bold text-[#1A3C34]">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="px-3 py-2">
                  <p className="mb-1 text-[9px] font-bold text-[#1A3C34]">관리 가이드</p>
                  <p className="text-[8px] leading-relaxed text-[#5a7a6e]">밝은 간접광에서 잘 자라요. 흙이 마르면 충분히 주세요.</p>
                </div>
                <div className="mx-2 mb-2 rounded-xl bg-[#F0FFF4] px-2.5 py-2">
                  <p className="text-[8px] text-[#5a7a6e]">🌿 몬스테라가 말해요</p>
                  <p className="text-[9px] font-semibold text-[#1A3C34]">"오늘 잎 좀 닦아줄 수 있어? 🍃"</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 기능 리스트 */}
          <div className="flex-1 space-y-4">
            {[
              { emoji: "📋", title: "완전한 관리 가이드", desc: "물주기 주기, 햇빛 요구량, 적정 온도·습도, 분갈이 시기까지. 식물별로 최적화된 관리법을 제공해요." },
              { emoji: "🌤️", title: "날씨 연동 맞춤 케어", desc: "위치를 감지해 오늘 날씨를 자동 파악해요. 건조하고 맑은 날엔 물주기 알림을 조정하는 등 날씨에 맞게 관리해드려요." },
              { emoji: "⭐", title: "초보자 맞춤 추천", desc: "과습에 강하고 키우기 쉬운 식물을 엄선해 추천해요. 처음 시작이라면 그리니가 딱 맞는 식물을 골라드릴게요." },
              { emoji: "🔬", title: "병해충 진단", desc: "잎이 이상하다면 사진 한 장으로 AI가 바로 진단해드려요. 도감 데이터 기반으로 정확한 원인과 처방을 알려드려요." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm"
              >
                <span className="text-2xl">{item.emoji}</span>
                <div>
                  <p className="mb-1 text-sm font-bold text-[#1A3C34]">{item.title}</p>
                  <p className="text-sm leading-relaxed text-[#5a7a6e]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 식물 카드 그리드 ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6 text-center"
        >
          <p className="text-sm font-semibold text-[#1A3C34]">수록 식물 미리보기 · 출시 시 100여 종 전체 공개</p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PLANTS.map((plant, i) => {
            const d = DIFFICULTY_STYLE[plant.difficulty] ?? DIFFICULTY_STYLE["쉬움"];
            return (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.35 + (i % 3) * 0.08 }}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0FFF4] text-2xl">
                    {plant.emoji}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1A3C34]">{plant.name}</p>
                    <p className="truncate text-[11px] italic text-[#5a7a6e]">{plant.scientific}</p>
                  </div>
                  <span
                    className="ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold"
                    style={{ background: d.bg, color: d.color }}
                  >
                    {plant.difficulty}
                  </span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-[#5a7a6e]">{plant.desc}</p>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-[#F0FFF4] px-2.5 py-1 text-[11px] text-[#5a7a6e]">
                    💧 {plant.water}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-[#F0FFF4] px-2.5 py-1 text-[11px] text-[#5a7a6e]">
                    ☀️ {plant.light}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* More indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.6 }}
          className="mt-8 flex items-center gap-3"
        >
          <div className="h-px flex-1 bg-[#c6e8d5]" />
          <span className="rounded-full border border-[#c6e8d5] px-4 py-1.5 text-sm text-[#5a7a6e]">
            + 88종 더 준비 중 🌿
          </span>
          <div className="h-px flex-1 bg-[#c6e8d5]" />
        </motion.div>

      </div>
    </section>
  );
}
