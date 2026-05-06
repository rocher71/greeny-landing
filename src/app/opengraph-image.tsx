import { ImageResponse } from 'next/og'

export const alt = '그리니 — 말 걸어주는 식물 친구'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// @vercel/og 0.11 supports TTF and WOFF only (not WOFF2).
// IE11 UA causes Google Fonts to serve WOFF format.
// The `text` param creates a minimal subset with only the glyphs we need.
async function loadFonts(): Promise<{ name: string; data: ArrayBuffer; weight: 700 }[]> {
  try {
    const text = '그리니말걸어주는식물친구사전예약진행중좋은아침이에요도감이달의추천초보자에게딱맞는가나다순전체몬스테라스투키선인장쉬움매우쉬움주회월↓'
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`,
      {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; rv:11.0) like Gecko',
        },
      }
    ).then((r) => r.text())

    const urls = [...css.matchAll(/url\(\s*['"]?(https:\/\/[^'")\s]+)['"]?\s*\)/g)].map(
      (m) => m[1]
    )
    if (!urls.length) return []

    const results = await Promise.allSettled(
      urls.map((url) => fetch(url).then((r) => r.arrayBuffer()))
    )

    return results
      .filter((r): r is PromiseFulfilledResult<ArrayBuffer> => r.status === 'fulfilled')
      .map((r) => ({ name: 'Noto Sans KR', data: r.value, weight: 700 as const }))
  } catch {
    return []
  }
}

export default async function Image() {
  const fonts = await loadFonts()

  const mint = '#3FB89B'
  const mintSoft = '#DEF3EE'
  const mintTint = '#EDF8F5'
  const appBg = '#EFF8F5'
  const textMain = '#0F2622'
  const textSec = '#4F665F'
  const textTer = '#8395A0'

  const plants = [
    { name: '몬스테라', sci: 'Monstera deliciosa', emoji: '🌿', badge: '쉬움', badgeColor: '#2F947D', badgeBg: mintSoft, water: '주 1회', faved: true },
    { name: '스투키', sci: 'Sansevieria stuckyi', emoji: '🪴', badge: '매우 쉬움', badgeColor: '#2F947D', badgeBg: mintSoft, water: '2주 1회', faved: false },
    { name: '선인장', sci: 'Echinocactus', emoji: '🌵', badge: '매우 쉬움', badgeColor: '#2F947D', badgeBg: mintSoft, water: '월 1회', faved: false },
  ]

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          background: '#1A3C34',
          fontFamily: 'Noto Sans KR, sans-serif',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        {/* Background decorative circles */}
        <div style={{ position: 'absolute', top: -120, left: -80, width: 380, height: 380, borderRadius: 190, background: '#52B788', opacity: 0.07, display: 'flex' }} />
        <div style={{ position: 'absolute', bottom: -100, left: 300, width: 280, height: 280, borderRadius: 140, background: '#52B788', opacity: 0.05, display: 'flex' }} />

        {/* ── Left: Brand info ── */}
        <div
          style={{
            width: 560,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 50px 0 72px',
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 30 }}>
            <span style={{ fontSize: 42 }}>🪴</span>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#52B788', letterSpacing: -0.5 }}>greeny</span>
          </div>

          {/* Headline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0, marginBottom: 22 }}>
            <span style={{ fontSize: 52, fontWeight: 700, color: '#fff', letterSpacing: -2, lineHeight: 1.2 }}>말 걸어주는</span>
            <span style={{ fontSize: 52, fontWeight: 700, color: '#fff', letterSpacing: -2, lineHeight: 1.2 }}>식물 친구</span>
          </div>

          {/* Subtitle */}
          <div style={{ fontSize: 20, color: 'rgba(255,255,255,0.5)', marginBottom: 38, display: 'flex' }}>
            대화를 나눌수록 자라나는 나만의 식물
          </div>

          {/* CTA badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#52B788', borderRadius: 100, padding: '11px 24px', fontSize: 17, fontWeight: 700, color: '#fff' }}>
            <span>🌱</span>
            <span>사전예약 진행 중</span>
          </div>
        </div>

        {/* ── Right: Phone mockup ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 48px 24px 16px',
            position: 'relative',
          }}
        >
          {/* Floating leaves */}
          <div style={{ position: 'absolute', top: 36, right: 52, fontSize: 34, opacity: 0.35, display: 'flex' }}>🌿</div>
          <div style={{ position: 'absolute', bottom: 56, right: 38, fontSize: 26, opacity: 0.25, display: 'flex' }}>🍃</div>
          <div style={{ position: 'absolute', top: 100, left: 10, fontSize: 20, opacity: 0.2, display: 'flex' }}>🌱</div>

          {/* Phone outer frame */}
          <div
            style={{
              width: 252,
              height: 548,
              borderRadius: 44,
              background: '#0a1a12',
              padding: 7,
              boxShadow: '0 28px 64px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)',
              display: 'flex',
            }}
          >
            {/* Screen */}
            <div
              style={{
                flex: 1,
                borderRadius: 38,
                background: appBg,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
              }}
            >
              {/* Status bar area */}
              <div style={{ display: 'flex', flexDirection: 'column', background: appBg, paddingTop: 10, paddingLeft: 16, paddingRight: 16 }}>
                {/* Time + icons row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 18 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: textMain }}>9:41</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    {/* Signal */}
                    <div style={{ display: 'flex', gap: 1.5, alignItems: 'flex-end' }}>
                      {[4, 6, 8, 10].map((h, i) => (
                        <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: textMain, display: 'flex' }} />
                      ))}
                    </div>
                    {/* WiFi simplified */}
                    <div style={{ display: 'flex', gap: 0.5, alignItems: 'flex-end' }}>
                      {[4, 7, 10].map((h, i) => (
                        <div key={i} style={{ width: 2.5, height: h, borderRadius: 1, background: textMain, display: 'flex' }} />
                      ))}
                    </div>
                    {/* Battery */}
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ width: 18, height: 9, border: '1.5px solid rgba(0,0,0,0.35)', borderRadius: 2.5, padding: 1.5, display: 'flex' }}>
                        <div style={{ width: '80%', height: '100%', background: textMain, borderRadius: 1, display: 'flex' }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic Island */}
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 6, paddingBottom: 4 }}>
                  <div style={{ width: 92, height: 26, borderRadius: 15, background: '#000', display: 'flex' }} />
                </div>
              </div>

              {/* App content */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '8px 16px 0', gap: 8 }}>
                {/* Header: greeting + bell */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 10.5, fontWeight: 700, color: mint }}>좋은 아침이에요 🌿</span>
                    <span style={{ fontSize: 21, fontWeight: 700, color: textMain, letterSpacing: -0.5 }}>식물 도감</span>
                  </div>
                  <div style={{ width: 30, height: 30, borderRadius: 15, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 6 }}>
                    <span style={{ fontSize: 13 }}>🔔</span>
                  </div>
                </div>

                {/* Search bar */}
                <div style={{ height: 36, borderRadius: 11, background: '#fff', display: 'flex', alignItems: 'center', padding: '0 11px', gap: 7 }}>
                  <span style={{ fontSize: 12, color: textTer }}>🔍</span>
                  <span style={{ fontSize: 12, color: textTer }}>식물 이름, 학명…</span>
                </div>

                {/* Featured banner */}
                <div style={{ borderRadius: 15, padding: '11px 13px', background: `linear-gradient(135deg, ${mintSoft} 0%, ${mintTint} 100%)`, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span style={{ fontSize: 8.5, fontWeight: 700, color: mint }}>이달의 추천</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: textMain }}>초보자에게 딱 맞는 5종</span>
                    <span style={{ fontSize: 10, color: textSec }}>과습에 강하고 키우기 쉬운</span>
                  </div>
                  <div style={{ width: 46, height: 46, borderRadius: 11, background: 'linear-gradient(135deg, #b0d8c0 0%, #78c09a 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>
                    🌿
                  </div>
                </div>

                {/* Section header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: textMain }}>전체 식물</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: mint }}>가나다순 ↓</span>
                </div>

                {/* Plant cards */}
                {plants.map((plant) => (
                  <div
                    key={plant.name}
                    style={{ background: '#fff', borderRadius: 13, padding: '9px 11px', display: 'flex', gap: 9, alignItems: 'center' }}
                  >
                    {/* Emoji thumbnail */}
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: appBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>
                      {plant.emoji}
                    </div>
                    {/* Info */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: textMain }}>{plant.name}</span>
                        <span style={{ fontSize: 8.5, fontWeight: 700, padding: '1.5px 5px', borderRadius: 5, background: plant.badgeBg, color: plant.badgeColor }}>{plant.badge}</span>
                      </div>
                      <span style={{ fontSize: 9.5, color: textTer, fontStyle: 'italic' }}>{plant.sci}</span>
                      <span style={{ fontSize: 9.5, color: textSec }}>💧 {plant.water}</span>
                    </div>
                    {/* Heart */}
                    <div style={{ width: 24, height: 24, borderRadius: 12, background: plant.faved ? mintSoft : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: plant.faved ? mint : textTer }}>
                      {plant.faved ? '💚' : ''}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size, fonts }
  )
}
