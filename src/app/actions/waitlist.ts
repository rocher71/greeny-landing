"use server";

import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function addToWaitlist(
  contact: string,
  contactType: "email" | "phone" = "email"
): Promise<{ success: boolean; message: string }> {
  const value = contact.trim();

  if (contactType === "email") {
    if (!value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return { success: false, message: "올바른 이메일 주소를 입력해주세요." };
    }
  } else {
    const digits = value.replace(/[^0-9]/g, "");
    if (!digits || !/^01[016789]\d{7,8}$/.test(digits)) {
      return { success: false, message: "올바른 전화번호를 입력해주세요. (예: 010-1234-5678)" };
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
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "이미 등록된 연락처예요! 출시 시 알려드릴게요 :)" };
    }
    return { success: false, message: "잠시 후 다시 시도해주세요." };
  }

  return { success: true, message: "신청 완료! 출시 소식을 가장 먼저 알려드릴게요 🌱" };
}
