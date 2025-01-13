import MedicineList from "@/components/medicine/medicine-list";
import { notFound } from "next/navigation";

interface MedicinesProps {
  searchParams?: Record<string, string | string[] | undefined>;
}

async function Medicines({ searchParams }: MedicinesProps) {
  const params = new URLSearchParams();
  const { ...searchKeys } = await searchParams;

  if (searchKeys) {
    Object.entries(searchKeys).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (typeof value === "string") {
        params.append(key, value);
      }
    });
  }

  const apiUrl = `http://localhost:4000/api/medicines?${params.toString()}`;

  const response = await fetch(apiUrl, { cache: "no-store" }); // Ensure fresh data
  if (!response.ok) return notFound();

  const { medicines } = await response.json();

  return (
    <main>
      <MedicineList medicines={medicines} />
    </main>
  );
}

export default Medicines;
