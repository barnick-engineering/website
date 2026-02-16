import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { CartPageContent } from "@/components/ecommerce/cart-page-content";

export default function CartPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <CartPageContent />
        <Footer />
      </main>
    </>
  );
}
