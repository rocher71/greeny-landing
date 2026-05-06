declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export function trackDownloadClick(source: "hero" | "cta_section" | "floating_cta") {
  window.gtag?.("event", "download_cta_click", { source });
}

export function trackWaitlistSignup(
  source: "hero_form" | "download_modal",
  method: "email" | "phone"
) {
  window.gtag?.("event", "waitlist_signup", { source, method });
}
