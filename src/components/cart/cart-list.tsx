/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, Trash2 } from "lucide-react";

function CartList() {
  const { cart } = useCartStore();

  return (
    <section className="flex-1 flex flex-col gap-6 overflow-y-auto px-3.5">
      {cart?.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </section>
  );
}

function CartItem({ item }: any) {
  const { removeFromCart, addToCart, decreaseQuantity } = useCartStore();

  const priceCalculator = (item: any) => {
    const price =
      item.medicine.price -
      (item.medicine.price * item.medicine.discountPercentage) / 100;
    return price * item.quantity;
  };

  return (
    <div className="flex items-center gap-3 group">
      <div className="relative w-16 h-16 flex items-center justify-center rounded-sm overflow-hidden bg-primary/10 border border-primary/10 group-hover:border-red-100">
        <img
          className="w-16 h-16 aspect-square object-cover object-center"
          src={item.medicine.image}
          alt={item.medicine.name}
          width={160}
          height={160}
          priority={true}
        />
        <button
          onClick={() => removeFromCart(item.id)}
          className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-rose-50 opacity-0 group-hover:opacity-100 duration-300"
        >
          <Trash2
            className="text-rose-500 opacity-0 group-hover:opacity-100 duration-500 ease-in-out"
            size={18}
          />
        </button>
      </div>

      <div className="flex-1">
        <Link href={""} className="font-semibold text-sm">
          {item.medicine.name}
        </Link>
        <p className="font-medium text-xs">
          {item.medicine.strength} - {item.medicine.dosageForm}
        </p>
        <p className="text-sm opacity-80">{item.medicine.generic}</p>
      </div>

      <div className="h-full flex flex-col justify-between items-end gap-2 pr-3">
        <div className="flex items-center gap-2">
          <p>৳{priceCalculator(item).toFixed(2)}</p>
        </div>

        <div className="h-8 flex items-center gap-2 border rounded-sm overflow-hidden">
          <button
            disabled={item.quantity === 1}
            onClick={() => decreaseQuantity(item.id)}
            className="w-8 h-full flex items-center justify-center"
          >
            <Minus size={16} />
          </button>

          <p>{item.quantity}</p>

          <button
            disabled={item.quantity === 50}
            onClick={() => addToCart(item)}
            className="w-8 h-full flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartList;
