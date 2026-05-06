# 🪴 Greeny Landing Page

> **말 걸어주는 식물 친구, 그리니** — 앱 출시 전 사전예약 웨이팅 리스트 수집 랜딩 페이지

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://greeny-landing.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

**Live →** https://greeny-landing.vercel.app

---

## 소개

Greeny는 AI 기반 식물 동반자 앱입니다. 식물에 고유한 인격을 부여하고, 누적된 대화를 통해 식물만의 성격이 형성됩니다. 이 레포는 앱 출시 전 **수요 검증 및 사전예약자 이메일 수집**을 위한 랜딩 페이지입니다.

---

## 화면 구성

| 섹션 | 설명 |
|------|------|
| **Hero** | 패럴렉스 배경 + 플로팅 식물 애니메이션 + 이메일 사전예약 폼 |
| **Pain Points** | 식집사들의 공감 포인트 3가지 |
| **Scroll Showcase** | Apple 스타일 스크롤 인터랙션 — AI 대화 / 스마트 알림 / 인격 성장 |
| **Garden** | 텃밭 꾸미기 프리뷰 (식물 슬롯, 화분 스킨, 장식) |
| **Features** | 핵심 기능 3가지 카드 |
| **How It Works** | 사진 한 장으로 시작하는 단계 |
| **CTA** | 이메일 사전예약 폼 (대형) |

---

## 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Animation**: [Framer Motion](https://www.framer.com/motion) — 스크롤 연동, 패럴렉스, 인터랙션
- **Database**: [Supabase](https://supabase.com) — 웨이팅 리스트 이메일 저장
- **Deploy**: [Vercel](https://vercel.com)

---

## 로컬 실행

```bash
# Node 20 이상 필요
nvm use 20

# 의존성 설치
npm install

# 환경 변수 설정
cp .env.local.example .env.local
# .env.local에 Supabase 키 입력

# 개발 서버 실행
npm run dev
```

→ http://localhost:3000

---

## 환경 변수

`.env.local` 파일에 아래 값을 설정하세요.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Supabase 테이블 설정

Supabase SQL 에디터에서 아래 쿼리를 실행합니다.

```sql
CREATE TABLE waitlist_greeny (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact VARCHAR(255) NOT NULL,
  contact_type VARCHAR(10) NOT NULL CHECK (contact_type IN ('email', 'phone')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  ip_address VARCHAR(50),
  user_agent TEXT,
  CONSTRAINT waitlist_greeny_contact_unique UNIQUE (contact)
);

CREATE INDEX waitlist_greeny_created_at_idx ON waitlist_greeny (created_at DESC);
CREATE INDEX waitlist_greeny_contact_type_idx ON waitlist_greeny (contact_type);

ALTER TABLE waitlist_greeny ENABLE ROW LEVEL SECURITY;

CREATE POLICY "anyone can insert"
  ON waitlist_greeny FOR INSERT TO anon
  WITH CHECK (true);
```

---

## 프로젝트 구조

```
src/
├── app/
│   ├── actions/waitlist.ts        # 이메일 저장 Server Action
│   ├── layout.tsx                 # 메타데이터, 폰트 (Noto Sans KR)
│   └── page.tsx                   # 페이지 조립
├── components/
│   ├── sections/
│   │   ├── HeroSection.tsx        # 패럴렉스 히어로
│   │   ├── PainSection.tsx        # 공감 섹션
│   │   ├── ScrollShowcaseSection.tsx  # Apple 스타일 스크롤
│   │   ├── GardenSection.tsx      # 텃밭 꾸미기 프리뷰
│   │   ├── FeaturesSection.tsx    # 기능 카드
│   │   ├── HowItWorksSection.tsx  # 1단계 시작
│   │   ├── CTASection.tsx         # 최종 CTA
│   │   └── Footer.tsx
│   ├── FloatingCTA.tsx            # 스크롤 시 고정 버튼
│   └── WaitlistForm.tsx           # 이메일 입력 폼
└── lib/
    └── supabase.ts                # Supabase admin 클라이언트
```

---

## 디자인 토큰

| 역할 | 색상 | HEX |
|------|------|-----|
| Primary | Medium Green | `#52B788` |
| Accent | Warm Yellow | `#FFD166` |
| Background | Light Green | `#F0FFF4` |
| Text | Dark Green | `#1A3C34` |

---

## 관련 링크

- **앱 서비스 기획**: [`brief-service-intro.md`](./brief-service-intro.md)
- **Vercel 대시보드**: https://vercel.com/rocher71s-projects/greeny-landing
