import Hero from "@/components/hero";
import { StatsInfographic } from "@/components/stats-infographic";
import Testimonials from "@/components/testimonials";
import FAQ from "@/components/faq";
import CTABanner from "@/components/cta-banner";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { StickyContactBar } from "@/components/sticky-contact-bar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24 pb-20 md:pb-0">
        <Hero />
        <StatsInfographic />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Footer />
      </main>
      <StickyContactBar />
    </>
  );
}
