import { titleFont } from "@/config/fonts";
import Link from "next/link";
import Image from "next/image";

export default function PageNotFound() {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h1 className={titleFont.className + " text-9xl antialiased"}>404</h1>
        <h2 className="text-xl font-semibold">Whoops!, pagina no encontrada</h2>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link
            href="/"
            className="font-normal transition-all rounded bg-blue-600 hover:bg-blue-700 text-white px-2"
          >
            Inicio
          </Link>
        </p>
      </div>

      <div className="px-5 mx-5">
        <Image
          src="/images/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
}
