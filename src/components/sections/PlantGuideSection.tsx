"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { getTranslations, type Locale } from "@/lib/i18n";
import type { Translations } from "@/lib/i18n/types";

// ─── Design tokens (mint palette) ───────────────────────────
const P = {
  primary: "#3FB89B",
  primaryDark: "#2F947D",
  primarySoft: "#DEF3EE",
  primaryTint: "#EDF8F5",
  bg: "#EFF8F5",
  card: "#FFFFFF",
  text: "#0F2622",
  textSec: "#4F665F",
  textTer: "#8395A0",
  border: "rgba(40,90,80,0.09)",
  badgeEasy: { bg: "#DEF3EE", fg: "#2F947D" },
  badgeMed: { bg: "#FBEFCE", fg: "#8C6710" },
  badgeHard: { bg: "#F8DCD2", fg: "#A03B22" },
};

// ─── SVG icons ───────────────────────────────────────────────
const Icon = {
  search: (c: string) => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="7" cy="7" r="5.25" stroke={c} strokeWidth="1.6" />
      <path d="M11 11l3 3" stroke={c} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  ),
  drop: (c: string) => (
    <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
      <path d="M9 1.5C9 1.5 2 9 2 13.5a7 7 0 0014 0C16 9 9 1.5 9 1.5z" fill={c} />
      <path d="M5.5 13.5c0 1.5 1 3 2.5 3.5" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  ),
  sun: (c: string) => (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle cx="11" cy="11" r="4.2" fill={c} />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => {
        const r = (a * Math.PI) / 180;
        return <line key={i} x1={11 + Math.cos(r) * 7} y1={11 + Math.sin(r) * 7} x2={11 + Math.cos(r) * 9.5} y2={11 + Math.sin(r) * 9.5} stroke={c} strokeWidth="1.7" strokeLinecap="round" />;
      })}
    </svg>
  ),
  thermo: (c: string) => (
    <svg width="14" height="22" viewBox="0 0 14 22" fill="none">
      <path d="M7 2a2.5 2.5 0 00-2.5 2.5v10a4 4 0 105 0v-10A2.5 2.5 0 007 2z" stroke={c} strokeWidth="1.6" fill="none" />
      <circle cx="7" cy="17" r="2.2" fill={c} />
      <rect x="6.3" y="6" width="1.4" height="9" rx="0.7" fill={c} />
    </svg>
  ),
  home: (c: string, filled?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V11z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={filled ? c : "none"} />
    </svg>
  ),
  book: (c: string, filled?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 4.5A1.5 1.5 0 015.5 3h6V21h-6A1.5 1.5 0 014 19.5v-15zM20 4.5A1.5 1.5 0 0018.5 3h-6V21h6a1.5 1.5 0 001.5-1.5v-15z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={filled ? c : "none"} />
    </svg>
  ),
  chat: (c: string, filled?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 5.5A1.5 1.5 0 015.5 4h13A1.5 1.5 0 0120 5.5v10A1.5 1.5 0 0118.5 17H10l-4.5 3.5V17H5.5A1.5 1.5 0 014 15.5v-10z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={filled ? c : "none"} />
    </svg>
  ),
  user: (c: string, filled?: boolean) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8.5" r="3.8" stroke={c} strokeWidth="1.8" fill={filled ? c : "none"} />
      <path d="M4.5 21c.5-4.2 4-7 7.5-7s7 2.8 7.5 7" stroke={c} strokeWidth="1.8" strokeLinecap="round" fill={filled ? c : "none"} />
    </svg>
  ),
  bell: (c: string) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M5.5 17h13l-1.5-2v-4a5.5 5.5 0 00-10 0v4l-1.5 2zM10 20a2 2 0 004 0" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  filter: (c: string) => (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <path d="M2 4h14M4 9h10M7 14h4" stroke={c} strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  ),
  back: (c: string) => (
    <svg width="11" height="18" viewBox="0 0 11 18" fill="none">
      <path d="M9 1L1.5 9 9 17" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  heart: (c: string, filled?: boolean) => (
    <svg width="20" height="20" viewBox="0 0 22 20" fill="none">
      <path d="M11 18C11 18 1.5 12.5 1.5 6.5A4.5 4.5 0 0111 4.7 4.5 4.5 0 0120.5 6.5C20.5 12.5 11 18 11 18z" stroke={c} strokeWidth="1.8" strokeLinejoin="round" fill={filled ? c : "none"} />
    </svg>
  ),
  share: (c: string) => (
    <svg width="18" height="20" viewBox="0 0 18 22" fill="none">
      <path d="M9 1v14M9 1l-4 4M9 1l4 4M2 11v8a2 2 0 002 2h10a2 2 0 002-2v-8" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  check: (c: string) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M2 7.5l3.5 3.5L12 3.5" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  ),
  plus: (c: string) => (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path d="M7 2v10M2 7h10" stroke={c} strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

function Photo({ label, w = "100%", h = "100%", radius = 12, style = {} }: {
  label: string; w?: string | number; h?: string | number; radius?: number; style?: React.CSSProperties;
}) {
  return (
    <div style={{ width: w, height: h, borderRadius: radius, background: "linear-gradient(135deg,#d8ddd6 0%,#c8cfc6 100%)", position: "relative", overflow: "hidden", flexShrink: 0, ...style }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.35, backgroundImage: "repeating-linear-gradient(45deg,transparent 0 8px,rgba(0,0,0,0.04) 8px 9px)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "ui-monospace,monospace", fontSize: 10, fontWeight: 500, color: "rgba(40,55,45,0.55)", letterSpacing: 0.3, textAlign: "center", padding: 6 }}>{label}</div>
    </div>
  );
}

function TabBar({ active, t }: { active: string; t: Translations["plantGuide"]["tabBar"] }) {
  const tabs = [
    { key: "home", label: t.home, icon: Icon.home },
    { key: "book", label: t.book, icon: Icon.book },
    { key: "chat", label: t.chat, icon: Icon.chat },
    { key: "me", label: t.me, icon: Icon.user },
  ];
  return (
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 88, paddingBottom: 28, paddingTop: 8, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderTop: "0.5px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-around", alignItems: "center", zIndex: 10 }}>
      {tabs.map((tab) => {
        const isActive = tab.key === active;
        const c = isActive ? P.primary : "#9BA8A2";
        return (
          <div key={tab.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, flex: 1 }}>
            {tab.icon(c, isActive)}
            <div style={{ fontSize: 10, fontWeight: isActive ? 700 : 500, color: c }}>{tab.label}</div>
          </div>
        );
      })}
    </div>
  );
}

function IOSDevice({ children, scale = 1 }: { children: React.ReactNode; scale?: number }) {
  const W = 360, H = 780;
  return (
    <div style={{ width: W * scale, height: H * scale, flexShrink: 0, borderRadius: 48 * scale, overflow: "hidden", position: "relative", boxShadow: "0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)", background: "#F2F2F7" }}>
      <div style={{ position: "absolute", top: 11 * scale, left: "50%", transform: "translateX(-50%)", width: 126 * scale, height: 37 * scale, borderRadius: 24 * scale, background: "#000", zIndex: 50 }} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", padding: `${14 * scale}px ${20 * scale}px`, height: 54 * scale }}>
        <span style={{ fontSize: 15 * scale, fontWeight: 600, color: "#000" }}>9:41</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5 * scale }}>
          <svg width={19 * scale} height={12 * scale} viewBox="0 0 19 12"><rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="#000"/><rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="#000"/><rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="#000"/><rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="#000"/></svg>
          <svg width={17 * scale} height={12 * scale} viewBox="0 0 17 12"><path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="#000"/><path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="#000"/><circle cx="8.5" cy="10.5" r="1.5" fill="#000"/></svg>
          <svg width={27 * scale} height={13 * scale} viewBox="0 0 27 13"><rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#000" strokeOpacity="0.35" fill="none"/><rect x="2" y="2" width="20" height="9" rx="2" fill="#000"/><path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill="#000" fillOpacity="0.4"/></svg>
        </div>
      </div>
      <div style={{ position: "absolute", top: 0, left: 0, width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>
        {children}
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 60, height: 34 * scale, display: "flex", justifyContent: "center", alignItems: "flex-end", paddingBottom: 8 * scale, pointerEvents: "none" }}>
        <div style={{ width: 139 * scale, height: 5 * scale, borderRadius: 100, background: "rgba(0,0,0,0.25)" }} />
      </div>
    </div>
  );
}

const U = "https://images.unsplash.com";
function img(id: string, w: number, h: number) {
  return `${U}/${id}?w=${w}&h=${h}&fit=crop&q=80`;
}

const PLANT_PHOTOS = [
  img("photo-1614594975525-e45190c55d0b", 112, 112),
  img("photo-1596547609652-9cf5d8d76921", 112, 112),
  img("photo-1509587584298-0f3b3a3a1797", 112, 112),
  img("photo-1589244159943-460088ed5c92", 112, 112),
  img("photo-1598880940080-ff9a29891b85", 112, 112),
  img("photo-1485955900006-10f4d324d411", 112, 112),
];

const PLANT_FAVED = [true, false, false, true, false, false];

const DIFF_BADGE_MAP: Record<string, { bg: string; fg: string }> = {
  "쉬움": P.badgeEasy,
  "매우 쉬움": P.badgeEasy,
  "보통": P.badgeMed,
  "Easy": P.badgeEasy,
  "Very Easy": P.badgeEasy,
  "Medium": P.badgeMed,
};

function LibraryScreen({ t, tabT }: { t: Translations["plantGuide"]["libraryScreen"]; tabT: Translations["plantGuide"]["tabBar"] }) {
  return (
    <div style={{ width: "100%", height: "100%", background: P.bg, display: "flex", flexDirection: "column", fontFamily: '-apple-system,"SF Pro Text",system-ui', color: P.text, position: "relative" }}>
      <div style={{ padding: "58px 20px 0", display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontSize: 13, fontWeight: 500, color: P.primary }}>{t.greeting}</div>
          <div style={{ fontSize: 28, fontWeight: 700, lineHeight: "34px", marginTop: 4, letterSpacing: -0.6 }}>{t.title}</div>
        </div>
        <div style={{ width: 38, height: 38, borderRadius: 19, background: P.card, border: `1px solid ${P.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 8, position: "relative" }}>
          {Icon.bell(P.textSec)}
          <div style={{ position: "absolute", top: 9, right: 10, width: 7, height: 7, borderRadius: 4, background: "#E8463A", border: `1.5px solid ${P.card}` }} />
        </div>
      </div>

      <div style={{ padding: "16px 20px 0", display: "flex", gap: 8 }}>
        <div style={{ flex: 1, height: 42, borderRadius: 12, background: "#fff", border: `1px solid ${P.border}`, display: "flex", alignItems: "center", padding: "0 14px", gap: 8 }}>
          {Icon.search(P.textTer)}
          <span style={{ fontSize: 15, color: P.textTer }}>{t.searchPlaceholder}</span>
        </div>
        <div style={{ width: 42, height: 42, borderRadius: 12, background: P.primary, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 12px ${P.primary}33` }}>
          {Icon.filter("#fff")}
        </div>
      </div>

      <div style={{ padding: "12px 20px 0" }}>
        <div style={{ borderRadius: 18, padding: 14, display: "flex", gap: 12, background: `linear-gradient(135deg,${P.primarySoft} 0%,${P.primaryTint} 100%)`, border: `1px solid ${P.border}`, alignItems: "center" }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: P.primary, letterSpacing: 0.2, textTransform: "uppercase" }}>{t.featuredLabel}</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 3, color: P.text }}>{t.featuredTitle}</div>
            <div style={{ fontSize: 12, color: P.textSec, marginTop: 3, lineHeight: "17px" }}>{t.featuredDesc}</div>
          </div>
          <img src={img("photo-1501004318641-b39e6451bec6", 128, 128)} alt="" style={{ width: 64, height: 64, borderRadius: 14, objectFit: "cover", flexShrink: 0 }} />
        </div>
      </div>

      <div style={{ padding: "20px 20px 8px", display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3 }}>{t.allPlantsTitle}</div>
        <div style={{ fontSize: 13, color: P.primary, fontWeight: 600 }}>{t.sortLabel}</div>
      </div>

      <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 8, paddingBottom: 100, overflowY: "auto" }}>
        {t.plants.map((plant, idx) => {
          const badge = DIFF_BADGE_MAP[plant.diffLabel] ?? P.badgeEasy;
          return (
            <div key={idx} style={{ background: P.card, borderRadius: 16, border: `1px solid ${P.border}`, padding: 12, display: "flex", gap: 12, alignItems: "center", boxShadow: "0 1px 2px rgba(20,40,30,0.04)" }}>
              <img src={PLANT_PHOTOS[idx]} alt={plant.name} style={{ width: 56, height: 56, borderRadius: 12, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: -0.2 }}>{plant.name}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 6, background: badge.bg, color: badge.fg }}>{plant.diffLabel}</div>
                </div>
                <div style={{ fontSize: 12, color: P.textTer, marginTop: 2, fontStyle: "italic" }}>{plant.sci}</div>
                <div style={{ display: "flex", gap: 10, marginTop: 6, fontSize: 11, color: P.textSec }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <svg width="11" height="13" viewBox="0 0 11 13"><path d="M5.5 1S1 6 1 8.5a4.5 4.5 0 109 0C10 6 5.5 1 5.5 1z" fill={P.primary} /></svg>
                    {plant.water}
                  </div>
                  <div style={{ width: 1, background: P.border }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <svg width="11" height="11" viewBox="0 0 11 11"><circle cx="5.5" cy="5.5" r="2.4" fill="#E8B339" /></svg>
                    {plant.light}
                  </div>
                </div>
              </div>
              <div style={{ width: 30, height: 30, borderRadius: 15, background: PLANT_FAVED[idx] ? P.primarySoft : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {Icon.heart(PLANT_FAVED[idx] ? P.primary : P.textTer, PLANT_FAVED[idx])}
              </div>
            </div>
          );
        })}
      </div>

      <TabBar active="book" t={tabT} />
    </div>
  );
}

function DetailScreen({ t, tabT }: { t: Translations["plantGuide"]["detailScreen"]; tabT: Translations["plantGuide"]["tabBar"] }) {
  return (
    <div style={{ width: "100%", height: "100%", background: P.bg, display: "flex", flexDirection: "column", fontFamily: '-apple-system,"SF Pro Text",system-ui', color: P.text, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "relative", height: 320, flexShrink: 0 }}>
        <img src={img("photo-1614594975525-e45190c55d0b", 720, 640)} alt={t.plantName} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        <div style={{ position: "absolute", top: 56, left: 0, right: 0, padding: "0 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {Icon.back("#1B2620")}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[Icon.share("#1B2620"), Icon.heart("#E8463A", true)].map((icon, i) => (
              <div key={i} style={{ width: 38, height: 38, borderRadius: 19, background: "rgba(255,255,255,0.85)", backdropFilter: "blur(10px)", display: "flex", alignItems: "center", justifyContent: "center" }}>{icon}</div>
            ))}
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 16, right: 16, padding: "6px 12px", borderRadius: 999, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(10px)", fontSize: 12, color: "#fff", fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
          {[1, 0.5, 0.5, 0.5].map((o, i) => <div key={i} style={{ width: 5, height: 5, borderRadius: 3, background: `rgba(255,255,255,${o})` }} />)}
          <span style={{ marginLeft: 4 }}>1 / 4</span>
        </div>
      </div>

      <div style={{ flex: 1, overflow: "auto", paddingBottom: 110, marginTop: -20, background: P.bg, borderRadius: "20px 20px 0 0", position: "relative", zIndex: 2 }}>
        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ padding: "4px 10px", borderRadius: 6, background: P.primarySoft, color: P.primary, fontSize: 11, fontWeight: 700 }}>{t.categoryTag}</div>
            <div style={{ padding: "4px 10px", borderRadius: 6, background: P.badgeEasy.bg, color: P.badgeEasy.fg, fontSize: 11, fontWeight: 700 }}>{t.difficultyTag}</div>
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, letterSpacing: -0.6, lineHeight: "32px" }}>{t.plantName}</div>
          <div style={{ fontSize: 14, color: P.textTer, fontStyle: "italic", marginTop: 3 }}>Monstera deliciosa</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 8 }}>
            {[1, 2, 3, 4].map((i) => <svg key={i} width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.5 3.2 3.5.4-2.6 2.4.7 3.5L6 8.8 2.9 10.5l.7-3.5L1 4.6l3.5-.4L6 1z" fill="#F5B81E" /></svg>)}
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1l1.5 3.2 3.5.4-2.6 2.4.7 3.5L6 8.8 2.9 10.5l.7-3.5L1 4.6l3.5-.4L6 1z" fill="rgba(245,184,30,0.3)" /></svg>
            <span style={{ fontSize: 12, color: P.textSec, marginLeft: 4 }}>{t.ratingLabel}</span>
          </div>
        </div>

        <div style={{ padding: "16px 20px 0", display: "flex", gap: 8 }}>
          {[
            { icon: Icon.drop(P.primary), label: t.waterLabel, value: t.waterValue, sub: t.waterSub },
            { icon: Icon.sun("#E8B339"), label: t.sunLabel, value: t.sunValue, sub: t.sunSub },
            { icon: Icon.thermo("#E66B5C"), label: t.tempLabel, value: t.tempValue, sub: t.tempSub },
          ].map((s, i) => (
            <div key={i} style={{ flex: 1, background: P.card, borderRadius: 14, padding: "12px 10px", border: `1px solid ${P.border}`, display: "flex", flexDirection: "column", alignItems: "center", gap: 4, boxShadow: "0 1px 2px rgba(20,40,30,0.04)" }}>
              <div style={{ height: 24, display: "flex", alignItems: "center" }}>{s.icon}</div>
              <div style={{ fontSize: 10, color: P.textTer, fontWeight: 600, letterSpacing: 0.2, textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2 }}>{s.value}</div>
              <div style={{ fontSize: 10, color: P.textTer }}>{s.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "20px 20px 0" }}>
          <div style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, marginBottom: 10 }}>{t.careGuideTitle}</div>
          <div style={{ background: P.card, borderRadius: 16, padding: 14, border: `1px solid ${P.border}`, boxShadow: "0 1px 2px rgba(20,40,30,0.04)" }}>
            {t.careItems.map((it, i) => (
              <div key={i} style={{ display: "flex", gap: 10, paddingTop: i === 0 ? 0 : 10, paddingBottom: i === t.careItems.length - 1 ? 0 : 10, borderBottom: i === t.careItems.length - 1 ? "none" : `1px solid ${P.border}` }}>
                <div style={{ width: 22, height: 22, borderRadius: 11, flexShrink: 0, background: P.primarySoft, display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                  {Icon.check(P.primary)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: -0.2 }}>{it.t}</div>
                  <div style={{ fontSize: 12, color: P.textSec, marginTop: 2, lineHeight: "17px" }}>{it.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ borderRadius: 16, padding: 14, background: `linear-gradient(135deg,${P.primarySoft} 0%,${P.primaryTint} 100%)`, border: `1px solid ${P.border}`, display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 18, flexShrink: 0, background: P.primary, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 4px 10px ${P.primary}40` }}>
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M9 3c-3 0-5 2-5 5 0 2 1.5 4 3.5 5l-1 2 3-1.5c2.5 0 4.5-2 4.5-5 0-3-2-5.5-5-5.5z" fill="#fff" /></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: P.primary, letterSpacing: 0.2, textTransform: "uppercase" }}>{t.plantSaysLabel}</div>
              <div style={{ fontSize: 14, color: P.text, marginTop: 4, lineHeight: "20px", letterSpacing: -0.2 }}>{t.plantSaysMsg}</div>
              <div style={{ marginTop: 8, fontSize: 12, color: P.primary, fontWeight: 600 }}>{t.plantSaysCta}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: "16px 20px 0" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: P.textSec, marginBottom: 8 }}>{t.tagsTitle}</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {t.tags.map((tag) => (
              <div key={tag} style={{ padding: "6px 12px", borderRadius: 999, background: "#fff", border: `1px solid ${P.border}`, fontSize: 12, color: P.textSec, fontWeight: 500 }}>{tag}</div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ position: "absolute", bottom: 34, left: 0, right: 0, zIndex: 3, padding: "12px 20px", background: `linear-gradient(180deg,transparent 0%,${P.bg} 40%)`, display: "flex", gap: 10 }}>
        <div style={{ width: 52, height: 52, borderRadius: 26, background: P.card, border: `1px solid ${P.border}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 12px rgba(20,40,30,0.08)" }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M5 8.5A1.5 1.5 0 016.5 7h11A1.5 1.5 0 0119 8.5v10a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 18.5v-10z" stroke={P.primary} strokeWidth="1.8" /><path d="M9 4v6M15 4v6M5 12h14" stroke={P.primary} strokeWidth="1.8" strokeLinecap="round" /></svg>
        </div>
        <div style={{ flex: 1, height: 52, borderRadius: 26, background: P.primary, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 16, fontWeight: 700, letterSpacing: -0.3, boxShadow: `0 8px 20px ${P.primary}55` }}>
          {Icon.plus("#fff")}
          {t.addToGardenCta}
        </div>
      </div>

      <TabBar active="book" t={tabT} />
    </div>
  );
}

export default function PlantGuideSection({ locale }: { locale: Locale }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [expanded, setExpanded] = useState(false);

  const t = getTranslations(locale).plantGuide;
  const SCALE = 0.82;
  const INITIAL_COUNT = 4;
  const visiblePlants = expanded ? t.plants : t.plants.slice(0, INITIAL_COUNT);

  return (
    <section ref={ref} className="bg-[#F0FFF4] px-4 py-20 sm:px-6 sm:py-24 overflow-hidden">
      <div className="mx-auto max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-16 text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#52B788] sm:text-sm">{t.sectionLabel}</p>
          <h2 className="mb-4 whitespace-pre-line text-3xl font-black text-[#1A3C34] sm:text-4xl">{t.headline}</h2>
          <p className="mx-auto max-w-sm text-sm leading-relaxed text-[#5a7a6e] sm:text-base">{t.desc}</p>
        </motion.div>

        <div className="mb-16 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center sm:gap-10">
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.1 }} className="flex flex-col items-center gap-3">
            <span className="rounded-full border border-[#c6e8d5] bg-white px-3 py-1 text-xs font-semibold text-[#5a7a6e] shadow-sm">{t.libraryLabel}</span>
            <IOSDevice scale={SCALE}><LibraryScreen t={t.libraryScreen} tabT={t.tabBar} /></IOSDevice>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }} className="flex flex-col items-center gap-3">
            <span className="rounded-full border border-[#c6e8d5] bg-white px-3 py-1 text-xs font-semibold text-[#5a7a6e] shadow-sm">{t.detailLabel}</span>
            <IOSDevice scale={SCALE}><DetailScreen t={t.detailScreen} tabT={t.tabBar} /></IOSDevice>
          </motion.div>
        </div>

        <div className="mb-14 grid gap-4 sm:grid-cols-2">
          {t.features.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.45, delay: 0.3 + i * 0.08 }} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
              <span className="text-2xl">{item.emoji}</span>
              <div><p className="mb-1 text-sm font-bold text-[#1A3C34]">{item.title}</p><p className="text-sm leading-relaxed text-[#5a7a6e]">{item.desc}</p></div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.4 }} className="mb-6 text-center text-sm font-semibold text-[#1A3C34]">{t.gridPreviewLabel}</motion.p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence initial={false}>
            {visiblePlants.map((plant, i) => (
              <motion.div
                key={plant.name}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: i >= INITIAL_COUNT ? (i - INITIAL_COUNT) * 0.06 : 0.4 + (i % 3) * 0.07 }}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0FFF4] text-2xl">{plant.emoji}</div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1A3C34]">{plant.name}</p>
                    <p className="truncate text-[11px] italic text-[#5a7a6e]">{plant.scientific}</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold" style={{ background: plant.diffStyle.bg, color: plant.diffStyle.fg }}>{plant.difficulty}</span>
                </div>
                <p className="mb-3 text-sm leading-relaxed text-[#5a7a6e]">{plant.desc}</p>
                <div className="flex gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-[#F0FFF4] px-2.5 py-1 text-[11px] text-[#5a7a6e]">💧 {plant.water}</span>
                  <span className="flex items-center gap-1 rounded-full bg-[#F0FFF4] px-2.5 py-1 text-[11px] text-[#5a7a6e]">☀️ {plant.light}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.4, delay: 0.5 }} className="mt-6 flex flex-col items-center gap-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#52B788] px-6 py-3 text-sm font-semibold text-[#52B788] transition hover:bg-[#52B788] hover:text-white"
          >
            {expanded ? (
              <><span>{t.collapse}</span><span>↑</span></>
            ) : (
              <><span>{t.showMore}</span><span className="rounded-full bg-[#52B788] px-2 py-0.5 text-[11px] text-white">{t.showMoreCount.replace("{n}", String(t.plants.length - INITIAL_COUNT))}</span></>
            )}
          </button>

          <div className="flex w-full items-center gap-3">
            <div className="h-px flex-1 bg-[#c6e8d5]" />
            <span className="rounded-full border border-[#c6e8d5] px-4 py-1.5 text-sm text-[#5a7a6e]">{t.comingSoon}</span>
            <div className="h-px flex-1 bg-[#c6e8d5]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
