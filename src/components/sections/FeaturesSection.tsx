"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function FeaturesSection({ locale }: { locale: Locale }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const t = getTranslations(locale).features;

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
            {t.sectionLabel}
          </p>
          <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
            {t.headline}
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {t.items.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-3xl bg-[#F0FFF4] p-7"
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
