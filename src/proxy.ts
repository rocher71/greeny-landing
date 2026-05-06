import { NextRequest, NextResponse } from "next/server";
import type { Locale } from "@/lib/i18n";

function detectLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get("greeny-locale")?.value;
  if (cookie === "ko" || cookie === "en") return cookie;

  // Vercel geo (production only)
  const country = (req as NextRequest & { geo?: { country?: string } }).geo?.country;
  if (country === "KR") return "ko";

  // Accept-Language header fallback (works in all environments)
  const acceptLang = req.headers.get("accept-language") ?? "";
  if (/\bko\b/i.test(acceptLang)) return "ko";

  return "en";
}

export function proxy(req: NextRequest) {
  const locale = detectLocale(req);
  const res = NextResponse.next();
  res.cookies.set("greeny-locale", locale, {
    maxAge: 60 * 60 * 24 * 365,
    path: "/",
    sameSite: "lax",
  });
  return res;
}

export const config = {
  matcher: ["/((?!_next|favicon.ico|opengraph-image|.*\\..*).*)"],
};
