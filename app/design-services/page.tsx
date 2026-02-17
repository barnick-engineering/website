import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { DesignServicesContent } from "@/components/design-services-content";

export default function DesignServicesPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <DesignServicesContent />
        <Footer />
      </main>
    </>
  );
}
