"use client";
import Link from "next/link";
import Image from "next/image";
import { Medicine } from "@/types";
import { ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart";

function MedicineCard({ medicine }: { medicine: Medicine }) {
  const discountedPrice = medicine.mrp - medicine.discount;
  const discountedPercentage = (medicine.discount / medicine.mrp) * 100;
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="relative flex flex-col justify-between border border-primary/20 hover:border-primary/50 shadow hover:shadow-lg rounded-2xl overflow-hidden cursor-pointer duration-300">
      <div className="absolute top-0 left-3 z-10 p-1 bg-primary font-semibold text-white text-[10px] rounded-b">
        <span>{discountedPercentage.toFixed(0)}%</span>
        <p>OFF</p>
      </div>

      <Link
        href={`/medicines/${medicine.name}`}
        className="max-h-[180px] overflow-hidden"
      >
        <Image
          className="w-full max-w-[200px] mx-auto aspect-square object-cover object-center scale-110 hover:scale-125 transition-all duration-300"
          src={medicine.image}
          alt={medicine.name}
          width={200}
          height={200}
        />
      </Link>

      <div className="flex-1 flex flex-col justify-between p-3">
        <div>
          <Link
            href={`/medicines/${medicine.name}`}
            className="font-semibold text-sm hover:text-primary"
          >
            {medicine.name} ({medicine.dosageForm}){" "}
            <span className="opacity-70">{medicine.strength}</span>
          </Link>
          <p className="text-sm opacity-70">{medicine.generic}</p>
          <p className="text-sm opacity-70">{medicine.company}</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <div className="flex flex-col">
            <p className="inline-flex items-center font-light text-sm line-through">
              ৳{medicine.mrp}
            </p>

            <p className="inline-flex items-center font-semibold">
              ৳{discountedPrice}
            </p>
          </div>

          <button
            onClick={() =>
              addToCart({ id: medicine.name, medicine, quantity: 1 })
            }
            className="h-10 w-fit flex items-center gap-1.5 px-3 bg-primary/10 hover:bg-primary/90 border border-primary/50 font-medium text-primary hover:text-white rounded-md duration-300"
          >
            <ShoppingBag size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

export default MedicineCard;
