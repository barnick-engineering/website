import About from "@/components/about";
import CTABanner from "@/components/cta-banner";
import FAQ from "@/components/faq";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import Testimonials from "@/components/testimonials";
import { YouTubeShortsSection } from "@/components/youtube-shorts-section";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <Hero />
        <About />
        <Features />
        <YouTubeShortsSection />
        <Testimonials />
        <FAQ />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
