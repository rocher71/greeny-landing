"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

const plantEmojis = ["🪴", "🌵", "🌸"];

export default function GardenSection({ locale }: { locale: Locale }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const t = getTranslations(locale).garden;

  const plantColors = ["#52B788", "#f59e0b", "#ec4899"];
  const plantLevels = [12, 7, 3];

  return (
    <section ref={ref} className="overflow-hidden bg-[#F0FFF4] px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            {t.sectionLabel}
          </p>
          <h2 className="mb-4 text-3xl font-black text-[#1A3C34] sm:text-4xl">
            {t.headline}
          </h2>
          <p className="mx-auto max-w-sm whitespace-pre-line text-sm leading-relaxed text-[#5a7a6e] sm:text-base">
            {t.desc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="rounded-3xl bg-white p-6 shadow-lg sm:p-10"
        >
          <div className="mb-8 flex items-end justify-center gap-6 sm:gap-12">
            {t.plants.map((plant, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.12 }}
                whileHover={{ y: -8, scale: 1.06 }}
                className="flex cursor-default flex-col items-center gap-2"
              >
                <span
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold text-white"
                  style={{ background: plantColors[i] }}
                >
                  Lv.{plantLevels[i]}
                </span>
                <div
                  className="flex items-center justify-center rounded-2xl border-2 bg-[#F0FFF4]"
                  style={{
                    borderColor: plantColors[i] + "40",
                    width: i === 1 ? 88 : 72,
                    height: i === 1 ? 88 : 72,
                    fontSize: i === 1 ? 48 : 38,
                  }}
                >
                  {plantEmojis[i]}
                </div>
                <span className="text-xs font-bold text-[#1A3C34]">{plant.name}</span>
                <span className="text-[10px] text-[#5a7a6e]">{plant.trait}</span>
              </motion.div>
            ))}
          </div>

          <div className="mx-auto mb-6 h-3 max-w-xs rounded-full bg-gradient-to-r from-[#c6e8d5] via-[#52B788] to-[#c6e8d5] opacity-40" />

          <div className="grid grid-cols-3 gap-3">
            {t.stats.map((stat, i) => (
              <motion.div
                key={i}
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
