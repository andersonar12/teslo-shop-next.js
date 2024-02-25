"use client";
import { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

export default function QuantitySelector({ quantity }: { quantity: number }) {
  const [count, setCount] = useState(quantity);
  const onQuantityChange = (value: number) => {
    if (count + value < 1) return;
    setCount(count + value);
  };
  return (
    <div className="flex">
      <button>
        <IoRemoveCircleOutline onClick={() => onQuantityChange(-1)} size={30} />
      </button>
      <span className="w-20 mx-3 px-5 bg-gray-200 flex justify-center items-center rounded">
        {count}
      </span>
      <button>
        <IoAddCircleOutline onClick={() => onQuantityChange(1)} size={30} />
      </button>
    </div>
  );
}
