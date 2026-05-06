import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import DownloadModal from "@/components/DownloadModal";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://greeny-landing.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "그리니 — 말 걸어주는 식물 친구",
  description:
    "대화를 나눌수록 자라나는 나만의 식물 친구, 그리니. 사전예약하고 출시 알림을 가장 먼저 받아보세요.",
  openGraph: {
    title: "그리니 — 말 걸어주는 식물 친구",
    description:
      "대화를 나눌수록 자라나는 나만의 식물 친구, 그리니. 사전예약하고 출시 알림을 가장 먼저 받아보세요.",
    type: "website",
    url: siteUrl,
    siteName: "그리니",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "그리니 — 말 걸어주는 식물 친구",
    description:
      "대화를 나눌수록 자라나는 나만의 식물 친구, 그리니. 사전예약하고 출시 알림을 가장 먼저 받아보세요.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${notoSansKR.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <DownloadModal />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QLNTJX18MD"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QLNTJX18MD');
          `}
        </Script>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              background: "#52B788",
              color: "#fff",
              borderRadius: "999px",
              fontFamily: "var(--font-sans)",
            },
          }}
        />
      </body>
    </html>
  );
}
