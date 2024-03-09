"use client";
import { login } from "@/actions/auth/login";
import { registerUser } from "@/actions/auth/register";
import clsx from "clsx";

import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  fullName: string;
  email: string;
  password: string;
}

export default function NewAccountForm() {
  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setErrorMessage("");
    // console.log(data);
    const { fullName, email, password } = data;

    const resp = await registerUser(fullName, email, password);

    console.log({ resp });

    if (!resp.ok) {
      setErrorMessage(resp.message);
      return;
    }

    await login(email.toLocaleLowerCase(), password);
    window.location.replace("/");
  };

  return (
    <form className="flex flex-col w-full" onSubmit={handleSubmit(onSubmit)}>
      {/* Nombre completo */}
      <div className="mb-5">
        <label htmlFor="fullName">Nombre Completo</label>
        <input
          className={clsx("w-full px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500 border-2": errors.email,
          })}
          {...register("fullName", {
            required: true,
          })}
          aria-invalid={errors.fullName ? "true" : "false"}
          type="text"
        />

        {errors.fullName && (
          <p className="text-red-500" role="alert">
            *Este campo es requerido
          </p>
        )}
      </div>

      {/* Email */}
      <div className="mb-5">
        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx("w-full px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500 border-2": errors.email,
          })}
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          aria-invalid={errors.email ? "true" : "false"}
          type="email"
        />

        {errors.email?.type == "required" && (
          <p className="text-red-500" role="alert">
            *Este campo es requerido
          </p>
        )}

        {errors.email?.type == "pattern" && (
          <p className="text-red-500" role="alert">
            *Email invalido
          </p>
        )}
      </div>

      {/* Contraseña */}
      <div className="mb-5">
        <label htmlFor="password">Contraseña</label>
        <input
          className={clsx("w-full  px-5 py-2 border bg-gray-200 rounded", {
            "border-red-500 border-2": errors.email,
          })}
          {...register("password", {
            required: true,
          })}
          type="password"
        />

        {errors.password?.type == "required" && (
          <p className="text-red-500" role="alert">
            *Este campo es requerido
          </p>
        )}
      </div>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <button className="btn-primary">Crear Cuenta</button>

      {/* divisor line */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <button type="submit" className="btn-secondary text-center">
        Ya tengo una cuenta
      </button>
    </form>
  );
}
