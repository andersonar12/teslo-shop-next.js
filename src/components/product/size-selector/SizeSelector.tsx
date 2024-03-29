import { Size } from "@/interfaces/product.interface";
import clsx from "clsx";

export default function SizeSelector({
  selectedSize,
  availableSizes,
  onSizeChanged,
}: {
  selectedSize?: Size;
  availableSizes: Size[]; //['XS', 'S', 'M', 'L', 'XL']
  onSizeChanged: (size: Size) => void;
}) {
  return (
    <div className="my-5 ">
      <h3 className="font-bold mb-4">Tallas disponibles</h3>
      <div className="flex">
        {availableSizes.map((size) => (
          <button
            onClick={() => onSizeChanged(size)}
            key={size}
            className={clsx("mx-2 hover:underline font-semibold text-lg", {
              underline: size === selectedSize,
            })}
          >
            {size}
          </button> // <button className="m-1 p-2 border"></button>
        ))}
      </div>
    </div>
  );
}
