import About from "@/components/about";
import { AnnouncementBanner } from "@/components/announcement-banner";
import CTABanner from "@/components/cta-banner";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { HomeExploreCategories } from "@/components/home-explore-categories";
import { HomeFeaturedProducts } from "@/components/home-featured-products";
import { HomeNewArrivals } from "@/components/home-new-arrivals";
import { HomePromoBlocks } from "@/components/home-promo-blocks";
import { HomeShopByCollection } from "@/components/home-shop-by-collection";
import { TrustStrip } from "@/components/trust-strip";
import { TrustedBySection } from "@/components/trusted-by-section";
import { Navbar } from "@/components/navbar";
import Testimonials from "@/components/testimonials";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <AnnouncementBanner />
        <Hero />
        <TrustedBySection />
        <TrustStrip />
        <HomeExploreCategories />
        <HomeShopByCollection />
        <HomeFeaturedProducts />
        <HomeNewArrivals />
        <HomePromoBlocks />
        <About />
        <Features />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
