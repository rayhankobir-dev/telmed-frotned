import api from "@/api";
import React from "react";
import { Medicine } from "@/types";
import MedicineCard from "../medicine/medicine-card";

async function TopSelling() {
  const res = await api.get("/medicines?limit=4");
  const { medicines } = res.data;

  return (
    <section className="py-5">
      <h1 className="font-semibold text-2xl mb-6 opacity-80">
        Top Selling Medicines
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {medicines.map((medicine: Medicine) => (
          <MedicineCard key={medicine._id} medicine={medicine} />
        ))}
      </div>
    </section>
  );
}

export default TopSelling;
