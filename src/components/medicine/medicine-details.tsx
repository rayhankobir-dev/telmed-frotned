/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { Medicine } from "@/types";
import MedicineCard from "./medicine-card";
import { useCartStore } from "@/store/cart";
import { Minus, Plus, ShoppingBag } from "lucide-react";

function MedicineDetails({ data }: any) {
  const { medicine, alternatives } = data;
  const calculateDiscounedPrice = (price = 0, discountedPercentage = 0) => {
    return price - (price * discountedPercentage) / 100;
  };

  const addToCart = useCartStore((state) => state.addToCart);
  const cart = useCartStore((state) => state.cart);

  return (
    <>
      <section className="grid grid-cols-2 gap-6">
        <div className="bg-white border rounded-lg overflow-hidden">
          <img
            className="w-full aspect-square object-cover object-center"
            src={medicine.image}
            alt={medicine.name}
            width={200}
            height={200}
          />
        </div>

        <div className="p-6 border rounded-lg">
          <h1 className="font-semibold">
            {medicine.name} <span>({medicine.strength})</span>
          </h1>
          <p className="font-medium ">{medicine.dosageForm}</p>
          <p className="pt-4 capitalize">{medicine.generic}</p>
          <p className="capitalize">{medicine.company}</p>

          <div className="py-2">
            <div className="space-x-3">
              <span className="line-through font-medium">
                Price: ৳{medicine.price}
              </span>
              <span className="font-semibold text-primary">
                {medicine.discountPercentage}% OFF
              </span>
            </div>
            <div className="font-medium">
              Discount Price:{" "}
              <span className="font-semibold">
                ৳
                {calculateDiscounedPrice(
                  medicine.price,
                  medicine.discountPercentage
                ).toFixed(2)}
                /{medicine.unit}
              </span>
            </div>
          </div>
          <div className="py-2">
            <div className="w-fit flex items-center gap-2 border rounded-sm">
              <button className="border-r h-10 w-10 flex items-center justify-center">
                <Minus size={18} />
              </button>
              <p className="w-12 flex items-center justify-center font-medium">
                {cart.find((item) => item.id === medicine._id)?.quantity || 0}
              </p>
              <button className="border-l h-10 w-10 flex items-center justify-center">
                <Plus size={18} />
              </button>
            </div>
          </div>
          <button
            onClick={() =>
              addToCart({ id: medicine._id, medicine, quantity: 1 })
            }
            className="mt-6 w-full flex items-center justify-center gap-2 px-14 py-2.5 text-white text-lg font-medium rounded-md transition bg-blue-600 hover:bg-blue-700"
          >
            <ShoppingBag size={18} /> Add To Cart
          </button>
        </div>
      </section>

      <section className="flex flex-col gap-3 py-6 px-2">
        <h1 className="text-xl font-semibold">Alternative Medicines</h1>

        <div className="grid grid-cols-4 gap-3">
          {alternatives.map((alternative: Medicine) => (
            <MedicineCard key={alternative._id} medicine={alternative} />
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-6 py-6 px-2">
        <h1 className="text-xl font-semibold">Medicine Overview</h1>

        <div>
          <h3 className="font-semibold">Description</h3>
          <p>{medicine.description}</p>
        </div>

        <div>
          <h3 className="font-semibold">Indication</h3>
          <p>{medicine.indication}</p>
        </div>

        <div>
          <h3 className="font-semibold">Side Effects</h3>
          <p>{medicine.sideEffects}</p>
        </div>

        <div>
          <h3 className="font-semibold">Dosage</h3>
          <p>{medicine.dosage}</p>
        </div>

        <div>
          <h3 className="font-semibold">Contraindications</h3>
          <p>{medicine.contraindications}</p>
        </div>

        <div>
          <h3 className="font-semibold">Precautions</h3>
          <p>{medicine.precautions}</p>
        </div>

        <div>
          <h3 className="font-semibold">Pharmachology</h3>
          <p>{medicine.pharmachology}</p>
        </div>

        <div>
          <h3 className="font-semibold">Storage</h3>
          <p>{medicine.storage}</p>
        </div>

        <div>
          <h3 className="font-semibold">Pregnancy</h3>
          <p>{medicine.pregnancy}</p>
        </div>

        <div>
          <h3 className="font-semibold">Disclaimer</h3>
          <p>{medicine.disclaimer}</p>
        </div>
      </section>
    </>
  );
}

export default MedicineDetails;
