"use server";

import { PayPalOrderStatusResponse } from "@/interfaces/paypal.interface";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  // console.log("paypalCheckPayment", { paypalTransactionId });
  const authToken = await getPayPalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de verficación de PayPal",
    };
  }

  const result = await verifyPayPalPayment(paypalTransactionId, authToken);

  if (!result) {
    return {
      ok: false,
      message: "Error al verificar el pago de PayPal",
    };
  }

  const { status, purchase_units } = result;
  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aun no se ha completado el pago de PayPal",
    };
  }

  //Realizar la actualizacion en nuestra base de datos
  try {
    console.log({ status, purchase_units });

    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    // Revalidar un path

    revalidatePath(`/orders/${orderId}`);
    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "500 - El pago no se pudo realizar",
    };
  }
};

const getPayPalBearerToken = async (): Promise<string | null> => {
  const { NEXT_PUBLIC_PAYPAL_CLIENT_ID: PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;
  const oauth2url = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(`${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`, "utf-8").toString(
    "base64"
  );
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${base64Token}`);

  const urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(oauth2url, { ...requestOptions, cache: "no-store" }).then((r) =>
      r.json()
    );

    console.log({ result });

    return result.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPayPalPayment = async (
  paypalTransacionId: string,
  bearerToken: string
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransacionId}`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${bearerToken}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  try {
    const resp = await fetch(paypalOrderUrl, { ...requestOptions, cache: "no-store" }).then((r) =>
      r.json()
    );

    return resp;
  } catch (error) {
    console.log(error);
    return null;
  }
};
