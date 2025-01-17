import React from "react";
import { CustomersTable } from "./customers-table";
import api from "@/api";

async function AdminCustomers() {
  const res = await api.get("/users?role=USER");

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-semibold text-xl">Customers</h1>
        <p>All customers are listed here. Search by name</p>
      </div>

      <CustomersTable customers={res.data} />
    </div>
  );
}

export default AdminCustomers;
