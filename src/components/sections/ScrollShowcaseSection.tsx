"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const scenes = [
  {
    tag: "AI 대화",
    title: "식물이\n먼저 말을 걸어요",
    desc: "매일 식물이 안부를 물어봐요. 오늘 하루 어땠는지, 날씨는 괜찮은지.",
    bg: "from-[#e8f5e9] to-[#F0FFF4]",
    accent: "#52B788",
    preview: (
      <div className="flex flex-col gap-3 p-2">
        <div className="flex items-end gap-2">
          <span className="text-2xl">🌿</span>
          <div className="rounded-2xl rounded-bl-sm bg-[#52B788] px-4 py-2.5 text-sm text-white max-w-[200px]">
            오늘 하루 어떻게 지냈어? 날씨가 포근했던데 🌤️
          </div>
        </div>
        <div className="flex justify-end">
          <div className="rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm text-[#1A3C34] shadow-sm max-w-[200px]">
            오늘 좋은 일이 있었어! 너한테 얘기하고 싶었어
          </div>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-2xl">🌿</span>
          <div className="rounded-2xl rounded-bl-sm bg-[#52B788] px-4 py-2.5 text-sm text-white max-w-[200px]">
            정말? 나도 궁금해! 얘기해줘 🌱
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "스마트 알림",
    title: "물 줄 시간을\n자동으로 알려드려요",
    desc: "식물 종류와 계절을 분석해서 딱 맞는 시간에 알려줘요. 더 이상 식물을 시들게 하지 않아도 돼요.",
    bg: "from-[#eff6ff] to-[#F0FFF4]",
    accent: "#3b82f6",
    preview: (
      <div className="flex flex-col gap-3">
        <div className="rounded-2xl bg-white shadow-md px-4 py-4 flex items-center gap-3">
          <span className="text-3xl">💧</span>
          <div>
            <p className="text-xs text-[#5a7a6e] font-medium">그리니 알림</p>
            <p className="text-sm font-bold text-[#1A3C34]">몬스테라에게 물을 줄 시간이에요!</p>
            <p className="text-xs text-[#5a7a6e] mt-0.5">7일째 물을 못 받았어요 🥺</p>
          </div>
        </div>
        <div className="rounded-2xl bg-white shadow-md px-4 py-3 flex items-center gap-3">
          <span className="text-3xl">☀️</span>
          <div>
            <p className="text-xs text-[#5a7a6e] font-medium">오늘의 관리 팁</p>
            <p className="text-sm font-bold text-[#1A3C34]">햇빛이 강해요, 그늘로 옮겨주세요</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    tag: "인격 성장",
    title: "대화할수록\n인격이 자라나요",
    desc: "누적된 대화가 식물의 성격을 만들어요. 내 이야기를 들어주는 세상 하나뿐인 식물 친구.",
    bg: "from-[#fef9ee] to-[#F0FFF4]",
    accent: "#f59e0b",
    preview: (
      <div className="flex flex-col gap-2">
        <div className="rounded-2xl bg-white shadow-sm px-4 py-3">
          <p className="text-xs text-[#5a7a6e] mb-2 font-medium">몬스테라의 성격</p>
          <div className="flex flex-wrap gap-1.5">
            {["따뜻함 ☀️", "수다스러움 💬", "호기심 많음 🔍", "응원단장 📣"].map((trait) => (
              <span key={trait} className="rounded-full bg-[#fff3c4] px-3 py-1 text-xs font-medium text-[#1A3C34]">
                {trait}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl bg-[#52B788] px-4 py-3 text-white text-sm">
          우리가 나눈 대화가 벌써 <strong>47개</strong>야 🌿<br />
          <span className="text-white/80 text-xs">처음보다 훨씬 친해진 것 같아!</span>
        </div>
      </div>
    ),
  },
];

export default function ScrollShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);

  // 직접 스크롤 이벤트로 progress 계산 (sticky + useScroll target 호환성 문제 회피)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const scrolled = -rect.top;
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      progress.set(Math.max(0, Math.min(1, scrolled / total)));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [progress]);

  // Scene 0: 0 ~ 0.30 유지, 0.30 ~ 0.42 페이드아웃
  const scene0Opacity = useTransform(progress, [0, 0.30, 0.42], [1, 1, 0]);
  const scene0Y      = useTransform(progress, [0, 0.42], ["0%", "-8%"]);

  // Scene 1: 0.36 ~ 0.46 페이드인, 0.46 ~ 0.62 유지, 0.62 ~ 0.72 페이드아웃
  const scene1Opacity = useTransform(progress, [0.36, 0.46, 0.62, 0.72], [0, 1, 1, 0]);
  const scene1Y       = useTransform(progress, [0.36, 0.72], ["6%", "-6%"]);

  // Scene 2: 0.66 ~ 0.76 페이드인, 이후 유지
  const scene2Opacity = useTransform(progress, [0.66, 0.76, 1], [0, 1, 1]);
  const scene2Y       = useTransform(progress, [0.66, 1], ["6%", "0%"]);

  const sceneAnimations = [
    { opacity: scene0Opacity, y: scene0Y },
    { opacity: scene1Opacity, y: scene1Y },
    { opacity: scene2Opacity, y: scene2Y },
  ];

  const dot0 = useTransform(progress, [0, 0.30, 0.42], [1, 1, 0.3]);
  const dot1 = useTransform(progress, [0.36, 0.46, 0.62, 0.72], [0.3, 1, 1, 0.3]);
  const dot2 = useTransform(progress, [0.66, 0.76], [0.3, 1]);
  const progressDots = [dot0, dot1, dot2];

  return (
    <div ref={ref} className="relative h-[360vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {scenes.map((scene, i) => (
          <motion.div
            key={scene.tag}
            style={{ opacity: sceneAnimations[i].opacity, y: sceneAnimations[i].y }}
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${scene.bg} px-4`}
          >
            <div className="w-full max-w-4xl">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-16">
                {/* 텍스트 */}
                <div className="flex-1 text-center md:text-left">
                  <span
                    className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                    style={{ background: scene.accent }}
                  >
                    {scene.tag}
                  </span>
                  <h2 className="mb-4 whitespace-pre-line text-3xl font-black leading-tight text-[#1A3C34] sm:text-4xl md:text-5xl">
                    {scene.title}
                  </h2>
                  <p className="max-w-xs text-sm leading-relaxed text-[#5a7a6e] sm:text-base md:max-w-sm">
                    {scene.desc}
                  </p>
                </div>

                {/* 프리뷰 카드 */}
                <div className="w-full max-w-[280px] flex-shrink-0 rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur-sm sm:max-w-[320px]">
                  {scene.preview}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        {/* 진행 도트 */}
        <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2">
          {progressDots.map((dotOpacity, i) => (
            <motion.div
              key={i}
              style={{ opacity: dotOpacity }}
              className="h-2 w-2 rounded-full bg-[#52B788]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
