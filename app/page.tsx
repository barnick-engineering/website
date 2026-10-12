import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

// Below-fold components: code-split to reduce initial JS bundle
const StatsInfographic = dynamic(() =>
  import("@/components/stats-infographic").then((m) => m.StatsInfographic)
);
const PriceEstimator = dynamic(() =>
  import("@/components/price-estimator").then((m) => m.PriceEstimator)
);
const PortfolioSection = dynamic(() =>
  import("@/components/portfolio/PortfolioSection")
);
const FAQ = dynamic(() => import("@/components/faq"));
const CTABanner = dynamic(() => import("@/components/cta-banner"));
const Footer = dynamic(() => import("@/components/footer"));
const StickyContactBar = dynamic(() =>
  import("@/components/sticky-contact-bar").then((m) => m.StickyContactBar)
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24 pb-20 md:pb-0">
        <Hero />
        <StatsInfographic />
        <PriceEstimator />
        <PortfolioSection />
        <FAQ />
        <CTABanner />
        <Footer />
      </main>
      <StickyContactBar />
    </>
  );
}
