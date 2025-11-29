import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
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
      url: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      url: "/apple-touch-icon.png",
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
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-192x192.png",
      sizes: "192x192",
    },
    {
      rel: "icon",
      type: "image/png",
      url: "/android-chrome-512x512.png",
      sizes: "512x512",
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
