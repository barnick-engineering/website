import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Geist } from "next/font/google";
import { LanguageProvider } from "@/contexts/language-context";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barnick Pracharani - Printing Services",
  description:
    "Barnick Pracharani is a printing services company that provides a wide range of printing services to its clients.",
  keywords: [
    "Barnick Pracharani",
    "Barnick Pracharani Printing",
    "Barnick Pracharani Printing Services",
    "Barnick Pracharani Printing Products",
    "visiting card printing",
    "business card printing",
    "letterhead printing",
    "envelope printing",
    "label printing",
    "banner printing",
    "poster printing",
    "flyer printing",
    " brochure printing",
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
      url: "/favicon.ico", // Google prioritizes this
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
    title: "Barnick Pracharani – Printing & Packaging",
    description: "প্রিন্টিং / প্যাকেজিং এখন আরও সহজ, দ্রুত ও বিশ্বাসযোগ্য!",
    url: "https://barnickpracharani.com",
    siteName: "Barnick Pracharani",
    type: "website",
    images: [
      {
        url: "https://barnickpracharani.com/barnick.png",
        width: 389,
        height: 389,
        type: "image/png",
        alt: "Barnick Pracharani - Printing & Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barnick Pracharani – Printing & Packaging",
    description: "প্রিন্টিং / প্যাকেজিং এখন আরও সহজ, দ্রুত ও বিশ্বাসযোগ্য!",
    images: ["https://barnickpracharani.com/barnick.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M37QBL6ZZN"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M37QBL6ZZN');
          `}
        </Script>
        {/* JSON-LD Structured Data */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Barnick Pracharani",
            "url": "https://barnickpracharani.com",
            "logo": "https://barnickpracharani.com/barnick.png",
            "description": "Printing & Packaging Services - High-quality customized printing from business cards to marketing materials",
            "sameAs": [
              "https://www.facebook.com/heybarnick",
              "https://www.linkedin.com/company/barnick-pracharani",
              "https://www.instagram.com/barnick_pracharani/"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+8801712347097",
              "contactType": "customer service"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "36 Banshicharan Sen Poddar Lane, Kotowali",
              "addressLocality": "Dhaka",
              "addressCountry": "BD"
            }
          })}
        </Script>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
