import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import Image from "next/image";

const { products } = initialData;

export default function ShopPage() {
  return (
    <div>
      <Title title="Tienda" subtitle="Encuentra los mejores productos" className="mb-2" />

      <ProductGrid products={products} />
    </div>
  );
}
