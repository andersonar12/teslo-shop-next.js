export const revalidate = 60; // 60 seconds

import { productPaginationWithImages } from "@/actions/product/product-pagination";
import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";
import { Gender } from "@prisma/client";
import { redirect } from "next/navigation";

const { products } = initialData;

interface Genders {
  [key: string]: string;
  men: string;
  women: string;
  kid: string;
}

export default async function GenderPage({
  params,
  searchParams,
}: {
  params: { gender: string };
  searchParams: { page?: string };
}) {
  const gender = params.gender;

  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages, currentPage } = await productPaginationWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect("/gender/" + gender);
  }

  // const productsByGender = products.filter((p) => p.gender === gender);

  const labelsGender: Genders = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  };

  return (
    <div>
      <Title
        title={"Articulos de " + labelsGender[gender]}
        subtitle="Encuentra los mejores productos"
        className="mb-2"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} currentPage={currentPage} />
    </div>
  );
}
