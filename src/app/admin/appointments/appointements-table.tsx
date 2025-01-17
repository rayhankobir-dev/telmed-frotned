"use client";

import { useState } from "react";
import { Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Mock data for appointments
const appointments = [
  {
    id: 1,
    patient: {
      fullName: "John Doe",
      email: "john.doe@example.com",
      dateOfBirth: "1990-05-15",
      phone: "+1 (555) 123-4567",
    },
    doctor: {
      fullName: "Dr. Smith",
      specialization: "Cardiology",
      experienceInYears: 10,
      charge: "$100",
    },
    transactionId: "TX123456",
    paymentStatus: "Paid",
    price: "$100",
    status: "Confirmed",
    date: "2024-01-20",
    createdAt: "2024-01-10",
  },
  // More appointments can be added here
];

export function AppointmentsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.status.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = filteredAppointments.slice(startIndex, endIndex);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <div className="w-full">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter by status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>DOB</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Charge</TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentAppointments.length === 0 && (
              <TableRow className="py-4 text-center w-full">
                <TableCell className="py-8" colSpan={8}>
                  No customers found.
                </TableCell>
              </TableRow>
            )}
            {currentAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>{appointment.patient.fullName}</TableCell>
                <TableCell>{appointment.patient.email}</TableCell>
                <TableCell>{appointment.patient.dateOfBirth}</TableCell>
                <TableCell>{appointment.patient.phone}</TableCell>
                <TableCell>{appointment.doctor.fullName}</TableCell>
                <TableCell>{appointment.doctor.specialization}</TableCell>
                <TableCell>
                  {appointment.doctor.experienceInYears} years
                </TableCell>
                <TableCell>{appointment.doctor.charge}</TableCell>
                <TableCell>{appointment.transactionId}</TableCell>
                <TableCell>{appointment.paymentStatus}</TableCell>
                <TableCell>{appointment.price}</TableCell>
                <TableCell>{appointment.status}</TableCell>
                <TableCell>{appointment.date}</TableCell>
                <TableCell>{appointment.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" title="Delete">
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
