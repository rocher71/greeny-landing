"use server";

import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";

export async function addToWaitlist(email: string): Promise<{ success: boolean; message: string }> {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: "올바른 이메일 주소를 입력해주세요." };
  }

  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim() ?? null;
  const userAgent = headersList.get("user-agent") ?? null;

  const { error } = await supabaseAdmin.from("waitlist_greeny").insert({
    contact: email.toLowerCase().trim(),
    contact_type: "email",
    ip_address: ip,
    user_agent: userAgent,
  });

  if (error) {
    if (error.code === "23505") {
      return { success: false, message: "이미 등록된 이메일이에요! 출시 시 알려드릴게요 :)" };
    }
    return { success: false, message: "잠시 후 다시 시도해주세요." };
  }

  return { success: true, message: "사전예약 완료! 출시 소식을 가장 먼저 알려드릴게요 🌱" };
}
