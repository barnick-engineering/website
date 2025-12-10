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
      url: "/favicon.ico",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/barnick.png",
      sizes: "any",
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
        url: "https://barnickpracharani.com/images/preview.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Barnick Pracharani - Printing & Packaging",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barnick Pracharani – Printing & Packaging",
    description: "প্রিন্টিং / প্যাকেজিং এখন আরও সহজ, দ্রুত ও বিশ্বাসযোগ্য!",
    images: ["https://barnickpracharani.com/images/preview.jpg"],
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <LanguageProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
