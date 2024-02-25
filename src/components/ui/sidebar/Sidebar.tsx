"use client";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import Link from "next/link";
import { useUiStore } from "@/store/ui/ui-store";
import clsx from "clsx";

const navItems = [
  {
    name: "Perfil",
    href: "/",
    icon: <IoPersonOutline size={30} />,
  },

  {
    name: "Ordenes",
    href: "/orders",
    icon: <IoTicketOutline size={30} />,
  },

  {
    name: "Ingresar",
    href: "/",
    icon: <IoLogInOutline size={30} />,
  },

  {
    name: "Salir",
    href: "/",
    icon: <IoLogOutOutline size={30} />,
  },
];

const navItems2 = [
  {
    name: "Productos",
    href: "/",
    icon: <IoShirtOutline size={30} />,
  },
  {
    name: "Ordenes",
    href: "/",
    icon: <IoTicketOutline size={30} />,
  },
  {
    name: "Usuarios",
    href: "/",
    icon: <IoPeopleOutline size={30} />,
  },
];

export default function Sidebar() {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);
  return (
    <div>
      {isSideMenuOpen && (
        <>
          {/* Background Black */}
          <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30" />
        </>
      )}

      {isSideMenuOpen && (
        <>
          {/* Blur */}
          <div
            onClick={() => closeSideMenu()}
            className="fixed top-0 left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          />
        </>
      )}

      {/* Navbar */}
      <nav
        className={clsx(
          "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
          { "translate-x-full": !isSideMenuOpen }
        )}
      >
        <IoCloseOutline
          size={50}
          className="absolute top-5 right-5 cursor-pointer"
          onClick={() => closeSideMenu()}
        />

        {/* Input */}
        <div className="relative mt-14">
          <IoSearchOutline size={20} className="absolute top-2 left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full bg-gray-50 rounded pl-10 py-1 pr-0 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Menu */}

        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            {item.icon}
            <span className="ml-3 text-xl">{item.name}</span>
          </Link>
        ))}

        {/* Line Separator */}
        <div className="w-full h-px bg-gray-200 my-10" />
        {navItems2.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all"
          >
            {item.icon}
            <span className="ml-3 text-xl">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
