import { ko } from "./ko";
import { en } from "./en";
import type { Locale, Translations } from "./types";

export type { Locale, Translations };

const dict: Record<Locale, Translations> = { ko, en };

export function getTranslations(locale: Locale): Translations {
  return dict[locale];
}

export function toLocale(value: string | undefined): Locale {
  if (value === "ko" || value === "en") return value;
  return "en";
}
