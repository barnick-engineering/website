import dynamic from "next/dynamic";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";

// Below-fold components: code-split to reduce initial JS bundle
const TrustStrip = dynamic(() =>
  import("@/components/trust-strip").then((m) => m.TrustStrip)
);
const ShopByNeed = dynamic(() => import("@/components/shop-by-need"));
const PriceEstimator = dynamic(() =>
  import("@/components/price-estimator").then((m) => m.PriceEstimator)
);
const PortfolioSection = dynamic(() =>
  import("@/components/portfolio/PortfolioSection")
);
const HowItWorks = dynamic(() => import("@/components/how-it-works"));
const DesignService = dynamic(() => import("@/components/design-service"));
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
      <main id="main" className="pt-16 lg:pt-[72px]">
        <Hero />
        <TrustStrip />
        <ShopByNeed />
        <PriceEstimator />
        <PortfolioSection />
        <HowItWorks />
        <DesignService />
        <FAQ />
        {/* OWNER-GATED: <Testimonials/> — render only with real, attributable reviews (GBP etc.). */}
        {/* OWNER-GATED: <Kits/> — F-commerce starter kits; needs owner packaging prices (P1b). */}
        {/* OWNER-GATED: <HeritageStory/> — shop/machines/founder photos + owner-confirmed history. */}
        <CTABanner />
      </main>
      {/* Footer is a landmark sibling of <main>; trackers find it by tag name */}
      <Footer />
      <StickyContactBar />
    </>
  );
}
