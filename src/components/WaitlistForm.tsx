"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { addToWaitlist } from "@/app/actions/waitlist";
import { trackWaitlistSignup } from "@/lib/ga";
import { getTranslations, type Locale } from "@/lib/i18n";

export default function WaitlistForm({
  size = "default",
  locale = "ko",
}: {
  size?: "default" | "large";
  locale?: Locale;
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const t = getTranslations(locale).waitlistForm;
  const errors = getTranslations(locale).downloadModal.errors;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await addToWaitlist(email);
    setLoading(false);

    if (result.success) {
      setDone(true);
      setEmail("");
      trackWaitlistSignup("hero_form", "email");
      toast.success(getTranslations(locale).downloadModal.success);
    } else {
      toast.error(errors[result.code]);
    }
  }

  if (done) {
    return (
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex items-center gap-2 rounded-full bg-[#52B788] px-6 py-3 text-white font-medium"
      >
        <span>🌱</span>
        <span>{t.done}</span>
      </motion.div>
    );
  }

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={t.placeholder}
        required
        className={`flex-1 rounded-full border border-[#c6e8d5] bg-white px-5 text-[#1A3C34] placeholder-[#5a7a6e] outline-none focus:border-[#52B788] focus:ring-2 focus:ring-[#52B788]/20 transition-all min-h-[48px] ${isLarge ? "py-4 text-base" : "py-3 text-sm"}`}
      />
      <motion.button
        type="submit"
        disabled={loading}
        whileTap={{ scale: 0.97 }}
        className={`shrink-0 cursor-pointer rounded-full bg-[#52B788] font-semibold text-white transition-colors hover:bg-[#3a9e72] disabled:opacity-60 min-h-[48px] ${isLarge ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"}`}
      >
        {loading ? t.submitLoading : t.submit}
      </motion.button>
    </form>
  );
}
