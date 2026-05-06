"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import WaitlistForm from "@/components/WaitlistForm";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="cta" className="bg-[#52B788] px-4 py-20 text-white sm:px-6 sm:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 text-6xl">🌱</div>
          <h2 className="mb-4 text-3xl font-black sm:text-4xl md:text-5xl">
            가장 먼저 만나보세요
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            그리니가 출시되면 사전예약자분들께 가장 먼저 알려드릴게요.
            <br />
            소중한 식물 친구를 기다려주세요.
          </p>

          <div className="flex justify-center">
            <WaitlistForm size="large" />
          </div>

          <p className="mt-6 text-sm text-white/60">
            스팸 메일은 절대 보내지 않아요 · 언제든 수신 취소 가능
          </p>
        </motion.div>
      </div>
    </section>
  );
}
