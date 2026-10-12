import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Noto_Sans_Bengali } from "next/font/google";
import { LanguageProvider } from "@/contexts/language-context";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: false,
});

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ["bengali"],
  variable: "--font-bengali",
  weight: ["400", "600", "700"],
  display: "swap",
  adjustFontFallback: true,
});

const siteUrl = "https://barnickpracharani.com";
const siteTitle = "বর্ণিক প্রচারাণী — প্রিন্টিং ও প্যাকেজিং";
const siteDescription =
  "বিজনেস কার্ড থেকে কাস্টম প্যাকেজিং — সহজ, দ্রুত, নির্ভরযোগ্য। ১৯৮৯ সাল থেকে ঢাকায় মানসম্মত প্রিন্টিং সেবা।";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "বর্ণিক প্রচারাণী",
    "Barnick Pracharani",
    "প্রিন্টিং",
    "প্যাকেজিং",
    "ভিজিটিং কার্ড",
    "visiting card printing",
    "business card printing",
    "letterhead printing",
    "envelope printing",
    "label printing",
    "banner printing",
    "poster printing",
    "flyer printing",
    "brochure printing",
  ],
  authors: [
    {
      name: "Avee Chakraborty",
      url: "https://www.linkedin.com/in/avee-chakraborty-234096ab/",
    },
  ],
  creator: "Avee Chakraborty",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-32x32.png",
      sizes: "32x32",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/favicon-16x16.png",
      sizes: "16x16",
    },
    {
      rel: "apple-touch-icon",
      url: "/barnick.png",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: "বর্ণিক প্রচারাণী",
    locale: "bn_BD",
    alternateLocale: ["en_US"],
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: siteTitle,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: ["/twitter-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${geistSans.variable} ${notoSansBengali.variable}`}
    >
      <body className="font-sans antialiased">
        {/* Google Analytics — lazyOnload so it never competes with first paint */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M37QBL6ZZN"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M37QBL6ZZN');
          `}
        </Script>
        {/* JSON-LD Structured Data */}
        <Script
          id="localbusiness-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Barnick Pracharani",
            alternateName: "বর্ণিক প্রচারাণী",
            url: "https://barnickpracharani.com",
            image: "https://barnickpracharani.com/barnick.png",
            logo: "https://barnickpracharani.com/barnick.png",
            description: siteDescription,
            telephone: "+8801712347097",
            foundingDate: "1989",
            openingHours: ["Sa-Th 09:00-18:00"],
            geo: {
              "@type": "GeoCoordinates",
              latitude: 23.7098,
              longitude: 90.4074,
            },
            sameAs: [
              "https://www.facebook.com/heybarnick",
              "https://www.instagram.com/barnick_pracharani/",
              "https://www.linkedin.com/company/barnick-pracharani",
            ],
            address: {
              "@type": "PostalAddress",
              streetAddress: "36 Bashichoron Sen Poddar Lane, Kotwali, Dhaka",
              addressLocality: "Dhaka",
              addressRegion: "Dhaka",
              addressCountry: "BD",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+8801712347097",
              contactType: "customer service",
              areaServed: "BD",
              availableLanguage: ["bn", "en"],
            },
          })}
        </Script>
        <LanguageProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
