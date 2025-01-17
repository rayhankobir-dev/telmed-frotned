import React from "react";
import { AppointmentsTable } from "./appointements-table";

function AdminAppointments() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-semibold text-xl">Appointments</h1>
        <p>All appointments are listed here.</p>
      </div>
      <AppointmentsTable />
    </div>
  );
}

export default AdminAppointments;
