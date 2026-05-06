"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { addToWaitlist } from "@/app/actions/waitlist";
import { trackWaitlistSignup } from "@/lib/ga";

export function openDownloadModal() {
  window.dispatchEvent(new CustomEvent("open-download-modal"));
}

function AppleLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-white" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}

function PlayLogo() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
      <path fill="#EA4335" d="M1.22 0C.8.22.5.7.5 1.32v21.36c0 .62.3 1.1.72 1.32l.11.06 11.97-11.97v-.28L1.33-.06l-.11.06z"/>
      <path fill="#FBBC04" d="M17.3 16.08l-3.99-3.99v-.28l3.99-3.99.09.05 4.73 2.69c1.35.77 1.35 2.02 0 2.79L17.4 16.03l-.09.05z"/>
      <path fill="#4285F4" d="M17.4 16.03L13.3 11.93 1.22 24.01c.45.47 1.18.53 2.01.06l14.17-8.04"/>
      <path fill="#34A853" d="M17.4 7.97L3.23-.07C2.4-.54 1.67-.47 1.22 0l12.08 12.07 4.1-4.1z"/>
    </svg>
  );
}

function formatPhone(input: string): string {
  const digits = input.replace(/[^0-9]/g, "").slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
}

export default function DownloadModal() {
  const [open, setOpen] = useState(false);
  const [contactType, setContactType] = useState<"email" | "phone">("email");
  const [value, setValue] = useState("");
  const [marketingAgreed, setMarketingAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = () => { setOpen(true); setDone(false); setValue(""); setMarketingAgreed(false); };
    window.addEventListener("open-download-modal", handler);
    return () => window.removeEventListener("open-download-modal", handler);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function handleStoreClick(store: "ios" | "android") {
    toast(`${store === "ios" ? "iOS" : "Android"} 앱 출시 준비 중이에요! 아래서 알림을 신청해 주세요 🌱`, {
      duration: 3000,
    });
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(formatPhone(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await addToWaitlist(value, contactType, marketingAgreed);
    setLoading(false);
    if (result.success) {
      setDone(true);
      trackWaitlistSignup("download_modal", contactType);
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  }

  const placeholder = contactType === "email" ? "이메일 주소 입력" : "전화번호 입력";
  const inputType = contactType === "email" ? "email" : "text";

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* 오버레이 */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* 모달 — 모바일: 하단 시트, 데스크톱: 중앙 */}
          <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-4">
            <motion.div
              key="modal"
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 60 }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="relative w-full max-w-sm rounded-t-3xl bg-white p-6 pb-8 shadow-2xl sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 닫기 */}
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#F0FFF4] text-[#5a7a6e] transition hover:bg-[#e8f5e9]"
              >
                ✕
              </button>

              {/* 앱 아이콘 + 이름 */}
              <div className="mb-6 text-center">
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-[20px] bg-[#52B788] text-4xl shadow-md">
                  🪴
                </div>
                <p className="text-xl font-black text-[#1A3C34]">greeny</p>
                <p className="text-sm text-[#5a7a6e]">나만의 식물 친구</p>
              </div>

              {/* 스토어 버튼 */}
              <div className="mb-6 space-y-3">
                <button
                  onClick={() => handleStoreClick("ios")}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-black py-3.5 text-white transition hover:bg-neutral-800 active:scale-[0.98]"
                >
                  <AppleLogo />
                  <div className="text-left">
                    <p className="text-[10px] leading-none text-white/60">Download on the</p>
                    <p className="text-base font-semibold leading-tight">App Store</p>
                  </div>
                </button>

                <button
                  onClick={() => handleStoreClick("android")}
                  className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-2xl border border-[#e8f5e9] bg-white py-3.5 text-[#1A3C34] transition hover:bg-[#F0FFF4] active:scale-[0.98]"
                >
                  <PlayLogo />
                  <div className="text-left">
                    <p className="text-[10px] leading-none text-[#5a7a6e]">GET IT ON</p>
                    <p className="text-base font-semibold leading-tight">Google Play</p>
                  </div>
                </button>
              </div>

              {/* 구분선 */}
              <div className="mb-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-[#e8f5e9]" />
                <span className="text-xs font-medium text-[#5a7a6e]">또는 출시 알림 받기</span>
                <div className="h-px flex-1 bg-[#e8f5e9]" />
              </div>

              {done ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="rounded-2xl bg-[#52B788] px-4 py-4 text-center text-white"
                >
                  <p className="text-2xl mb-1">🌱</p>
                  <p className="font-bold">신청 완료!</p>
                  <p className="text-sm text-white/80">출시 소식을 가장 먼저 알려드릴게요</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* 이메일 / 전화번호 토글 */}
                  <div className="flex rounded-xl bg-[#F0FFF4] p-1">
                    {(["email", "phone"] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => { setContactType(type); setValue(""); }}
                        className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-semibold transition-all ${
                          contactType === type
                            ? "bg-white text-[#1A3C34] shadow-sm"
                            : "text-[#5a7a6e]"
                        }`}
                      >
                        {type === "email" ? "📧 이메일" : "📱 전화번호"}
                      </button>
                    ))}
                  </div>

                  <input
                    type={inputType}
                    inputMode={contactType === "phone" ? "numeric" : undefined}
                    value={value}
                    onChange={contactType === "phone" ? handlePhoneChange : (e) => setValue(e.target.value)}
                    placeholder={placeholder}
                    required
                    className="w-full rounded-xl border border-[#c6e8d5] bg-white px-4 py-3 text-[#1A3C34] placeholder-[#5a7a6e] outline-none transition focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20"
                  />

                  {/* 마케팅 수신 동의 (선택) */}
                  <label className="flex cursor-pointer items-start gap-2.5">
                    <div
                      onClick={() => setMarketingAgreed(!marketingAgreed)}
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border-2 transition-all ${
                        marketingAgreed
                          ? "border-[#52B788] bg-[#52B788]"
                          : "border-[#c6e8d5] bg-white"
                      }`}
                    >
                      {marketingAgreed && (
                        <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                          <path d="M1 4.5l3 3L10 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs leading-relaxed text-[#5a7a6e]">
                      <span className="font-semibold text-[#1A3C34]">마케팅 알림 수신 동의</span>{" "}
                      <span className="text-[#8395A0]">(선택)</span>
                      <br />
                      출시 이벤트, 새 기능 소식 등 유용한 정보를 받아볼게요.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full cursor-pointer rounded-xl bg-[#52B788] py-3.5 font-bold text-white transition hover:bg-[#3a9e72] disabled:opacity-60 active:scale-[0.98]"
                  >
                    {loading ? "신청 중..." : "출시 알림 신청하기"}
                  </button>

                  {/* 개인정보 안내 */}
                  <p className="text-center text-[11px] leading-relaxed text-[#8395A0]">
                    입력하신 연락처는 <span className="font-medium text-[#5a7a6e]">출시 알림 발송 후 즉시 폐기</span>되며,
                    그 외 목적으로 사용되지 않아요.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
