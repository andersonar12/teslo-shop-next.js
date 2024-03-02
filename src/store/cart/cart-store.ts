import { CartProduct } from "@/interfaces/product.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    itemsInCart: number;
    subTotal: number;
    tax: number;
    total: number;
  };
  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce(
          (subtotal, product) => product.quantity * product.price + subtotal,
          0
        );

        const taxRate = 0.15;
        const tax = subTotal * taxRate;
        const total = subTotal + tax;

        return {
          itemsInCart: get().getTotalItems(),
          subTotal,
          tax,
          total,
        };
      },
      addProductToCart: (product) => {
        const { cart } = get();

        //1. Revisar si el producto ya existe en el carrito con la talla seleccionada
        const productinCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productinCart) {
          set({ cart: [...cart, product] });
          return;
        }

        //2. Se que el producto existe por talla... tengo que actualizar la cantidad
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }

          return item;
        });

        set({ cart: updatedCartProducts });
      },
      updateProductQuantity: (product, quantity) => {
        set((state) => ({
          cart: state.cart.map((p) => {
            if (p.id === product.id && p.size === product.size) {
              return {
                ...p,
                quantity,
              };
            }
            return p;
          }),
        }));
      },
      removeFromCart: (product) => {
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== product.id || p.size !== product.size),
        }));
      },
    }),
    {
      name: "shopping-cart",
    }
  )
);
