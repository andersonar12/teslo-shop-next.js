import { Product } from "../../../interfaces/product.interface";
import ProductGridItem from "./ProductGridItem";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 gap-10">
      {products.map((product) => (
        // <ProductCard key={product.slug} product={product} />
        <ProductGridItem key={product.slug} product={product} />
      ))}
    </div>
  );
}
