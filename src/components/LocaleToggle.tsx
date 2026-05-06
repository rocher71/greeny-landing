"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LocaleToggle({ current }: { current: Locale }) {
  const router = useRouter();

  function toggle() {
    const next: Locale = current === "ko" ? "en" : "ko";
    document.cookie = `greeny-locale=${next}; max-age=31536000; path=/; samesite=lax`;
    router.refresh();
  }

  return (
    <button
      onClick={toggle}
      className="text-sm text-white/50 transition-colors hover:text-white"
    >
      {current === "ko" ? "EN" : "한국어"}
    </button>
  );
}
