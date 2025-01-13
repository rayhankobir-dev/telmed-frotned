/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from "next/navigation";
import DoctorList from "@/components/doctor/doctor-list";

async function Doctors({ searchParams }: { searchParams: any }) {
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

  const apiUrl = `http://localhost:4000/api/users?role=DOCTOR`;

  const response = await fetch(apiUrl, { cache: "no-store" });
  if (!response.ok) return notFound();

  const doctors = await response.json();
  return (
    <main>
      <DoctorList doctors={doctors} />
    </main>
  );
}

export default Doctors;
