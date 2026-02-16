import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { ProductPageContent } from "@/components/ecommerce/product-page-content";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/data/products";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <ProductPageContent product={product} />
        <Footer />
      </main>
    </>
  );
}
