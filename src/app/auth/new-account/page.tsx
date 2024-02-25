import { titleFont } from "@/config/fonts";
import Link from "next/link";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center ">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Registrarse</h1>

      <div className="flex flex-col w-full">
        <label htmlFor="fullname">Correo electrónico</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" id="fullname" type="text" />

        <label htmlFor="email">Correo electrónico</label>
        <input className="px-5 py-2 border bg-gray-200 rounded mb-5" id="email" type="email" />

        <label htmlFor="password">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          id="password"
          type="password"
        />

        <button className="btn-primary">Crear Cuenta</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ya tengo una cuenta
        </Link>
      </div>
    </div>
  );
}
