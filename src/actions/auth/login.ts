"use server";
import { signIn } from "@/auth.config";
import delay from "@/utils/delay";
import { AuthError } from "next-auth";

// ...

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    // await delay(3);

    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return "Success";
  } catch (error) {
    if ((error as AuthError).type === "CredentialsSignin") {
      return "CredentialsSignin";
    }

    return "UnknownError";
  }
}

export async function login(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
    });

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "No se pudo iniciar sesion",
    };
  }
}
