import { Navbar } from "@/components/navbar";
import Footer from "@/components/footer";
import { CategoryCard } from "@/components/ecommerce/category-card";
import { categories } from "@/data/categories";
import { ShopHero } from "@/components/ecommerce/shop-hero";

export default function ShopPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 xs:pt-20 sm:pt-24">
        <ShopHero />
        <div id="featured" className="max-w-screen-xl mx-auto px-6 xl:px-0 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
