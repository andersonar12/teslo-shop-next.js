"use client";

import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export default function QuantitySelector({
  quantity,
  onQuantityChanged,
}: {
  quantity: number;
  onQuantityChanged: (value: number) => void;
}) {
  // const [count, setCount] = useState(quantity);
  const onQuantityChange = (value: number) => {
    if (quantity + value < 1) return;
    onQuantityChanged(quantity + value);
  };
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline onClick={() => onQuantityChange(-1)} size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 flex justify-center items-center rounded">
        {quantity}
      </span>
      <button>
        <IoAddCircleOutline onClick={() => onQuantityChange(1)} size={30} />
      </button>
    </div>
  );
}
