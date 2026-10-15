import type { Metadata } from "next";
import { Hind_Siliguri, Noto_Serif_Bengali, Baloo_Da_2, Galada } from "next/font/google";
import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { DesignStudio } from "@/components/design-studio/design-studio";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-hind-siliguri",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-noto-serif-bengali",
});

const balooDa2 = Baloo_Da_2({
  subsets: ["bengali"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-baloo-da",
});

const galada = Galada({
  subsets: ["bengali"],
  weight: ["400"],
  display: "swap",
  variable: "--font-galada",
});

const siteUrl = "https://barnickpracharani.com";

export const metadata: Metadata = {
  title: "ডিজাইন স্টুডিও — বর্ণিক প্রচারণী",
  description:
    "নিজেই ডিজাইন করুন — ভিজিটিং কার্ড, স্টিকার, লেবেল, ফ্লায়ার সহ ১০টি পণ্য। সরাসরি মেসেঞ্জারে পাঠান।",
  openGraph: {
    title: "ডিজাইন স্টুডিও — বর্ণিক প্রচারণী",
    description:
      "নিজেই ডিজাইন করুন — ভিজিটিং কার্ড, স্টিকার, লেবেল, ফ্লায়ার সহ ১০টি পণ্য। সরাসরি মেসেঞ্জারে পাঠান।",
    url: `${siteUrl}/design`,
    siteName: "বর্ণিক প্রচারণী",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "ডিজাইন স্টুডিও — বর্ণিক প্রচারণী",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ডিজাইন স্টুডিও — বর্ণিক প্রচারণী",
    description:
      "নিজেই ডিজাইন করুন — ভিজিটিং কার্ড, স্টিকার, লেবেল, ফ্লায়ার সহ ১০টি পণ্য। সরাসরি মেসেঞ্জারে পাঠান।",
  },
};

interface SearchParams {
  product?: string;
}

export default async function DesignPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const hasBlob = !!process.env.BLOB_READ_WRITE_TOKEN;
  const uploadEndpoint = hasBlob ? "/api/design-upload" : null;

  const fontFamilies: Record<string, string> = {
    "noto-sans": "Noto Sans Bengali",
    "hind-siliguri": hindSiliguri.style.fontFamily,
    "noto-serif": notoSerifBengali.style.fontFamily,
    "baloo-da": balooDa2.style.fontFamily,
    galada: galada.style.fontFamily,
  };

  return (
    <div
      className={`${hindSiliguri.variable} ${notoSerifBengali.variable} ${balooDa2.variable} ${galada.variable}`}
    >
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24 pb-20 md:pb-0">
        <DesignStudio
          initialProductId={params.product}
          uploadEndpoint={uploadEndpoint}
          fontFamilies={fontFamilies}
        />
      </main>
      <Footer />
    </div>
  );
}
