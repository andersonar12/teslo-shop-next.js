import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";

export default function OrderStatus({ isPaid }: { isPaid: boolean }) {
  return (
    <div
      className={clsx(
        "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
        {
          "bg-red-500": !isPaid,
          "bg-green-700": isPaid,
        }
      )}
    >
      <IoCardOutline size={20} className="mr-2" />
      <span className="mx-2">{isPaid ? "Pagada" : "No Pagada"}</span>
    </div>
  );
}
