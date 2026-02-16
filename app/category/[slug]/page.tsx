import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { CategoryPageContent } from "@/components/ecommerce/category-page-content";
import { notFound } from "next/navigation";
import { getCategoryBySlug } from "@/data/categories";

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <CategoryPageContent categorySlug={slug} />
        <Footer />
      </main>
    </>
  );
}
