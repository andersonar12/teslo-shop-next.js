"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export default async function deleteProductImage(imageId: number, imageUrl: string) {
  if (!imageUrl.startsWith("http"))
    return {
      ok: false,
      error: "No se pueden borrar iamgenes de File System",
    };

  const imageName = imageUrl.split("/").pop()?.split(".")[0];

  try {
    await cloudinary.uploader.destroy(imageName as string);
    const {
      product: { slug },
    } = await prisma.productImage.delete({
      where: {
        id: imageId,
      },
      select: {
        product: {
          select: {
            slug: true,
          },
        },
      },
    });
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${slug}`);
    revalidatePath(`/product/${slug}`);

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      error: "No se pudo borrar la imagen",
    };
  }
}
