import React from "react";
import { DoctorsTable } from "./doctor-table";
import api from "@/api";

async function AdminDcotors() {
  const res = await api.get("/users?role=DOCTOR");
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-semibold text-xl">Doctors</h1>
        <p>All doctors are listed here. Search by name</p>
      </div>
      <DoctorsTable doctors={res.data} />
    </div>
  );
}

export default AdminDcotors;
