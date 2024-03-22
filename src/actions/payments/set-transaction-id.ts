"use server";
import prisma from "@/lib/prisma";
export const setTransactionId = async (orderId: string, transactionId: string) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        transactionId,
      },
    });

    if (!updatedOrder) {
      return {
        ok: false,
        message: `No se encontro la orden con el id ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);

    return {
      ok: false,
      message: "No se pudo actualizar el id de la transaccion",
    };
  }
};
