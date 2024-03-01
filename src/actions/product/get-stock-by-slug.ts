"use server";
import delay from "@/utils/delay";
import prisma from "../../lib/prisma";

export const getStockBySlug = async (slug: string) => {
  try {
    await delay(3);
    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
  }
};
