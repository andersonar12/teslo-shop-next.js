"use server";

import prisma from "@/lib/prisma";
import { Gender, Product, Size } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((value) => Number(value.toFixed(2))),
  categoryId: z.string().uuid(),
  sizes: z.coerce.string().transform((value) => value.split(",")),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
});

export default async function createUpdateProduct(formData: FormData) {
  const data = Object.fromEntries(formData);

  console.log({ data });
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    return {
      ok: false,
    };
  }

  const { id, ...restProduct } = productParsed.data;

  restProduct.slug = restProduct.slug.toLocaleLowerCase().replaceAll(" ", "-").trim();

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = restProduct.tags.split(",").map((tag) => tag.trim().toLowerCase());

      const data = {
        ...restProduct,
        sizes: {
          set: restProduct.sizes as Size[],
        },
        tags: {
          set: tagsArray,
        },
      };

      if (id) {
        // Update
        product = await tx.product.update({
          where: {
            id,
          },
          data,
        });

        console.log("ProductUpdated ->", product);
      } else {
        // Create

        product = await tx.product.create({
          data,
        });

        console.log("ProductCreated ->", product);
      }

      //Proceso de carga y guardado de imagenes
      //Recorrer las imagenes y guardarlas

      if (formData.getAll("images").length > 0) {
        const images = await uploadImages(formData.getAll("images") as File[]);
        console.log({ imagesCloudinary: images });

        if (!images) {
          throw new Error("No se pudieron subir las imagenes, rollingback");
        }

        await tx.productImage.createMany({
          data: images.map((image, index) => ({
            productId: product.id,
            url: image!,
          })),
        });
      }

      return { product };
    });

    revalidatePath("/admin/products");
    revalidatePath(`/admin/product/${restProduct.slug}`);
    revalidatePath(`/products/${restProduct.slug}`);

    return {
      ok: true,
      product: prismaTx.product,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo crear el producto",
    };
  }
}
const uploadImages = async (images: File[]) => {
  try {
    const uploadedPromises = images.map(async (file) => {
      try {
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString("base64");
        return cloudinary.uploader
          .upload("data:image/png;base64," + base64)
          .then((result) => result.secure_url);
      } catch (error) {
        console.log(error);
        return null;
      }
    });

    const uploadedImages = await Promise.all(uploadedPromises);

    return uploadedImages;
  } catch (error) {
    console.log(error);

    return null;
  }
};
