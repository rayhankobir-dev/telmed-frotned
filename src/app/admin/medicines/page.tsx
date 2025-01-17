import React from "react";
import api from "@/api";
import { MedicinesTable } from "./medicines-table";

async function AdminMedicines() {
  const res = await api.get("/medicines");
  const { medicines } = res.data;
  console.log(medicines);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-semibold text-xl">Medicines</h1>
        <p>All medicines are listed here. Search by name</p>
      </div>

      <MedicinesTable medicines={medicines} />
    </div>
  );
}

export default AdminMedicines;
