import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { CheckoutPageContent } from "@/components/ecommerce/checkout-page-content";

export default function CheckoutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <CheckoutPageContent />
        <Footer />
      </main>
    </>
  );
}
