import Title from "@/components/ui/title/Title";
import Link from "next/link";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import QuantitySelector from "@/components/product/quantity-selector/QuantitySelector";
const productsInCart = [initialData.products[0], initialData.products[1], initialData.products[2]];

export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Orden" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={"/cart"} className="underline mb-5">
              Editar carrito
            </Link>

            {/* Items */}
            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{ width: "100px", height: "100px" }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="text-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout - Resumen de orden/compra */}
          <div className="h-fit bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Nombre: Fernando</p>
              <p>Apellido: Perez</p>
              <p>Dirección: Calle 123</p>
              <p>Ciudad: Bogota</p>
              <p>Codigo postal: 12345</p>
              <p>Telefono: 123456789</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. productos</span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$ 75</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ 15</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 115</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div className="mb-5">
                {/* Disclaimer */}
                <span className="text-xs">
                  Al hacer clic en "colocar orden", aceptas las
                  <span className="underline cursor-pointer">
                    Condiciones de uso y la Politica de privacidad
                  </span>
                </span>
              </div>
              <Link className="flex btn-primary justify-center" href={"/orders/123"}>
                Colocar orden
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
