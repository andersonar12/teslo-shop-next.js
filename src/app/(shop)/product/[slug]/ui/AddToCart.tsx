"use client";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import SizeSelector from "@/components/product/size-selector/SizeSelector";
import { CartProduct, Product } from "@/interfaces/product.interface";
import { useCartStore } from "@/store/cart/cart-store";
import { Size } from "@prisma/client";
import { useState } from "react";

interface Props {
  product: Product;
}

export default function AddToCart({ product }: Props) {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState(false);

  const addToCart = () => {
    setPosted(true);
    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      size,
      quantity,
      image: product.images[0],
    };

    addProductToCart(cartProduct);

    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && <span className="mt-2 text-red-500">Debe de seleccionar una talla*</span>}

      {/* Selector de tallas */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={(size) => setSize(size)}
      />
      {/* Selector de cantidad */}
      <QuantitySelector quantity={quantity} onQuantityChanged={setQuantity} />
      {/* Button */}
      <button onClick={addToCart} className="btn-primary my-5 inline-block">
        Agregar al carrito
      </button>
    </>
  );
}
