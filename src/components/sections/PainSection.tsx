"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const pains = [
  {
    emoji: "💀",
    title: "또 식물을 죽였어요",
    desc: "물을 언제 줘야 할지 몰라서, 이번에도…",
  },
  {
    emoji: "🤷",
    title: "뭐가 문제인지 모르겠어요",
    desc: "잎이 노랗게 됐는데 과습인지 건조인지 모르겠고",
  },
  {
    emoji: "😶",
    title: "식물이 그냥 거기 있어요",
    desc: "키우는 건지 방치하는 건지… 교감이 없어요",
  },
];

export default function PainSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="bg-white px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#52B788]">
            공감하시나요?
          </p>
          <h2 className="text-3xl font-black text-[#1A3C34] sm:text-4xl">
            식물 키우기, 이런 경험 있으신가요?
          </h2>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-3">
          {pains.map((pain, i) => (
            <motion.div
              key={pain.title}
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
          그리니가 도와드릴게요 🌱
        </motion.p>
      </div>
    </section>
  );
}
