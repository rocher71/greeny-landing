# 🪴 Greeny Landing Page

> **말 걸어주는 식물 친구, 그리니** — 앱 출시 전 사전예약 웨이팅 리스트 수집 랜딩 페이지

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://greeny-landing.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org)

**Live →** https://greeny-landing.vercel.app

---

## 소개

Greeny는 AI 기반 식물 동반자 앱입니다. 식물에 고유한 인격을 부여하고, 누적된 대화를 통해 식물만의 성격이 형성됩니다. 이 레포는 앱 출시 전 **수요 검증 및 사전예약자 연락처 수집**을 위한 랜딩 페이지입니다.

---

## 화면 구성

| 섹션 | 설명 |
|------|------|
| **Hero** | 패럴렉스 배경 + 플로팅 식물 애니메이션 + 이메일 사전예약 폼 |
| **Scroll Showcase** | Apple 스타일 스크롤 인터랙션 — AI 대화 / 스마트 알림 / 인격 성장 |
| **Chat Demo** | AI 대화 데모 |
| **Garden** | 텃밭 꾸미기 프리뷰 (식물 슬롯, 화분 스킨, 장식) |
| **Plant Guide** | 식물 도감 앱 목업 |
| **Features** | 핵심 기능 3가지 카드 |
| **Pain Points** | 식집사들의 공감 포인트 |
| **How It Works** | 사진 한 장으로 시작하는 단계 |
| **CTA** | 이메일 사전예약 폼 (대형) |

---

## 기술 스택

- **Framework**: [Next.js 16](https://nextjs.org) (App Router, TypeScript)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- **Animation**: [Framer Motion](https://www.framer.com/motion) — 스크롤 연동, 패럴렉스, 인터랙션
- **Database**: [Supabase](https://supabase.com) — 웨이팅 리스트 저장
- **Analytics**: Google Analytics 4 (`G-QLNTJX18MD`)
- **Deploy**: [Vercel](https://vercel.com)

---

## 로컬 실행

```bash
# Node 20 이상 필요
nvm use 20

npm install
npm run dev
```

→ http://localhost:3000

`.env.local` 파일이 없으면 Supabase 연동이 안 됩니다 (아래 환경 변수 참고).

---

## 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

---

## Supabase 테이블 설정

Supabase SQL 에디터에서 실행:

```sql
CREATE TABLE waitlist_greeny (
  id               UUID         DEFAULT gen_random_uuid() PRIMARY KEY,
  contact          VARCHAR(255) NOT NULL,
  contact_type     VARCHAR(10)  NOT NULL CHECK (contact_type IN ('email', 'phone')),
  marketing_agreed BOOLEAN      NOT NULL DEFAULT false,
  ip_address       VARCHAR(50),
  user_agent       TEXT,
  created_at       TIMESTAMPTZ  DEFAULT now() NOT NULL,
  CONSTRAINT waitlist_greeny_contact_unique UNIQUE (contact)
);

CREATE INDEX waitlist_greeny_created_at_idx  ON waitlist_greeny (created_at DESC);
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
│   ├── actions/waitlist.ts        # 연락처 저장 Server Action (이메일/전화번호)
│   ├── layout.tsx                 # 메타데이터, 폰트 (Noto Sans KR), GA4 스크립트
│   └── page.tsx                   # 페이지 조립 (섹션 순서)
├── components/
│   ├── sections/                  # 각 랜딩 섹션 컴포넌트
│   ├── DownloadModal.tsx          # 앱 다운로드 + 출시 알림 신청 모달 (전역 마운트)
│   ├── FloatingCTA.tsx            # 히어로 스크롤 후 나타나는 고정 버튼
│   └── WaitlistForm.tsx           # 히어로 인라인 이메일 폼
└── lib/
    ├── ga.ts                      # GA4 이벤트 헬퍼 (trackDownloadClick, trackWaitlistSignup)
    └── supabase.ts                # Supabase admin 클라이언트
```

---

## 디자인 토큰

| 역할 | HEX |
|------|-----|
| Primary (Medium Green) | `#52B788` |
| Text (Dark Green) | `#1A3C34` |
| Muted | `#5a7a6e` |
| Background (Light Green) | `#F0FFF4` |

---

## 관련 링크

- **앱 서비스 기획**: [`brief-service-intro.md`](./brief-service-intro.md)
- **Vercel 대시보드**: https://vercel.com/rocher71s-projects/greeny-landing
