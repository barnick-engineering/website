import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { DealsContent } from "@/components/deals-content";

export default function DealsPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <DealsContent />
        <Footer />
      </main>
    </>
  );
}
