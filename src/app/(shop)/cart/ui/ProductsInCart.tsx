"use client";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
import { useCartStore } from "@/store/cart/cart-store";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import ProductImage from "@/components/product/product-image/ProductImage";

export default function ProductsInCart() {
  const [loaded, setLoaded] = useState(false);

  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeFromCart = useCartStore((state) => state.removeFromCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Loading...</p>;
  }
  return (
    <>
      {productsInCart.map((product) => (
        <div key={product.slug + product.size} className="flex mb-5">
          <ProductImage
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            style={{ width: "100px", height: "100px" }}
            className="mr-5 rounded"
          />
          <div>
            <Link href={`/product/${product.slug}`} className="hover:underline cursor-pointer">
              {product.size + " - " + product.title}
            </Link>
            <p className="">${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            />
            <button onClick={() => removeFromCart(product)} className="underline mt-3">
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
}
