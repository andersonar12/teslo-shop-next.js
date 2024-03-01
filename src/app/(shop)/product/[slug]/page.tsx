export const revalidate = 60400; // 1 week revalidacion de data en cache

import { getProductBySlug } from "@/actions/product/get-product-by-slug";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductSlideshowMobile from "@/components/product/slideshow/ProductSlideshoMobile";
import ProductSlideshow from "@/components/product/slideshow/ProductSlideshow";
import StockLabel from "@/components/product/stock-label/StockLabel";
import { inter, titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
// import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";
import { metadata } from "../../../layout";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const { slug } = params;

  // fetch data
  const product = await getProductBySlug(slug);

  // optionally access and extend (rather than replace) parent metadata
  // const previousImages = (await parent).openGraph?.images || [];

  const title = product?.title || "Product not found";
  const description = product?.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [`/products/${product?.images[1]}`],
    },
  };
}

export default async function SimpleProduct({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2 ">
        {/* Mobile Slideshow */}

        <ProductSlideshowMobile
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Details */}
      <div className="col-span-1 px-5">
        <StockLabel slug={slug} />
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}> {product.title}</h1>
        <p className="text-lg mb-5">{product.price}$</p>

        {/* Selector de tallas */}
        <SizeSelector selectedSize={product.sizes[0]} availableSizes={product.sizes} />
        {/* Selector de cantidad */}
        <QuantitySelector quantity={1} />
        {/* Button */}
        <div></div>
        <div className="btn-primary my-5 inline-block">Agregar al carrito</div>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripcion</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
