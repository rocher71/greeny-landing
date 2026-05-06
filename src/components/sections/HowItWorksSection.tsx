"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function HowItWorksSection({ locale }: { locale: Locale }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = getTranslations(locale).howItWorks;

  return (
    <section ref={ref} className="bg-white px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">
            {t.sectionLabel}
          </p>
          <h2 className="mb-6 text-3xl font-black text-[#1A3C34] sm:text-4xl">
            {t.headline}
          </h2>
          <p className="mb-12 whitespace-pre-line text-sm leading-relaxed text-[#5a7a6e] sm:text-base">
            {t.subtext}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto mb-12 flex h-40 w-40 items-center justify-center rounded-full bg-[#52B788] text-7xl shadow-2xl sm:h-48 sm:w-48"
        >
          📸
          <span className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFD166] text-xl font-black text-[#1A3C34] shadow-md">
            1
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid gap-3 sm:grid-cols-3"
        >
          {t.steps.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              className="flex items-center gap-3 rounded-2xl bg-[#F0FFF4] px-4 py-3 sm:flex-col sm:gap-2 sm:py-4"
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-sm font-medium text-[#1A3C34]">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
