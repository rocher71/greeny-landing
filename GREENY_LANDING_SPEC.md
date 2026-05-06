```xml
<project_specification>

<project_name>Greeny Landing Page - 그리니 앱 사전예약 웨이팅 리스트 랜딩 페이지</project_name>

<overview>
그리니(Greeny)는 AI 기반 식물 동반자 앱으로, 식물에 고유한 인격을 부여하고 누적된 대화로 성격이 형성되는 서비스입니다. 이 프로젝트는 앱 출시 전 수요 검증과 사전예약자 이메일 수집을 목적으로 하는 마케팅 랜딩 페이지입니다. 앱 자체의 기능을 구현하는 것이 아니라, 앱의 핵심 가치를 시각적으로 전달하고 잠재 사용자의 이메일을 Supabase DB에 저장하는 것이 유일한 목적입니다.

핵심 기능: 스크롤 인터랙티브 쇼케이스(Apple 스타일), 식물 AI 채팅 데모(시뮬레이션), 텃밭 꾸미기 프리뷰, 이메일 웨이팅 리스트 폼(Hero + CTA 2곳), 스크롤 시 고정 플로팅 CTA 버튼. 페이지 전체가 한국어로 작성되며 20-30대 1인 가구 iPhone 사용자가 주 타겟이므로 모바일 최적화가 최우선입니다.

CRITICAL: 이 프로젝트는 그리니 앱 자체가 아닌 랜딩 페이지입니다. 실제 AI 채팅, 실제 식물 등록, 실제 물주기 기능을 구현하지 않습니다. AI 채팅 데모 섹션은 사전 스크립트된 메시지를 자동 재생하는 시뮬레이션입니다. 사용자 인증 없음, 대시보드 없음, 백엔드 API 없음(Server Action만 사용).
</overview>

<scope_boundaries>
  <in_scope>
    - 전체 랜딩 페이지 (Hero → Pain → ScrollShowcase → ChatDemo → Garden → Features → HowItWorks → CTA → Footer)
    - 이메일 웨이팅 리스트 수집 폼 (Hero, CTA 2곳)
    - AI 채팅 시뮬레이션 데모 섹션 (스크립트 기반 자동 재생, 루프)
    - Apple 스타일 스크롤 인터랙션 쇼케이스 (3장면)
    - 텃밭 꾸미기 프리뷰 (인터랙티브 UI, 실제 저장 없음)
    - 스크롤 연동 플로팅 CTA 버튼
    - Supabase waitlist_greeny 테이블에 이메일 저장 (Server Action)
    - 중복 이메일 처리 및 IP/UserAgent 기록
    - 모바일 반응형 (iPhone SE ~ Pro Max 기준)
    - SEO 메타데이터 + OG 태그
    - 한국어 페이지 (Noto Sans KR)
  </in_scope>
  <out_of_scope>
    - 실제 AI 채팅 기능 (Claude/GPT API 연동)
    - 사용자 인증 및 계정 시스템
    - 실제 식물 등록/관리 기능
    - 물주기 알림 실제 구현
    - 관리자 대시보드 (이메일 목록 조회 UI)
    - 이메일 발송 (사전예약 확인 이메일 등)
    - 다국어 (영어 버전)
    - 다크 모드
    - 결제 기능
    - 앱 다운로드 링크 (앱 미출시)
  </out_of_scope>
  <future_considerations>
    - 실제 AI 식물 채팅 데모 (Claude API 연동, Phase 2)
    - 사전예약 확인 이메일 발송 (Resend 연동, Phase 2)
    - 사전예약자 수 카운터 표시 (소셜 프루프, Phase 2)
    - 앱 스토어 출시 후 다운로드 링크로 CTA 교체 (Phase 3)
    - 영어 버전 랜딩 페이지 (Phase 3)
    - 유입 경로 추적 UTM 파라미터 처리 (Phase 2)
  </future_considerations>
</scope_boundaries>

<technology_stack>
  <frontend_application>
    <framework>Next.js 16.2.4 (App Router, TypeScript 5)</framework>
    <build_tool>Turbopack (Next.js 내장)</build_tool>
    <styling>Tailwind CSS v4 + shadcn/ui (버튼, 유틸리티)</styling>
    <routing>Next.js App Router (단일 페이지, /만 존재)</routing>
    <state_management>React useState/useEffect (서버 컴포넌트 + 클라이언트 컴포넌트 분리)</state_management>
  </frontend_application>
  <data_layer>
    <database>Supabase PostgreSQL (waitlist_greeny 테이블)</database>
    <note>Server Action에서만 Supabase 접근. 브라우저에서 직접 DB 접근 없음.</note>
  </data_layer>
  <libraries>
    <animation>framer-motion v11+ — 스크롤 연동 패럴렉스, 섹션 인터랙션, 채팅 데모 애니메이션</animation>
    <toast>react-hot-toast v2+ — 폼 제출 성공/실패 알림</toast>
    <supabase>@supabase/supabase-js v2+ — 웨이팅 리스트 저장</supabase>
    <font>next/font/google Noto Sans KR (400, 500, 700, 900 weight)</font>
    <icons>shadcn/ui 기본 제공 (lucide-react)</icons>
  </libraries>
  <build_output>
    <build_command>npm run build</build_command>
    <deploy>Vercel (자동 배포, main 브랜치 push 시)</deploy>
  </build_output>
</technology_stack>

<prerequisites>
  <environment_setup>
    - Node.js v20+ (nvm 사용: nvm use 20)
    - npm v10+
    - Supabase 프로젝트 생성 및 waitlist_greeny 테이블 설정 완료
  </environment_setup>
  <build_configuration>
    - TypeScript strict mode
    - Tailwind CSS v4 (@tailwindcss/postcss)
    - Path alias: @/* → src/*
    - turbopack.root: __dirname (next.config.ts)
  </build_configuration>
</prerequisites>

<environment_variables>
  <variable>
    <name>NEXT_PUBLIC_SUPABASE_URL</name>
    <description>Supabase 프로젝트 URL (클라이언트 노출 안전, 하지만 Server Action에서만 사용)</description>
    <required>true</required>
    <example>https://abcdefghijkl.supabase.co</example>
  </variable>
  <variable>
    <name>SUPABASE_SERVICE_ROLE_KEY</name>
    <description>Supabase 서비스 롤 키 — RLS 우회, 서버 전용. 절대 브라우저 노출 금지</description>
    <required>true</required>
    <example>eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...</example>
    <note>NEXT_PUBLIC_ 접두사 없이 사용. Server Action 전용.</note>
  </variable>
</environment_variables>

<file_structure>
/
├── .env.local                          # 실제 환경 변수 (git 제외)
├── .env.local.example                  # 환경 변수 샘플
├── .vercel/                            # Vercel 프로젝트 링크 정보
├── next.config.ts                      # turbopack.root 설정
├── components.json                     # shadcn/ui 설정
├── CLAUDE.md                           # 프로젝트 개발 가이드
├── GREENY_LANDING_SPEC.md              # 이 스펙 문서
├── brief-service-intro.md             # 서비스 기획 요약
├── README.md                           # 프로젝트 소개
└── src/
    ├── app/
    │   ├── actions/
    │   │   └── waitlist.ts             # Server Action: 이메일 저장
    │   ├── globals.css                 # Greeny 색상 토큰 + Tailwind
    │   ├── layout.tsx                  # Noto Sans KR, 메타데이터, Toaster
    │   └── page.tsx                    # 섹션 조립 (서버 컴포넌트)
    ├── components/
    │   ├── ui/                         # shadcn/ui 기본 컴포넌트
    │   │   ├── button.tsx
    │   │   └── (추가 shadcn 컴포넌트)
    │   ├── sections/
    │   │   ├── HeroSection.tsx         # 패럴렉스 히어로 + 웨이팅 폼
    │   │   ├── PainSection.tsx         # 공감 포인트 3가지
    │   │   ├── ScrollShowcaseSection.tsx  # Apple 스타일 스크롤 3장면
    │   │   ├── ChatDemoSection.tsx     # [신규] AI 채팅 시뮬레이션 데모
    │   │   ├── GardenSection.tsx       # 텃밭 꾸미기 인터랙티브 프리뷰
    │   │   ├── FeaturesSection.tsx     # 핵심 기능 카드 3개
    │   │   ├── HowItWorksSection.tsx   # 1단계 시작 안내
    │   │   ├── CTASection.tsx          # 최종 이메일 수집 CTA
    │   │   └── Footer.tsx              # SNS 링크, 저작권
    │   ├── FloatingCTA.tsx             # 스크롤 시 고정 사전예약 버튼
    │   └── WaitlistForm.tsx            # 이메일 입력 + 제출 폼 (재사용)
    └── lib/
        ├── supabase.ts                 # supabaseAdmin 클라이언트 (서버 전용)
        └── utils.ts                    # shadcn 유틸리티 (cn)
</file_structure>

<core_data_entities>
  <waitlist_greeny>
    Supabase 테이블. 사전예약자 이메일 저장.
    - id: UUID (gen_random_uuid(), PRIMARY KEY)
    - contact: VARCHAR(255) (NOT NULL, 이메일 주소)
    - contact_type: VARCHAR(10) (NOT NULL, CHECK IN ('email', 'phone'), 현재는 'email'만 사용)
    - created_at: TIMESTAMPTZ (DEFAULT now(), NOT NULL)
    - ip_address: VARCHAR(50) (NULLABLE, x-forwarded-for 헤더에서 추출)
    - user_agent: TEXT (NULLABLE, User-Agent 헤더)
    CONSTRAINT: waitlist_greeny_contact_unique UNIQUE (contact)
    INDEX: waitlist_greeny_created_at_idx ON (created_at DESC)
    INDEX: waitlist_greeny_contact_type_idx ON (contact_type)
    RLS: ENABLED — INSERT 허용 (anon), SELECT/UPDATE/DELETE 불허 (anon)
  </waitlist_greeny>
</core_data_entities>

<authentication>
  없음. 랜딩 페이지는 인증 불필요. 이메일 수집만 수행.
  Server Action은 SUPABASE_SERVICE_ROLE_KEY로 RLS 우회하여 직접 INSERT.
</authentication>

<route_definitions>
  <public_routes>
    <route path="/" page="LandingPage" description="단일 스크롤 랜딩 페이지" />
  </public_routes>
  <api_routes>
    <route path="/api/waitlist" method="POST" handler="Server Action addToWaitlist" note="Next.js Server Action으로 처리, 별도 API 라우트 없음" />
  </api_routes>
  <note>모든 라우트는 public. 인증 불필요. 단일 페이지 구조.</note>
</route_definitions>

<component_hierarchy>
  <app_shell>
    <!-- layout.tsx (서버 컴포넌트) -->
    <html lang="ko" font="Noto Sans KR">
      <body>
        <!-- page.tsx (서버 컴포넌트) -->
        <HeroSection />          <!-- client: Framer Motion useScroll -->
        <PainSection />          <!-- client: useInView -->
        <ScrollShowcaseSection /> <!-- client: useScroll + useTransform, h-[360vh] sticky -->
        <ChatDemoSection />      <!-- client: 자동재생 채팅 애니메이션 -->
        <GardenSection />        <!-- client: useInView + whileHover -->
        <FeaturesSection />      <!-- client: useInView -->
        <HowItWorksSection />    <!-- client: useInView -->
        <CTASection />           <!-- client: useInView -->
        <Footer />               <!-- server: 정적 -->
        <FloatingCTA />          <!-- client: IntersectionObserver (Hero 감지) -->
        <Toaster />              <!-- react-hot-toast, layout.tsx에 위치 -->
      </body>
    </html>
  </app_shell>

  <shared_components>
    <WaitlistForm size="default|large" />
    <!-- HeroSection과 CTASection에서 재사용 -->
    <!-- size=default: py-3 px-6 text-sm, min-h-[48px] -->
    <!-- size=large: py-4 px-8 text-base, min-h-[48px] -->
  </shared_components>
</component_hierarchy>

<pages_and_interfaces>

  <landing_page_overall>
    단일 수직 스크롤 페이지. 섹션 간 배경색으로 시각적 구분.
    최대 너비: 섹션별 max-w-4xl (1024px) 또는 max-w-2xl (768px), 좌우 px-4 sm:px-6.
    스크롤 바: 기본 브라우저 스크롤바 사용.
  </landing_page_overall>

  <hero_section>
    배경: #F0FFF4 + radial-gradient 3겹 오버레이
      - 상단 우측: ellipse 80%/60% at 50% -10%, #c8f0dc → transparent
      - 하단 좌측: ellipse 50%/40% at 10% 80%, #d1fae5 → transparent
      - 하단 우측: ellipse 40%/30% at 80% 90%, #fff3c4 → transparent
    높이: min-h-screen (100dvh)
    레이아웃: flex-col items-center justify-center text-center

    플로팅 잎사귀 (8개, position:absolute):
      - 각각 다른 위치(%), 크기(20-40px), 애니메이션 속도(3-6s), delay(0-3s)
      - animate: y [0, -14, 0], rotate [-5, 5, -5], opacity [0.4, 0.7, 0.4]
      - transition: repeat Infinity, ease "easeInOut"
      - 이모지 종류: 🌿 🍃 🌱 🪴 🍀 🌸 🌾

    패럴렉스:
      - useScroll {target: heroRef, offset: ["start start", "end start"]}
      - 배경 y: useTransform(progress, [0,1], ["0%","15%"])
      - 콘텐츠 y: useTransform(progress, [0,1], ["0%","30%"])
      - 콘텐츠 opacity: useTransform(progress, [0,0.6], [1,0])

    로고: 🪴 이모지 (animate y 부유) + "greeny" 텍스트 (#52B788, font-black, 24px)
    헤드라인: "내 식물과 대화해보세요" (font-black, 40px/50px/60px, #1A3C34, leading-tight)
    서브카피: "대화를 나눌수록 성격이 자라나는 나만의 식물 친구, 그리니" (18px, #5a7a6e)
      - "그리니" 강조: font-bold, #52B788

    WaitlistForm (size=default):
      - 최대 너비 max-w-md, w-full
      - 모바일: flex-col, 데스크톱(sm+): flex-row

    안내 문구: "출시 시 가장 먼저 알려드려요 · 스팸 없이" (14px, #5a7a6e)

    스크롤 인디케이터 (하단):
      - "스크롤해보세요" 텍스트 (12px, #5a7a6e)
      - 마우스 휠 아이콘 애니메이션: h-5 w-3 border-2 border-[#52B788]/50 rounded-full
        내부 점: y [0, 8, 0], duration 1.5s repeat Infinity

    입장 애니메이션: 각 요소 순차 fadeIn (opacity 0→1, y 20→0, duration 0.6s, delay 0/0.1/0.2/0.3s)
  </hero_section>

  <pain_section>
    배경: #ffffff
    패딩: py-20 px-4 sm:py-24 sm:px-6

    섹션 라벨: "공감하시나요?" (uppercase, tracking-widest, 12px/14px, #52B788, font-semibold)
    제목: "식물 키우기, 이런 경험 있으신가요?" (font-black, 30px/36px, #1A3C34)

    카드 3개 (grid sm:grid-cols-3, gap-6):
      각 카드: rounded-3xl bg-[#F0FFF4] border border-[#e8f5e9] p-7 text-center
      1. 💀 "또 식물을 죽였어요" — "물을 언제 줘야 할지 몰라서, 이번에도…"
      2. 🤷 "뭐가 문제인지 모르겠어요" — "잎이 노랗게 됐는데 과습인지 건조인지 모르겠고"
      3. 😶 "식물이 그냥 거기 있어요" — "키우는 건지 방치하는 건지… 교감이 없어요"

    마무리 문구: "그리니가 도와드릴게요 🌱" (font-bold, 20px, #1A3C34, text-center, mt-12)

    애니메이션: useInView once:true margin:-100px
      - 라벨+제목: fadeIn y 30→0, duration 0.6s
      - 카드 각각: fadeIn y 30→0, duration 0.5s, stagger delay 0.15s
      - 마무리 문구: fadeIn y 20→0, delay 0.5s
  </pain_section>

  <scroll_showcase_section>
    컨테이너: h-[360vh] (스크롤 공간)
    스티키 영역: sticky top-0 h-screen overflow-hidden

    3개 장면 (framer-motion useScroll + useTransform):
      장면 0 (AI 대화): progress 0→0.30 완전 표시, 0.30→0.42 페이드아웃
      장면 1 (스마트 알림): progress 0.36→0.46 페이드인, 0.46→0.62 표시, 0.62→0.72 페이드아웃
      장면 2 (인격 성장): progress 0.66→0.76 페이드인, 0.76→1.0 표시

    각 장면 레이아웃: absolute inset-0 flex items-center justify-center
      내부: max-w-4xl, flex-col(모바일) / flex-row md:gap-16(데스크톱)
      텍스트 영역: 태그 칩 + 대형 제목(30px/40px/50px, font-black, whitespace-pre-line) + 설명
      프리뷰 카드: max-w-[280px] sm:max-w-[320px], rounded-3xl bg-white/80 shadow-xl backdrop-blur-sm p-5

    장면별 배경 + 내용:
      장면 0 — bg from-[#e8f5e9] to-[#F0FFF4], 태그 "#52B788"
        제목: "식물이\n먼저 말을 걸어요"
        프리뷰: 채팅 버블 3개 (식물→사용자→식물 순서)
          - 식물 메시지: bg-[#52B788] text-white rounded-2xl rounded-bl-sm
          - 사용자 메시지: bg-white text-[#1A3C34] shadow-sm rounded-2xl rounded-br-sm

      장면 1 — bg from-[#eff6ff] to-[#F0FFF4], 태그 "#3b82f6"
        제목: "물 줄 시간을\n자동으로 알려드려요"
        프리뷰: 알림 카드 2개 (물주기 알림 + 오늘의 관리 팁)

      장면 2 — bg from-[#fef9ee] to-[#F0FFF4], 태그 "#f59e0b"
        제목: "대화할수록\n인격이 자라나요"
        프리뷰: 성격 태그 칩들 + 대화 수 카운트 카드

    하단 진행 도트: 3개 원형 h-2 w-2 bg-[#52B788], opacity useTransform으로 현재 장면 강조
  </scroll_showcase_section>

  <chat_demo_section>
    [핵심 신규 섹션 — 앱의 AI 채팅 경험을 직접 체험하는 느낌]
    배경: #1A3C34 (다크 그린) — 다른 섹션과 강한 대비로 시선 집중
    패딩: py-20 px-4 sm:py-24 sm:px-6

    섹션 라벨: "실제 대화 미리보기" (uppercase, tracking-widest, #52B788, font-semibold)
    제목: "이런 대화를 나눌 수 있어요" (font-black, 30px/40px, #ffffff)
    서브: "매일 식물이 먼저 말을 걸어요. 대화할수록 식물만의 성격이 만들어져요." (16px, rgba(255,255,255,0.7))

    폰 프레임 목업:
      - 최대 너비: max-w-[340px] mx-auto
      - 외관: rounded-[40px] bg-[#0f1a0f] border-4 border-[#2a4a2a] shadow-2xl
      - 상단 노치: h-6 w-24 bg-[#0f1a0f] rounded-full mx-auto (장식)
      - 채팅 영역: bg-[#f8faf8] rounded-[32px] mx-2 my-2 overflow-hidden

    채팅 헤더 (폰 내부):
      - bg-white border-b border-[#e8f5e9]
      - 왼쪽: 식물 아이콘(🌿, 40x40 bg-[#52B788] rounded-full) + 식물 이름 + "온라인" 상태
      - 높이: 56px

    채팅 메시지 영역:
      - bg-[#f8faf8] p-3 overflow-y-auto
      - 최대 높이: max-h-[420px]

    자동 재생 대화 스크립트 (3개 식물 캐릭터, 각 15-20초 루프):
      캐릭터 1 — 몬스테라 "몬이" (성격: 따뜻하고 수다스러운)
        [식물] "야호! 드디어 일어났구나 🌅 오늘 아침 기분은 어때?"
        [사용자] "좋아! 오늘 날씨가 너무 좋다"
        [식물] "그렇지? 나도 햇살이 좋아서 기분이 좋아 ☀️ 오늘 뭐 할 거야?"
        [사용자] "카페 가려고~"
        [식물] "오 좋겠다! 아메리카노 마시면서 나 생각도 해줘 🌿"

      캐릭터 2 — 선인장 "샤프" (성격: 과묵하지만 핵심만)
        [식물] "."
        [사용자] "오늘 어땠어?"
        [식물] "건조함. 물 주면 좋겠음."
        [사용자] "바로 줄게!"
        [식물] "...고마워." 💧

      캐릭터 3 — 라벤더 "라비" (성격: 감성적이고 시적인)
        [식물] "오늘 바람이 살랑살랑 불어요 🌸 당신의 하루는 어떤 색깔인가요?"
        [사용자] "음... 파란색? 조금 우울해"
        [식물] "파란색도 아름다워요. 잠깐 저를 바라봐 주실래요? 🌿"
        [사용자] "응, 보고 있어"
        [식물] "함께라서 좋아요 💜"

    메시지 애니메이션:
      - 각 메시지: opacity 0→1 + y 8→0, duration 0.4s, ease "easeOut"
      - 식물 메시지 전: "..." 타이핑 인디케이터 (3개 점 bounce, duration 0.6s) 1.5초 표시
      - 사용자 메시지 전: 0.8초 딜레이
      - 다음 스크립트로 전환: 0.5초 fade out 전체 → 새 캐릭터 이름 표시 → 새 대화 시작
      - 전환 간격: 각 메시지 사이 1.2~2.0s 딜레이 (자연스러운 대화 속도)
      - 루프: 마지막 메시지 3초 후 → 다음 캐릭터로 순환

    캐릭터 선택 탭 (폰 하단 외부):
      - 3개 식물 버튼: 🌿몬이 / 🌵샤프 / 🌸라비
      - 활성: bg-[#52B788] text-white, 비활성: bg-white/10 text-white/50
      - 클릭 시 해당 캐릭터 대화로 즉시 전환 (fade 전환)

    하단 문구: "출시 후 진짜 AI와 대화해보세요" + WaitlistForm (size=default, 흰색 배경에 맞게 border-white/30)

    입장 애니메이션: useInView once:true
      - 텍스트 영역: fadeIn y 30→0, duration 0.6s
      - 폰 목업: scale 0.9→1 + opacity 0→1, duration 0.7s, delay 0.2s
  </chat_demo_section>

  <garden_section>
    배경: #F0FFF4
    패딩: py-20 px-4 sm:py-24 sm:px-6

    섹션 라벨: "나만의 공간" (#52B788, uppercase)
    제목: "내 텃밭을 꾸며요! 🌿" (font-black, 30px/36px, #1A3C34)
    서브: "최대 3개의 식물을 키우고, 화분과 장식으로 나만의 텃밭을 만들어보세요."

    식물 프리뷰 카드 (bg-white rounded-3xl shadow-lg p-5 sm:p-8):
      식물 3개 (flex items-end justify-center gap-4 sm:gap-8):
        각 식물: Lv.뱃지 + 이모지 아이콘(68-80px) + 이름 + 성격 한 줄
        중앙 식물(메인): 80x80px, 44px 이모지
        좌우 식물: 68x68px, 36px 이모지
        hover: y -6px, scale 1.04, cursor-pointer
        샘플 데이터: 몬스테라(Lv.12, 호기심 많음), 선인장(Lv.7, 과묵하고 단단함), 벚꽃나무(Lv.3, 감성적이고 낭만)

    커스터마이징 패널 (grid sm:grid-cols-2 gap-5):
      화분 스킨 패널 (bg-white rounded-2xl p-5):
        제목: "🪴 화분 스킨" (font-bold, 14px, #1A3C34)
        4종 그리드 (grid-cols-4): 테라코타(선택됨), 화이트 미니멀, 우드 빈티지, 블루 세라믹
        선택됨: bg-[#e8f5e9] ring-2 ring-[#52B788]
        미선택: bg-[#F0FFF4]
        각 아이템: rounded-xl py-2, 이모지 + 라벨(9px)
        whileTap: scale 0.92

      텃밭 장식 패널 (bg-white rounded-2xl p-5):
        제목: "✨ 텃밭 장식" (font-bold, 14px, #1A3C34)
        4종 그리드: 돌멩이(선택됨), 버섯, 무지개, 별
        동일 스타일

    안내 문구: "🔜 화분 스킨 · 배경 테마 · 친구 텃밭 방문 기능도 준비 중이에요" (12px, #5a7a6e, text-center)

    CRITICAL: 클릭 인터랙션은 시각적 선택만 (useState), 실제 데이터 저장 없음
  </garden_section>

  <features_section>
    배경: #ffffff (Garden과 교차)
    패딩: py-20 px-4 sm:py-24 sm:px-6

    섹션 라벨: "주요 기능" (#52B788)
    제목: "그리니가 특별한 이유" (font-black, 30px/36px)

    카드 3개 (grid md:grid-cols-3 gap-6):
      각 카드: bg-white rounded-3xl p-8 shadow-sm
      아이콘 영역: h-14 w-14 rounded-2xl flex items-center justify-center text-3xl
      1. 💬 "#e8f5e9" — "식물이 먼저 말을 걸어요" — "매일 식물이 먼저 안부를 물어봐요..."
      2. 💧 "#eff6ff" — "스마트 물주기 알림" — "식물 종류와 계절에 맞춰..."
      3. 🔬 "#fffbeb" — "AI 식물 진단" — "사진 한 장으로 식물 종류 자동 인식..."
  </features_section>

  <how_it_works_section>
    배경: #F0FFF4
    패딩: py-20 px-4 sm:px-6

    섹션 라벨: "시작하는 방법" (#52B788)
    제목: "사진 한 장이면 충분해요" (font-black, 30px/36px)
    서브: "복잡한 설정 없이, 식물 사진 하나로 바로 시작할 수 있어요."

    메인 아이콘: 📸 (h-40 w-40 sm:h-48 sm:w-48 rounded-full bg-[#52B788] text-7xl shadow-2xl)
      "1" 뱃지: absolute -top-3 -right-3, h-10 w-10 rounded-full bg-[#FFD166] font-black text-[#1A3C34]
      scale 0.9→1 + opacity 0→1, duration 0.6s, delay 0.2s

    3단계 설명 (grid sm:grid-cols-3 gap-3):
      🔍 AI가 식물 자동 인식 / 🪴 내 텃밭에 등록 / 💬 대화 시작!
      각: flex items-center sm:flex-col gap-3, rounded-2xl bg-[#F0FFF4] px-4 py-3
      아이콘(text-2xl) + 텍스트(font-medium, 14px, #1A3C34)
  </how_it_works_section>

  <cta_section>
    배경: #52B788 (진한 그린, 강한 CTA)
    id="cta" (FloatingCTA 버튼 scrollIntoView 타겟)
    패딩: py-20 px-4 sm:py-28 sm:px-6

    중앙 정렬 max-w-2xl:
      🌱 이모지 (text-6xl, mb-6)
      제목: "가장 먼저 만나보세요" (font-black, 30px/40px/48px, #ffffff)
      서브: "그리니가 출시되면 사전예약자분들께 가장 먼저 알려드릴게요." (text-white/80, 18px)
      WaitlistForm (size=large)
        - 이메일 input: border-white/30 bg-white
        - 버튼: bg-[#1A3C34] hover:bg-[#0f2620]
      안내: "스팸 메일은 절대 보내지 않아요 · 언제든 수신 취소 가능" (14px, text-white/60)
  </cta_section>

  <footer>
    배경: #1A3C34
    패딩: py-12 px-4 sm:px-6

    상단 (flex flex-col sm:flex-row justify-between gap-6):
      로고: 🪴 + "greeny" (text-[#52B788], font-black, 20px)
      SNS 링크 (flex gap-6):
        Instagram → https://instagram.com/greeny.app
        Threads → https://threads.net/@greeny.app
        X (Twitter) → https://x.com/greeny_app
        각 링크: text-white/60 hover:text-white, 14px, transition-colors

    하단 구분선 + 저작권:
      border-t border-white/10 mt-8 pt-8
      "© 2025 Greeny. All rights reserved." (14px, text-white/40, text-center)
  </footer>

  <floating_cta>
    position: fixed bottom-6 right-6 z-50
    표시 조건: Hero 섹션이 뷰포트에서 벗어난 후 (IntersectionObserver threshold 0.1)
    버튼: "🌱 사전예약하기" — bg-[#52B788] rounded-full px-5 py-3 font-semibold text-white shadow-lg
    hover: bg-[#3a9e72]
    클릭: CTA 섹션(id="cta")으로 smooth scroll
    입장: opacity 0→1, y 20→0, scale 0.9→1 (spring stiffness:300 damping:25)
    퇴장: AnimatePresence로 fade out
  </floating_cta>

</pages_and_interfaces>

<core_functionality>
  <waitlist_email_collection>
    - WaitlistForm 컴포넌트: 이메일 input + 제출 버튼
    - 제출 시 Server Action `addToWaitlist(email)` 호출
    - 유효성: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 정규식 검사
    - 성공: toast.success + 폼을 완료 상태로 전환 (재제출 불가)
    - 중복 이메일(23505 코드): "이미 등록된 이메일이에요! 출시 시 알려드릴게요 :)" toast.error
    - 기타 에러: "잠시 후 다시 시도해주세요." toast.error
    - 로딩 중: 버튼 텍스트 "등록 중...", disabled, opacity-60
    - 완료 상태: 초록 배경 알림 컴포넌트로 교체 (재애니메이션 scale 0.9→1)
    - IP/UserAgent: headers()로 서버에서 추출, DB 저장
  </waitlist_email_collection>

  <chat_demo_animation>
    - 3개 식물 캐릭터 사전 스크립트 (각 5개 메시지)
    - 자동 재생: useEffect + setTimeout 체인으로 메시지 순차 표시
    - 타이핑 인디케이터: 식물 메시지 전 1.5s 표시 (3개 점 bounce 애니메이션)
    - 메시지 간 딜레이: 식물→사용자 0.8s, 사용자→식물 1.2~2.0s (대화 자연스러움)
    - 루프: 마지막 메시지 후 3s → fade out → 다음 캐릭터 인트로 → 새 대화
    - 수동 전환: 하단 탭 클릭 시 즉시 전환 (clearTimeout으로 현재 타이머 취소)
    - 스크롤 자동: 새 메시지 추가 시 채팅 영역 scrollTop → scrollHeight
    - CRITICAL: 실제 AI API 호출 없음. 모든 메시지는 하드코딩된 상수 배열
  </chat_demo_animation>

  <scroll_showcase>
    - h-[360vh] 컨테이너 + sticky top-0 h-screen 내부 패널
    - useScroll {target, offset: ["start start", "end end"]}
    - 장면별 opacity + y를 useTransform으로 스크롤 진행도에 매핑
    - 하단 progress dot 3개: 현재 장면에 따라 opacity 강조
  </scroll_showcase>

  <garden_interactive_preview>
    - 화분 스킨 4종 / 장식 4종 선택 UI (useState)
    - 선택 시 ring-2 ring-[#52B788] 하이라이트
    - whileTap scale 0.92 피드백
    - CRITICAL: 선택 상태는 컴포넌트 내부 상태만, DB 저장 없음
  </garden_interactive_preview>
</core_functionality>

<error_handling>
  <form_errors>
    - 빈 이메일: HTML5 required 속성으로 브라우저 기본 검사
    - 잘못된 형식: 정규식 검사 후 toast.error "올바른 이메일 주소를 입력해주세요."
    - 중복: toast.error "이미 등록된 이메일이에요! 출시 시 알려드릴게요 :)"
    - 서버 오류: toast.error "잠시 후 다시 시도해주세요."
    - toast 스타일: bg-[#52B788] text-white rounded-full (성공), position bottom-center
  </form_errors>
  <animation_errors>
    - ChatDemo 타이머: 컴포넌트 unmount 시 clearTimeout으로 메모리 누수 방지
    - ScrollShowcase: 서버 렌더링 시 useScroll 비활성 (클라이언트 컴포넌트로 분리)
  </animation_errors>
</error_handling>

<third_party_integrations>
  <integration name="Supabase">
    <purpose>웨이팅 리스트 이메일 영구 저장</purpose>
    <sdk>@supabase/supabase-js v2+</sdk>
    <usage>
      - createClient(url, serviceRoleKey) → supabaseAdmin (서버 전용)
      - .from("waitlist_greeny").insert({contact, contact_type, ip_address, user_agent})
      - RLS: anon INSERT 허용, SELECT/UPDATE/DELETE 불허
    </usage>
    <error_codes>
      - 23505: UNIQUE 제약 위반 (중복 이메일)
    </error_codes>
  </integration>
  <integration name="Vercel">
    <purpose>호스팅 및 CI/CD 자동 배포</purpose>
    <setup>vercel link → main 브랜치 push 시 자동 프로덕션 배포</setup>
    <env_vars>Vercel 대시보드에서 NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY 설정</env_vars>
  </integration>
</third_party_integrations>

<aesthetic_guidelines>
  <design_philosophy>
    밝고 귀여운 감성 (Bright & Playful). 20-30대 1인 가구에게 친근하고 따뜻한 느낌.
    피크민처럼 애착을 유발하는 캐릭터 감성. 과하지 않은 애니메이션으로 생동감.
    Apple 랜딩 페이지처럼 스크롤이 경험 자체가 되도록.
  </design_philosophy>

  <color_palette>
    <primary>
      - Greeny Primary: #52B788 — CTA 버튼, 강조 텍스트, 식물 말풍선, 아이콘 배경
      - Greeny Primary Dark: #3a9e72 — 버튼 hover 상태
      - Greeny Primary Darker: #1A3C34 — 헤드라인 텍스트, Footer 배경, ChatDemo 배경
    </primary>
    <accent>
      - Warm Yellow: #FFD166 — 레벨 뱃지, 스텝 번호, 포인트 강조
    </accent>
    <backgrounds>
      - Page BG: #F0FFF4 — 전체 기본 배경 (매우 연한 민트)
      - White: #ffffff — 카드 배경, 채팅 사용자 말풍선
      - Light Green: #d1fae5 — secondary 배경
      - Very Light Green: #e8f5e9 — 카드 border, 선택된 아이템 bg
    </backgrounds>
    <text>
      - Dark: #1A3C34 — 제목, 본문
      - Muted: #5a7a6e — 서브 텍스트, 설명
      - On Primary: #ffffff — #52B788 위의 텍스트
      - On Dark: rgba(255,255,255,0.8) — #1A3C34 위의 서브텍스트
    </text>
    <functional>
      - Border: #c6e8d5
      - Input Border Focus: #52B788
      - Success Toast BG: #52B788
    </functional>
    <section_backgrounds>
      각 섹션이 교차하며 시각적 구분:
      Hero → #F0FFF4 + gradient
      Pain → #ffffff
      ScrollShowcase → 장면별 gradient (연한 그린/파랑/노랑)
      ChatDemo → #1A3C34 (어두운 배경, 강조)
      Garden → #F0FFF4
      Features → #ffffff
      HowItWorks → #F0FFF4
      CTA → #52B788 (강한 CTA)
      Footer → #1A3C34
    </section_backgrounds>
  </color_palette>

  <typography>
    <font_families>
      - Primary: "Noto Sans KR" (Google Fonts, subsets: latin, weight: 400/500/700/900)
      - CSS variable: --font-sans
      - Fallback: system-ui, -apple-system, sans-serif
    </font_families>
    <font_sizes>
      - Display (Hero h1): 40px mobile / 50px sm / 60px md, font-black (900)
      - Section Title (h2): 30px mobile / 36px sm, font-black (900)
      - Card Title (h3): 18px, font-bold (700)
      - Body: 14px mobile / 16px sm, font-normal (400)
      - Caption/Label: 12px / 10px (특수 케이스), font-semibold (600)
      - Section Tag: 12px mobile / 14px sm, uppercase, tracking-widest, font-semibold
    </font_sizes>
    <line_heights>
      - Heading: leading-tight (1.25)
      - Body: leading-relaxed (1.625)
    </line_heights>
  </typography>

  <spacing>
    - Section padding: py-20 px-4 (mobile) / py-24 px-6 (sm+)
    - Card padding: p-7 (pain cards) / p-8 (feature cards) / p-5 (garden, chat)
    - Component gap: gap-3 (tight) / gap-6 (standard) / gap-8 md:gap-16 (showcase)
    - Max widths: max-w-2xl (폼, CTA 텍스트) / max-w-4xl (전체 콘텐츠) / max-w-md (폼 너비)
  </spacing>

  <borders_and_shadows>
    <borders>
      - 카드 border: 1px solid #e8f5e9 (pain cards)
      - 선택 ring: ring-2 ring-[#52B788] (garden items)
      - Input: border border-[#c6e8d5], focus: border-[#52B788] ring-2 ring-[#52B788]/20
      - 폰 프레임: border-4 border-[#2a4a2a]
    </borders>
    <shadows>
      - Card light: shadow-sm (0 1px 2px rgba(0,0,0,0.05))
      - Card prominent: shadow-lg / shadow-xl (채팅 카드, 폰 목업)
      - CTA button: shadow-lg (FloatingCTA)
      - Step icon: shadow-2xl (HowItWorks 아이콘)
      - Radius: rounded-2xl (16px) / rounded-3xl (24px) / rounded-full (999px)
    </shadows>
  </borders_and_shadows>

  <animations>
    <scroll_entrance>
      모든 섹션: useInView(once:true, margin:"-100px") → animate y 20-30→0 + opacity 0→1
      duration: 0.5-0.7s, easing: easeOut
      stagger: 0.1-0.2s per item
    </scroll_entrance>
    <hero_parallax>
      배경: y 0→15%, 콘텐츠: y 0→30%, 콘텐츠 opacity 1→0 (스크롤 60%까지)
      잎사귀 float: y [0,-14,0] rotate [-5,5,-5] opacity [0.4,0.7,0.4], Infinity, 3-6s
    </hero_parallax>
    <scroll_showcase>
      useScroll + useTransform: opacity + y 변환
      각 장면 전환: 12% 진행도에 걸쳐 fade
    </scroll_showcase>
    <chat_typing_indicator>
      3개 점 bounce: y [0,-6,0], stagger 0.15s, duration 0.6s, Infinity
    </chat_typing_indicator>
    <chat_message_entrance>
      opacity 0→1, y 8→0, duration 0.4s, ease "easeOut"
    </chat_message_entrance>
    <garden_hover>
      식물 카드: whileHover y -6px scale 1.04, whileTap scale 0.92
      커스터마이즈 아이템: whileTap scale 0.92
    </garden_hover>
    <floating_cta>
      등장: spring stiffness:300 damping:25, opacity+y+scale
      AnimatePresence로 자연스러운 퇴장
    </floating_cta>
    <form_complete>
      완료 메시지 등장: scale 0.9→1, opacity 0→1, duration 0.3s
    </form_complete>
  </animations>

  <responsive_design>
    <breakpoints>
      - mobile: 0-639px (기본, 단일 컬럼, 큰 터치 타겟)
      - sm: 640px+ (2-3 컬럼 그리드, 폼 row 방향, 폰트 업스케일)
      - md: 768px+ (showcase 좌우 레이아웃)
    </breakpoints>
    <mobile_adaptations>
      - WaitlistForm: flex-col (모바일) → flex-row sm:flex-row
      - ScrollShowcase 내부: flex-col(모바일) → flex-row md:
      - Garden 커스터마이징: grid-cols-1(모바일) → grid-cols-2 sm:
      - HowItWorks 3단계: flex-row items-center(모바일, 아이콘+텍스트 가로) → flex-col items-center sm:
    </mobile_adaptations>
    <touch_targets>
      - 모든 버튼/input: min-h-[48px] (WCAG 2.5.8 최소 44px 초과)
      - FloatingCTA: px-5 py-3 (충분한 터치 영역)
      - Garden 선택 아이템: py-2 + 충분한 패딩
    </touch_targets>
  </responsive_design>
</aesthetic_guidelines>

<security_considerations>
  <server_action_security>
    - CRITICAL: SUPABASE_SERVICE_ROLE_KEY는 Server Action에서만 사용. NEXT_PUBLIC_ 접두사 절대 금지
    - 이메일 입력값: toLowerCase().trim() 처리 후 저장
    - 이메일 형식 검증: 서버에서 정규식 재검증 (클라이언트 검증 우회 가능성 대비)
    - 최대 길이: 이메일 255자 (VARCHAR(255) 제약)
  </server_action_security>
  <rate_limiting>
    - Vercel 기본 DDoS 보호 활용
    - 동일 이메일 중복 제출: DB UNIQUE 제약으로 차단
    - 고급 rate limiting은 Phase 2 (redis 기반)
  </rate_limiting>
  <data_protection>
    - ip_address, user_agent: 스팸 분석 목적, 수집 사실 명시 (Footer 또는 개인정보처리방침)
    - RLS: INSERT anon만 허용, SELECT 불허 → 이메일 목록 노출 방지
  </data_protection>
</security_considerations>

<final_integration_test>
  <test_scenario_1>
    <description>이메일 사전예약 정상 플로우</description>
    <steps>
      1. https://greeny-landing.vercel.app 접속
      2. Hero 섹션 이메일 input에 유효한 이메일 입력
      3. "사전예약하기" 버튼 클릭
      4. 버튼이 "등록 중..."으로 변경되고 disabled 상태 확인
      5. 성공 toast "사전예약 완료! 출시 소식을 가장 먼저 알려드릴게요 🌱" 표시 확인
      6. 폼이 완료 상태(초록 배경 메시지)로 전환 확인
      7. Supabase 대시보드 waitlist_greeny 테이블에 행 추가 확인
      8. ip_address, user_agent 필드 채워져 있는지 확인
    </steps>
  </test_scenario_1>
  <test_scenario_2>
    <description>중복 이메일 제출</description>
    <steps>
      1. 이미 등록된 이메일로 CTA 섹션 폼 제출
      2. 에러 toast "이미 등록된 이메일이에요! 출시 시 알려드릴게요 :)" 표시 확인
      3. 폼이 완료 상태로 전환되지 않음 확인
      4. DB에 중복 행 없음 확인
    </steps>
  </test_scenario_2>
  <test_scenario_3>
    <description>Apple 스타일 스크롤 쇼케이스 동작</description>
    <steps>
      1. ScrollShowcase 섹션까지 스크롤
      2. 첫 장면 "식물이 먼저 말을 걸어요" 완전히 표시 확인
      3. 천천히 스크롤 시 30% 진행 후 서서히 페이드아웃 확인
      4. 36-46% 진행 시 두 번째 장면 "물 줄 시간을 자동으로 알려드려요" 페이드인 확인
      5. 하단 progress dot이 현재 장면에 맞게 강조 확인
      6. 세 번째 장면까지 순서대로 전환 확인
    </steps>
  </test_scenario_3>
  <test_scenario_4>
    <description>AI 채팅 데모 자동 재생</description>
    <steps>
      1. ChatDemo 섹션까지 스크롤
      2. 식물 메시지 전 타이핑 인디케이터(점 3개 bounce) 표시 확인
      3. 메시지가 순서대로 자연스럽게 등장 확인 (opacity + y 애니메이션)
      4. 대화 루프 후 다음 식물 캐릭터로 전환 확인
      5. 하단 탭(몬이/샤프/라비) 클릭 시 해당 캐릭터 대화로 즉시 전환 확인
    </steps>
  </test_scenario_4>
  <test_scenario_5>
    <description>모바일 iPhone (375px) 전체 플로우</description>
    <steps>
      1. 크롬 DevTools iPhone SE(375px) 에뮬레이션
      2. Hero 폼이 세로 방향(flex-col)으로 표시 확인
      3. 모든 버튼 최소 48px 높이 확인
      4. ScrollShowcase 내부가 세로 배치(텍스트 상단, 프리뷰 하단) 확인
      5. 채팅 데모 폰 목업이 화면에 맞게 표시 확인
      6. FloatingCTA 버튼 터치 영역 충분한지 확인
      7. 이메일 제출 플로우 정상 동작 확인
    </steps>
  </test_scenario_5>
  <test_scenario_6>
    <description>FloatingCTA 동작</description>
    <steps>
      1. 페이지 최상단에서 FloatingCTA 버튼 미표시 확인
      2. Hero 섹션 아래로 스크롤 시 버튼 spring 애니메이션으로 등장 확인
      3. 버튼 클릭 시 CTA 섹션으로 smooth scroll 확인
      4. 다시 페이지 상단으로 스크롤 시 버튼 사라짐 확인
    </steps>
  </test_scenario_6>
</final_integration_test>

<success_criteria>
  <functionality>
    - 이메일 제출 성공률 100% (유효한 이메일, 네트워크 정상 시)
    - 중복 이메일 제출 시 정확한 에러 메시지 표시
    - 채팅 데모 3개 캐릭터 모두 루프 재생 정상 동작
    - ScrollShowcase 3장면 전환 순서 정확
    - FloatingCTA 스크롤 트리거 정확
  </functionality>
  <performance>
    - Vercel 프로덕션 배포 Lighthouse Performance 90점 이상
    - LCP(Largest Contentful Paint) 2.5초 이하
    - Hero 섹션 초기 렌더링 1초 이내
    - Framer Motion 애니메이션 60fps 유지 (Chrome DevTools)
  </performance>
  <user_experience>
    - 모바일 375px ~ 430px 모든 콘텐츠 가독성 확보 (가로 스크롤 없음)
    - 터치 타겟 전부 48px 이상
    - 스크롤 쇼케이스 각 장면 최소 1뷰포트 높이(360px 기준) 이상 표시
  </user_experience>
  <visual_design>
    - 브랜드 색상 (#52B788, #FFD166, #F0FFF4, #1A3C34) 일관 적용
    - 섹션 간 배경색 교차로 시각적 구분 명확
    - 식물 이모지 기반 비주얼이 귀엽고 통일감 있음
  </visual_design>
  <business>
    - 웨이팅 리스트 이메일 수집 기능 실제 작동 (Supabase 저장 확인)
    - SNS 링크 (Instagram, Threads, X) 모두 연결됨
    - OG 태그 설정으로 SNS 공유 시 썸네일/제목 정상 표시
  </business>
</success_criteria>

<build_output>
  <build_command>npm run build</build_command>
  <output_directory>.next/</output_directory>
  <deploy_command>vercel --prod (또는 main 브랜치 push → Vercel 자동 배포)</deploy_command>
  <production_url>https://greeny-landing.vercel.app</production_url>
  <static_optimization>/ 라우트는 정적 프리렌더링 (SSG). Server Action은 런타임에 실행.</static_optimization>
</build_output>

<key_implementation_notes>
  <critical_paths>
    1. ChatDemoSection은 완전히 새로 구현 필요 (가장 중요, 차별화 포인트)
    2. SUPABASE_SERVICE_ROLE_KEY는 반드시 서버 전용 유지
    3. ScrollShowcase 스크롤 타이밍은 h-[360vh] 기준으로 미세 조정 필요
    4. 모바일 폼 레이아웃 (flex-col) 반드시 확인
  </critical_paths>

  <recommended_implementation_order>
    1. 환경 변수 설정 (.env.local) + Supabase 테이블 생성
    2. globals.css 색상 토큰 + layout.tsx (Noto Sans KR, metadata)
    3. WaitlistForm + Server Action (핵심 기능 먼저)
    4. HeroSection (패럴렉스 + 폼 연결)
    5. FloatingCTA (IntersectionObserver)
    6. PainSection, FeaturesSection, HowItWorksSection (정적 섹션들)
    7. ScrollShowcaseSection (useScroll 인터랙션)
    8. ChatDemoSection (타이핑 애니메이션 + 스크립트 루프) ← 가장 복잡
    9. GardenSection (useState 인터랙션)
    10. CTASection + Footer
    11. page.tsx에 모든 섹션 조립
    12. 모바일 반응형 최종 점검
    13. Vercel 배포 + 환경 변수 설정
  </recommended_implementation_order>

  <chat_demo_implementation>
    ChatDemoSection 구현 핵심:
    ```
    const SCRIPTS = [
      { name: "몬이", emoji: "🌿", messages: [...] },
      { name: "샤프", emoji: "🌵", messages: [...] },
      { name: "라비", emoji: "🌸", messages: [...] },
    ]
    각 message: { from: "plant"|"user", text: string, delay: number }

    useEffect로 setTimeout 체인:
    1. 식물 메시지: delay → typing indicator 표시(1500ms) → 인디케이터 제거 → 메시지 추가
    2. 사용자 메시지: delay(800ms) → 메시지 추가
    3. 마지막 메시지 후 3000ms → currentCharIndex 변경 → 메시지 초기화 → 재시작

    cleanup: return () => { clearTimeout(timerRef.current) }
    ```
  </chat_demo_implementation>

  <supabase_schema>
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
      ON waitlist_greeny FOR INSERT TO anon WITH CHECK (true);
    ```
  </supabase_schema>

  <performance_notes>
    - Framer Motion: `"use client"` 컴포넌트에서만 import
    - useInView once:true로 반복 재실행 방지
    - 잎사귀 이모지 8개: transform만 사용 (will-change: transform 적용 고려)
    - 폰트: next/font/google으로 자동 최적화 (no layout shift)
    - 채팅 데모: Intersection Observer로 뷰포트 진입 시에만 애니메이션 시작 (배터리 절약)
  </performance_notes>
</key_implementation_notes>

</project_specification>
```
