"use server";
import prisma from "../../lib/prisma";
import bcryptjs from "bcryptjs";
export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password),
      },
    });

    const { password: _, ...rest } = user;

    return {
      ok: true,
      user: rest,
      message: "Usuario creado correctamente",
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "Error al crear el usuario",
    };
  }
};
