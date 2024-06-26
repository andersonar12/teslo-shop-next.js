export const revalidate = 0; //  0 seconds
// https://tailwindcomponents.com/component/hoverable-table

import { getPaginatedOrders } from "@/actions/order/get-paginated-orders";
import { productPaginationWithImages } from "@/actions/product/product-pagination";
import ProductImage from "@/components/product/product-image/ProductImage";
import Pagination from "@/components/ui/pagination/Pagination";
import Title from "@/components/ui/title/Title";
import { currencyFormat } from "@/utils/currencyFormat";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages, currentPage } = await productPaginationWithImages({ page });

  const { ok, orders } = await getPaginatedOrders();

  if (!ok) {
    redirect("/auth/login");
  }
  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href={"/admin/product/new"} className="flex btn-primary items-center justify-center">
          <IoCardOutline className="mr-2" />
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Imagen
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Titulo
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Precio
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Genero
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Stock
              </th>
              <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      className="w-20 h-20 object-cover rounded"
                      src={product.ProductImage[0]?.url}
                      width={50}
                      height={50}
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link className="hover:underline" href={`/admin/product/${product.slug}`}>
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.gender}
                </td>
                <td className="text-sm  text-gray-900 font-bold px-6 py-4 whitespace-nowrap">
                  {product.inStock}
                </td>
                <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.sizes.join(", ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </>
  );
}
