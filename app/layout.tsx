import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import Script from "next/script";
import { Geist } from "next/font/google";
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
      url: "/barnick.png",
    },
    {
      rel: "apple-touch-icon",
      url: "/barnick.png",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/barnick.png",
      sizes: "any",
    },
  ],
  robots: {
    index: true,
    follow: true,
  },
  manifest: "/site.webmanifest",
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
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
