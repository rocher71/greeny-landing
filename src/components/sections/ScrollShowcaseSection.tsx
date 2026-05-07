"use client";

import { useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getTranslations, type Locale } from "@/lib/i18n";

function Scene0Preview({ locale }: { locale: Locale }) {
  const p = getTranslations(locale).scrollShowcase.scene0Preview;
  return (
    <div className="flex flex-col gap-3 p-2">
      <div className="flex items-end gap-2">
        <span className="text-2xl">🌿</span>
        <div className="rounded-2xl rounded-bl-sm bg-[#52B788] px-4 py-2.5 text-sm text-white max-w-[200px]">
          {p.plantMsg1}
        </div>
      </div>
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-sm text-[#1A3C34] shadow-sm max-w-[200px]">
          {p.userMsg}
        </div>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-2xl">🌿</span>
        <div className="rounded-2xl rounded-bl-sm bg-[#52B788] px-4 py-2.5 text-sm text-white max-w-[200px]">
          {p.plantMsg2}
        </div>
      </div>
    </div>
  );
}

function Scene1Preview({ locale }: { locale: Locale }) {
  const p = getTranslations(locale).scrollShowcase.scene1Preview;
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl bg-white shadow-md px-4 py-4 flex items-center gap-3">
        <span className="text-3xl">💧</span>
        <div>
          <p className="text-xs text-[#5a7a6e] font-medium">{p.notifLabel1}</p>
          <p className="text-sm font-bold text-[#1A3C34]">{p.notifTitle1}</p>
          <p className="text-xs text-[#5a7a6e] mt-0.5">{p.notifBody1}</p>
        </div>
      </div>
      <div className="rounded-2xl bg-white shadow-md px-4 py-3 flex items-center gap-3">
        <span className="text-3xl">☀️</span>
        <div>
          <p className="text-xs text-[#5a7a6e] font-medium">{p.tipLabel}</p>
          <p className="text-sm font-bold text-[#1A3C34]">{p.tipTitle}</p>
        </div>
      </div>
    </div>
  );
}

function Scene2Preview({ locale }: { locale: Locale }) {
  const p = getTranslations(locale).scrollShowcase.scene2Preview;
  return (
    <div className="flex flex-col gap-2">
      <div className="rounded-2xl bg-white shadow-sm px-4 py-3">
        <p className="text-xs text-[#5a7a6e] mb-2 font-medium">{p.personalityLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          {p.traits.map((trait) => (
            <span key={trait} className="rounded-full bg-[#fff3c4] px-3 py-1 text-xs font-medium text-[#1A3C34]">
              {trait}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-[#52B788] px-4 py-3 text-white text-sm">
        {p.chatCountPre}<strong>{p.chatCount}</strong>{p.chatCountPost}<br />
        <span className="text-white/80 text-xs">{p.chatSub}</span>
      </div>
    </div>
  );
}

const sceneBgs = [
  "from-[#e8f5e9] to-[#F0FFF4]",
  "from-[#eff6ff] to-[#F0FFF4]",
  "from-[#fef9ee] to-[#F0FFF4]",
];
const sceneAccents = ["#52B788", "#3b82f6", "#f59e0b"];

export default function ScrollShowcaseSection({ locale }: { locale: Locale }) {
  const ref = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const t = getTranslations(locale).scrollShowcase;

  const previews = [
    <Scene0Preview key={0} locale={locale} />,
    <Scene1Preview key={1} locale={locale} />,
    <Scene2Preview key={2} locale={locale} />,
  ];

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

  const scene0Opacity = useTransform(progress, [0, 0.30, 0.42], [1, 1, 0]);
  const scene0Y      = useTransform(progress, [0, 0.42], ["0%", "-8%"]);
  const scene1Opacity = useTransform(progress, [0.36, 0.46, 0.62, 0.72], [0, 1, 1, 0]);
  const scene1Y       = useTransform(progress, [0.36, 0.72], ["6%", "-6%"]);
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
        {t.scenes.map((scene, i) => (
          <motion.div
            key={i}
            style={{ opacity: sceneAnimations[i].opacity, y: sceneAnimations[i].y }}
            className={`absolute inset-0 flex items-center justify-center bg-gradient-to-br ${sceneBgs[i]} px-4`}
          >
            <div className="w-full max-w-4xl">
              <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:gap-16">
                <div className="flex-1 text-center md:text-left">
                  <span
                    className="mb-4 inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest text-white"
                    style={{ background: sceneAccents[i] }}
                  >
                    {scene.tag}
                  </span>
                  <h2 className="mb-4 whitespace-pre-line text-3xl font-black leading-tight text-[#1A3C34] sm:text-4xl md:text-5xl">
                    {scene.title}
                  </h2>
                  <p className="max-w-xs whitespace-pre-line text-sm leading-relaxed text-[#5a7a6e] sm:text-base md:max-w-sm">
                    {scene.desc}
                  </p>
                </div>

                <div className="w-full max-w-[280px] flex-shrink-0 rounded-3xl bg-white/80 p-5 shadow-xl backdrop-blur-sm sm:max-w-[320px]">
                  {previews[i]}
                </div>
              </div>
            </div>
          </motion.div>
        ))}

        <div className="absolute right-5 top-1/2 flex -translate-y-1/2 flex-col gap-2 md:right-8">
          {progressDots.map((dotOpacity, i) => (
            <motion.div
              key={i}
              style={{ opacity: dotOpacity }}
              className="h-6 w-1.5 rounded-full bg-[#52B788]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
