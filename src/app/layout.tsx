import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Script from "next/script";
import { cookies } from "next/headers";
import DownloadModal from "@/components/DownloadModal";
import { getTranslations, toLocale } from "@/lib/i18n";
import "./globals.css";

const notoSansKR = Noto_Sans_KR({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://greeny-landing.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const locale = toLocale(cookieStore.get("greeny-locale")?.value);
  const t = getTranslations(locale).meta;

  return {
    metadataBase: new URL(siteUrl),
    title: t.title,
    description: t.description,
    openGraph: {
      title: t.title,
      description: t.description,
      type: "website",
      url: siteUrl,
      siteName: t.siteName,
      locale: locale === "ko" ? "ko_KR" : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = toLocale(cookieStore.get("greeny-locale")?.value);

  return (
    <html lang={locale} className={`${notoSansKR.variable} antialiased`}>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <DownloadModal locale={locale} />
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
