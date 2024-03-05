import { initialData } from "./seed";
import prisma from "../lib/prisma";

async function main() {
  //1. Delete all previous data
  // await Promise.all([
  await prisma.user.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  // ]);

  const { categories, products, users } = initialData;

  //Users
  await prisma.user.createMany({
    data: users,
  });

  //Categories

  //   await prisma.category.createMany({
  //     data: {
  //       name: "Shirts",
  //     },
  //   });

  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLocaleLowerCase()] = category.id;
    return map;
  }, {} as Record<string, string>);

  // console.log("categoriesMap", categoriesMap);

  //Products

  products.forEach(async (product) => {
    const { images, type, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Images

    const imagesData = images.forEach(async (image) => {
      await prisma.productImage.create({
        data: {
          productId: dbProduct.id,
          url: image,
        },
      });
    });
  });
  console.log("Seeding database completed");
}

(async () => {
  if (process.env.NODE_ENV === "production") return;
  main();
})();
