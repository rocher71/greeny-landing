"use server";

import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export type WaitlistErrorCode =
  | "INVALID_EMAIL"
  | "INVALID_PHONE"
  | "DUPLICATE_CONTACT"
  | "SERVER_ERROR";

export async function addToWaitlist(
  contact: string,
  contactType: "email" | "phone" = "email",
  marketingAgreed = false
): Promise<{ success: true } | { success: false; code: WaitlistErrorCode }> {
  const value = contact.trim();

  if (contactType === "email") {
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { success: false, code: "INVALID_EMAIL" };
    }
  } else {
    const digits = value.replace(/[^0-9]/g, "");
    if (!digits || !/^01[016789]\d{7,8}$/.test(digits)) {
      return { success: false, code: "INVALID_PHONE" };
    }
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  const userAgent = headersList.get("user-agent") ?? null;

  const { error } = await supabaseAdmin.from("waitlist_greeny").insert({
    contact: value.toLowerCase(),
    contact_type: contactType,
    ip_address: ip,
    user_agent: userAgent,
    marketing_agreed: marketingAgreed,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, code: "DUPLICATE_CONTACT" };
    }
    return { success: false, code: "SERVER_ERROR" };
  }

  return { success: true };
}
