import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import ProductSlideshowMobile from "@/components/product/slideshow/ProductSlideshoMobile";
import ProductSlideshow from "@/components/product/slideshow/ProductSlideshow";
import { titleFont } from "@/config/fonts";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

export default function SimpleProduct({ params: { slug } }: { params: { slug: string } }) {
  const product = initialData.products.find((p) => p.slug === slug);

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
          className="block  md:hidden"
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
