"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import WaitlistForm from "@/components/WaitlistForm";

const CATEGORIES = ["전체", "관엽식물", "다육·선인장", "공기정화", "초보추천"];

const PLANTS = [
  {
    emoji: "🌿",
    name: "몬스테라",
    scientific: "Monstera deliciosa",
    category: "관엽식물",
    difficulty: "쉬움",
    diffColor: "#52B788",
    water: "주 1회",
    light: "반음지",
    desc: "넓은 잎에 구멍이 독특한 인기 관엽식물. 공기 정화 효과도 뛰어나요.",
  },
  {
    emoji: "🌴",
    name: "여인초",
    scientific: "Strelitzia reginae",
    category: "관엽식물",
    difficulty: "보통",
    diffColor: "#f59e0b",
    water: "주 1~2회",
    light: "양지",
    desc: "열대 분위기를 연출하는 큼직한 잎. 충분한 햇빛만 있으면 잘 자라요.",
  },
  {
    emoji: "🪴",
    name: "스투키",
    scientific: "Sansevieria cylindrica",
    category: "공기정화",
    difficulty: "매우 쉬움",
    diffColor: "#3b82f6",
    water: "월 2회",
    light: "반음지~양지",
    desc: "원통형 잎이 개성 있는 공기정화 식물. 물을 자주 주지 않아도 돼요.",
  },
  {
    emoji: "🌱",
    name: "포토스",
    scientific: "Epipremnum aureum",
    category: "초보추천",
    difficulty: "매우 쉬움",
    diffColor: "#3b82f6",
    water: "주 1회",
    light: "반음지",
    desc: "어디서나 잘 자라는 행잉 플랜트. 번식도 쉬워 초보자에게 딱이에요.",
  },
  {
    emoji: "🌵",
    name: "선인장",
    scientific: "Cactaceae",
    category: "다육·선인장",
    difficulty: "매우 쉬움",
    diffColor: "#3b82f6",
    water: "월 1~2회",
    light: "양지",
    desc: "물을 거의 주지 않아도 되는 가장 키우기 쉬운 식물. 해만 잘 받으면 OK.",
  },
  {
    emoji: "🌸",
    name: "호접란",
    scientific: "Phalaenopsis",
    category: "초보추천",
    difficulty: "보통",
    diffColor: "#f59e0b",
    water: "주 1회",
    light: "반음지",
    desc: "우아한 꽃이 오래가는 난 식물. 직사광선만 피하면 꽤 오래 꽃을 즐길 수 있어요.",
  },
  {
    emoji: "🌾",
    name: "아레카야자",
    scientific: "Dypsis lutescens",
    category: "공기정화",
    difficulty: "보통",
    diffColor: "#f59e0b",
    water: "주 2회",
    light: "반양지",
    desc: "가는 잎이 우아하게 뻗는 야자. 공기 습도를 높여주는 천연 가습기예요.",
  },
  {
    emoji: "🍀",
    name: "율마",
    scientific: "Cupressus macrocarpa",
    category: "관엽식물",
    difficulty: "보통",
    diffColor: "#f59e0b",
    water: "주 2~3회",
    light: "양지",
    desc: "상쾌한 향기가 매력적인 미니 사이프러스. 햇빛과 물을 좋아해요.",
  },
  {
    emoji: "🌺",
    name: "안스리움",
    scientific: "Anthurium andraeanum",
    category: "초보추천",
    difficulty: "쉬움",
    diffColor: "#52B788",
    water: "주 1~2회",
    light: "반음지",
    desc: "빨간 하트 모양 꽃이 오래 피는 식물. 공기정화 효과도 탁월해요.",
  },
  {
    emoji: "🌻",
    name: "해바라기",
    scientific: "Helianthus annuus",
    category: "초보추천",
    difficulty: "쉬움",
    diffColor: "#52B788",
    water: "주 2~3회",
    light: "양지",
    desc: "밝은 노란색 꽃이 기분을 업시켜 주는 식물. 햇빛을 충분히 쐬면 잘 자라요.",
  },
  {
    emoji: "🪸",
    name: "알로에",
    scientific: "Aloe vera",
    category: "다육·선인장",
    difficulty: "매우 쉬움",
    diffColor: "#3b82f6",
    water: "월 2~3회",
    light: "양지",
    desc: "피부 진정 효과로 유명한 다육식물. 방치해도 잘 자라는 강인한 식물이에요.",
  },
  {
    emoji: "🌿",
    name: "고무나무",
    scientific: "Ficus elastica",
    category: "공기정화",
    difficulty: "쉬움",
    diffColor: "#52B788",
    water: "주 1회",
    light: "반양지",
    desc: "광택 있는 넓은 잎이 인테리어 효과 만점. 공기 정화 능력도 뛰어나요.",
  },
];

const DIFFICULTY_LABELS: Record<string, { color: string; bg: string }> = {
  "매우 쉬움": { color: "#3b82f6", bg: "#eff6ff" },
  쉬움: { color: "#52B788", bg: "#e8f5e9" },
  보통: { color: "#f59e0b", bg: "#fffbeb" },
  어려움: { color: "#ef4444", bg: "#fef2f2" },
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: "easeOut" as const },
});

export default function PlantsPage() {
  return (
    <main className="min-h-screen bg-[#F0FFF4]">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-[#1A3C34] px-4 pb-20 pt-14 sm:px-6">
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 -right-20 h-80 w-80 rounded-full bg-[#52B788]/20 blur-3xl" />
          <div className="absolute bottom-0 -left-10 h-60 w-60 rounded-full bg-[#FFD166]/10 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-4xl">
          {/* Back */}
          <motion.div {...fadeUp(0)}>
            <Link
              href="/"
              className="mb-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/70 transition hover:bg-white/20 hover:text-white"
            >
              ← 메인으로 돌아가기
            </Link>
          </motion.div>

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:gap-16">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <motion.p {...fadeUp(0.05)} className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
                그리니 식물 도감
              </motion.p>
              <motion.h1 {...fadeUp(0.1)} className="mb-5 text-4xl font-black leading-tight text-white sm:text-5xl">
                100여 종의 식물,
                <br />
                <span className="text-[#52B788]">모두 알려드려요</span>
              </motion.h1>
              <motion.p {...fadeUp(0.15)} className="mb-8 max-w-sm text-base leading-relaxed text-white/70">
                몬스테라부터 선인장까지. 각 식물의 물주기, 빛, 온도, 관리법을 한눈에 확인하세요.
                초보 식집사도 그리니와 함께라면 절대 죽이지 않아요.
              </motion.p>
              <motion.div {...fadeUp(0.2)} className="flex flex-wrap justify-center gap-3 md:justify-start">
                {[
                  { emoji: "📖", label: "100여 종 수록" },
                  { emoji: "💧", label: "물주기 가이드" },
                  { emoji: "🔬", label: "병해충 진단" },
                  { emoji: "⭐", label: "초보 추천 필터" },
                ].map((badge) => (
                  <span
                    key={badge.label}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white/80"
                  >
                    {badge.emoji} {badge.label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full max-w-[260px] shrink-0 sm:max-w-[280px]"
            >
              <div className="rounded-[44px] border-4 border-[#2d5243] bg-[#0d1f18] p-2 shadow-2xl">
                <div className="overflow-hidden rounded-[36px] bg-white">
                  {/* Status bar */}
                  <div className="flex items-center justify-between bg-white px-4 pt-3 pb-1">
                    <span className="text-[10px] font-semibold text-[#1A3C34]">9:41</span>
                    <div className="h-3.5 w-16 rounded-full bg-[#0d1f18]" />
                    <span className="text-[10px] font-semibold text-[#1A3C34]">●●●</span>
                  </div>
                  {/* App header */}
                  <div className="bg-white px-4 pb-2 pt-1">
                    <p className="text-base font-black text-[#1A3C34]">식물 도감 📖</p>
                    <div className="mt-2 flex items-center gap-2 rounded-full bg-[#F0FFF4] px-3 py-1.5">
                      <span className="text-xs text-[#5a7a6e]">🔍 식물 검색...</span>
                    </div>
                  </div>
                  {/* Category chips */}
                  <div className="flex gap-1.5 overflow-x-auto px-4 pb-3 [&::-webkit-scrollbar]:hidden">
                    {["전체", "관엽식물", "다육", "공기정화"].map((c, i) => (
                      <span
                        key={c}
                        className="shrink-0 rounded-full px-3 py-1 text-[10px] font-semibold"
                        style={
                          i === 0
                            ? { background: "#52B788", color: "#fff" }
                            : { background: "#F0FFF4", color: "#5a7a6e" }
                        }
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  {/* Plant list in mockup */}
                  <div className="divide-y divide-[#e8f5e9] bg-[#fafffe]">
                    {[
                      { emoji: "🌿", name: "몬스테라", sub: "관엽식물 · 주 1회", diff: "쉬움" },
                      { emoji: "🪴", name: "스투키", sub: "공기정화 · 월 2회", diff: "매우 쉬움" },
                      { emoji: "🌸", name: "호접란", sub: "꽃식물 · 주 1회", diff: "보통" },
                      { emoji: "🌱", name: "포토스", sub: "초보추천 · 주 1회", diff: "매우 쉬움" },
                    ].map((p) => {
                      const d = DIFFICULTY_LABELS[p.diff] ?? DIFFICULTY_LABELS["쉬움"];
                      return (
                        <div key={p.name} className="flex items-center gap-3 px-4 py-2.5">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F0FFF4] text-xl">
                            {p.emoji}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-[#1A3C34]">{p.name}</p>
                            <p className="text-[9px] text-[#5a7a6e] truncate">{p.sub}</p>
                          </div>
                          <span
                            className="shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold"
                            style={{ background: d.bg, color: d.color }}
                          >
                            {p.diff}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                  {/* Bottom nav */}
                  <div className="flex items-center justify-around border-t border-[#e8f5e9] bg-white py-2.5">
                    {["🌿", "📖", "💬", "⚙️"].map((icon, i) => (
                      <div key={icon} className="flex flex-col items-center gap-0.5">
                        <span className="text-base">{icon}</span>
                        <div className={`h-1 w-1 rounded-full ${i === 1 ? "bg-[#52B788]" : "bg-transparent"}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Plant detail mockup + 앱 화면 설명 ── */}
      <section className="bg-white px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">앱 미리보기</p>
            <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
              식물 하나하나를 상세하게
            </h2>
          </motion.div>

          <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:gap-16">
            {/* Detail mockup */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="w-full max-w-[260px] shrink-0 sm:max-w-[280px]"
            >
              <div className="rounded-[44px] border-4 border-[#c6e8d5] bg-[#F0FFF4] p-2 shadow-xl">
                <div className="overflow-hidden rounded-[36px] bg-white">
                  {/* Status */}
                  <div className="flex items-center justify-between bg-[#52B788] px-4 pt-3 pb-2">
                    <span className="text-[10px] font-semibold text-white/80">9:41</span>
                    <div className="h-3 w-14 rounded-full bg-white/20" />
                    <span className="text-[10px] font-semibold text-white/80">●●●</span>
                  </div>
                  {/* Plant hero */}
                  <div className="bg-[#52B788] px-4 pb-5 pt-2 text-center">
                    <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-2xl bg-white/20 text-5xl">
                      🌿
                    </div>
                    <p className="text-lg font-black text-white">몬스테라</p>
                    <p className="text-xs text-white/70">Monstera deliciosa</p>
                  </div>
                  {/* Stats */}
                  <div className="grid grid-cols-3 divide-x divide-[#e8f5e9] border-b border-[#e8f5e9]">
                    {[
                      { icon: "💧", label: "물주기", value: "주 1회" },
                      { icon: "☀️", label: "햇빛", value: "반음지" },
                      { icon: "🌡️", label: "온도", value: "18~28°C" },
                    ].map((s) => (
                      <div key={s.label} className="py-3 text-center">
                        <div className="text-base">{s.icon}</div>
                        <div className="text-[9px] text-[#5a7a6e]">{s.label}</div>
                        <div className="text-[10px] font-bold text-[#1A3C34]">{s.value}</div>
                      </div>
                    ))}
                  </div>
                  {/* Description */}
                  <div className="px-4 py-3">
                    <p className="mb-2 text-[10px] font-bold text-[#1A3C34]">관리 가이드</p>
                    <p className="text-[9px] leading-relaxed text-[#5a7a6e]">
                      밝은 간접광에서 잘 자라요. 흙이 마르면 충분히 주세요. 과습에 주의하고 잎이 넓어 먼지가 쌓이면 닦아주면 좋아요.
                    </p>
                  </div>
                  {/* Greeny chat CTA */}
                  <div className="mx-3 mb-3 rounded-2xl bg-[#F0FFF4] px-3 py-2.5">
                    <p className="text-[9px] text-[#5a7a6e]">🌿 몬스테라가 말해요</p>
                    <p className="text-[10px] font-semibold text-[#1A3C34]">"오늘 잎에 물을 좀 닦아줄 수 있어? 🍃"</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Feature list */}
            <div className="flex-1 space-y-5">
              {[
                {
                  emoji: "📋",
                  title: "완전한 관리 가이드",
                  desc: "물주기 주기, 햇빛 요구량, 적정 온도·습도, 분갈이 시기까지. 식물별로 최적화된 관리법을 제공해요.",
                },
                {
                  emoji: "🔔",
                  title: "딱 맞는 시기에 알림",
                  desc: "도감 데이터와 실제 계절·날씨를 결합해서 '지금 이 식물에게 필요한 것'을 정확히 알려드려요.",
                },
                {
                  emoji: "🌤️",
                  title: "날씨 연동 맞춤 케어",
                  desc: "오늘 날씨가 맑고 건조하다면? 그리니가 먼저 알아채고 물주기 알림을 조정해요. 위치 기반으로 자동 적용됩니다.",
                },
                {
                  emoji: "⭐",
                  title: "초보자 맞춤 추천",
                  desc: "과습에 강하고 키우기 쉬운 식물을 엄선해서 초보 식집사에게 추천해요. 처음 시작이라면 여기서 고르세요.",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4 rounded-2xl bg-[#F0FFF4] p-5"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <div>
                    <p className="mb-1 font-bold text-[#1A3C34]">{item.title}</p>
                    <p className="text-sm leading-relaxed text-[#5a7a6e]">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Plant grid ── */}
      <section className="bg-[#F0FFF4] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">수록 식물</p>
            <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
              이런 식물들이 있어요
            </h2>
            <p className="mt-3 text-sm text-[#5a7a6e]">현재 미리보기 12종 · 출시 시 100여 종 전체 공개</p>
          </motion.div>

          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mb-8 flex flex-wrap justify-center gap-2"
          >
            {CATEGORIES.map((c, i) => (
              <span
                key={c}
                className="rounded-full px-4 py-1.5 text-sm font-semibold transition"
                style={
                  i === 0
                    ? { background: "#52B788", color: "#fff" }
                    : { background: "#ffffff", color: "#5a7a6e", border: "1px solid #c6e8d5" }
                }
              >
                {c}
              </span>
            ))}
          </motion.div>

          {/* Plant cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PLANTS.map((plant, i) => {
              const d = DIFFICULTY_LABELS[plant.difficulty] ?? DIFFICULTY_LABELS["쉬움"];
              return (
                <motion.div
                  key={plant.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
                  className="group rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F0FFF4] text-3xl">
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

                  <p className="mb-4 text-sm leading-relaxed text-[#5a7a6e]">{plant.desc}</p>

                  <div className="flex gap-2">
                    {[
                      { icon: "💧", text: plant.water },
                      { icon: "☀️", text: plant.light },
                    ].map((tag) => (
                      <span
                        key={tag.text}
                        className="flex items-center gap-1 rounded-full bg-[#F0FFF4] px-2.5 py-1 text-[11px] text-[#5a7a6e]"
                      >
                        {tag.icon} {tag.text}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* More indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-3"
          >
            <div className="h-px flex-1 bg-[#c6e8d5]" />
            <span className="rounded-full border border-[#c6e8d5] px-4 py-1.5 text-sm text-[#5a7a6e]">
              + 88종 더 준비 중 🌿
            </span>
            <div className="h-px flex-1 bg-[#c6e8d5]" />
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#52B788] px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6 text-6xl">📖</div>
            <h2 className="mb-4 text-3xl font-black text-white sm:text-4xl">
              100여 종 전체 도감,
              <br />
              출시 때 가장 먼저 받아보세요
            </h2>
            <p className="mb-10 text-base text-white/80">
              사전예약하시면 그리니 출시 소식을 가장 먼저 알려드려요.
            </p>
            <WaitlistForm size="large" />
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1A3C34] px-4 py-8 text-center sm:px-6">
        <Link href="/" className="text-sm text-white/50 hover:text-white transition">
          ← 그리니 랜딩 페이지로 돌아가기
        </Link>
        <p className="mt-3 text-xs text-white/30">© 2025 Greeny. All rights reserved.</p>
      </footer>
    </main>
  );
}
