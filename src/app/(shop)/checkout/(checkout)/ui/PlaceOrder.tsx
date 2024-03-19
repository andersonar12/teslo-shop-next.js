"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";
import { useAddressStore } from "@/store/address/address-store";
import { useCartStore } from "@/store/cart/cart-store";
import { currencyFormat } from "@/utils/currencyFormat";
import { placeOrder } from "@/actions/order/place-order";
import { useRouter } from "next/navigation";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));
    console.log(address, productsToOrder);

    //Server Action
    const resp = await placeOrder(productsToOrder, address);

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // * Todo salio bien
    clearCart();
    router.replace("/orders/" + resp.order?.id);
  };

  if (!loaded) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="h-fit bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
      <div className="mb-10">
        <p className="text-xl font-bold">
          {address.firstName} {address.lastName}
        </p>
        <p className="">{address.address}</p>
        <p className="">{address.address2}</p>
        <p className="">
          {address.city}, {address.country}
        </p>
        <p className="">{address.zipCode}</p>
        <p className="">{address.phone}</p>
      </div>

      {/* Divider */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? "1 articulos" : `${itemsInCart} articulos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <div className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en COLOCAR ORDEN, aceptas las
            <span className="ml-1 underline cursor-pointer">
              Condiciones de uso y la Politica de privacidad
            </span>
          </span>
        </div>

        <p className="text-red-500">{errorMessage}</p>
        <button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder}
          className={clsx("flex btn-primary justify-center", {
            "btn-primary": !isPlacingOrder,
            "btn-disabled": isPlacingOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
