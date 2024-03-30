"use client";
import { getStockBySlug } from "@/actions/product/get-stock-by-slug";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

export default function StockLabel({ slug }: { slug: string }) {
  const [inStock, setInStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getStock() {
      const stock = await getStockBySlug(slug);
      setInStock(stock);
      setIsLoading(false);
    }
    getStock();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} text-lg font-bold mb-5 bg-gray-300 animate-pulse w-full`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} text-lg font-bold mb-5`}>Stock: {inStock}</h1>
      )}
    </>
  );
}
