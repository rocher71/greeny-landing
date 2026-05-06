"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function PainSection({ locale }: { locale: Locale }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = getTranslations(locale).pain;

  return (
    <section ref={ref} className="bg-white px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#52B788]">
            {t.sectionLabel}
          </p>
          <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
            {t.headline}
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {t.items.map((pain, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="rounded-3xl border border-[#e8f5e9] bg-[#F0FFF4] p-7 text-center"
            >
              <div className="mb-4 text-5xl">{pain.emoji}</div>
              <h3 className="mb-2 text-lg font-bold text-[#1A3C34]">{pain.title}</h3>
              <p className="text-sm leading-relaxed text-[#5a7a6e]">{pain.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center text-xl font-bold text-[#1A3C34]"
        >
          {t.closing}
        </motion.p>
      </div>
    </section>
  );
}
