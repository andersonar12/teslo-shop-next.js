import { titleFont } from "@/config/fonts";
import Link from "next/link";
import NewAccountForm from "./ui/NewAccountForm";

export default function NewAccountPage() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center ">
      <h1 className={`${titleFont.className} text-4xl mb-5`}>Registrarse</h1>

      <NewAccountForm />
    </div>
  );
}
