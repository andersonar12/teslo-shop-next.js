import ProductGrid from "@/components/products/product-grid/ProductGrid";
import Title from "@/components/ui/title/Title";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const { products } = initialData;

interface Genders {
  [key: string]: string;
  men: string;
  women: string;
  kid: string;
}

export default function CategoryPage({ params }: { params: { id: string } }) {
  const id = params.id;

  const productsByGender = products.filter((p) => p.gender === id);

  const labelsGender: Genders = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
  };

  // if (id === "kids") {
  //   return notFound();
  // }
  return (
    <div>
      <Title
        title={"Articulos de " + labelsGender[id]}
        subtitle="Encuentra los mejores productos"
        className="mb-2"
      />
      <ProductGrid products={productsByGender} />
    </div>
  );
}
