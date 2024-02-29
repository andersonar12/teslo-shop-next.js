export const revalidate = 60; // 60 seconds
import { productPaginationWithImages } from "@/actions/products/product-pagination";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

// const { products } = initialData;

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages, currentPage } = await productPaginationWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }
  return (
    <div>
      <Title title="Tienda" subtitle="Encuentra los mejores productos" className="mb-2" />

      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
