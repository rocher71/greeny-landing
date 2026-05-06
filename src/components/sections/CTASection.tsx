"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { openDownloadModal } from "@/components/DownloadModal";
import { trackDownloadClick } from "@/lib/ga";

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
            지금 바로 시작해보세요
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-white/80">
            나만의 식물 친구를 만들어보세요.
            <br />
            매일 말을 걸어주는 그리니가 기다리고 있어요.
          </p>

          <div className="flex flex-col items-center gap-4">
            <motion.button
              onClick={() => { trackDownloadClick("cta_section"); openDownloadModal(); }}
              whileTap={{ scale: 0.96 }}
              className="flex cursor-pointer items-center gap-2.5 rounded-full bg-white px-10 py-4 text-lg font-bold text-[#1A3C34] shadow-lg transition hover:bg-[#f0fdf4]"
            >
              <span className="text-2xl">🪴</span>
              앱 다운받기
            </motion.button>

            <div className="flex items-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-white/70"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                App Store
              </span>
              <span className="text-white/40">·</span>
              <span className="flex items-center gap-1.5">
                <svg viewBox="0 0 24 24" className="h-4 w-4"><path fill="rgba(255,255,255,0.7)" d="M17.4 7.97L3.23-.07C2.4-.54 1.67-.47 1.22 0l12.08 12.07 4.1-4.1zM1.22 0C.8.22.5.7.5 1.32v21.36c0 .62.3 1.1.72 1.32l12.08-12.07L1.22 0zM17.3 16.08l-3.99-3.99L1.22 24.01c.45.47 1.18.53 2.01.06l14.17-8.04-.09.05zM22.03 10.13L17.4 7.97l-4.1 4.1 4.1 4.1 4.63-2.63c1.35-.77 1.35-2.02 0-2.79l-.01-.61z"/></svg>
                Google Play
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
