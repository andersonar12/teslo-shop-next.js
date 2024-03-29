"use server";
import prisma from "../../lib/prisma";

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return categories;
  } catch (error) {
    return [];
  }
}
