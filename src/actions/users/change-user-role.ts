"use server";

import { revalidate } from "@/app/(shop)/page";
import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Debe ser usuario administrador",
    };
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: role as Role,
      },
    });

    revalidatePath("/admin/users");
    return {
      ok: true,
      user,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo actualizar el rol del usuario, revisar consola",
    };
  }
};
