/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Edit, Trash2, ChevronLeft, ChevronRight, Plus } from "lucide-react";
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
import Link from "next/link";

export function DoctorsTable({ doctors }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 5;

  const filteredDoctors = doctors.filter((doctor: any) =>
    doctor.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDoctors.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleDelete = async (id: number) => {
    console.log(id);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search doctors by full name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        <Button asChild>
          <Link className="flex items-center gap-1" href="/admin/doctors/new">
            <Plus size={18} />
            Add Doctor
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Charge</TableHead>
              <TableHead>Date of Birth</TableHead>
              <TableHead>Degrees</TableHead>
              <TableHead>Education</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentDoctors.length === 0 && (
              <TableRow className="py-4 text-center w-full">
                <TableCell className="py-8" colSpan={8}>
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
            {currentDoctors.map((doctor: any) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <Image
                    src={doctor.image || "/placeholder.svg"}
                    alt={`${doctor.fullName}'s profile`}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </TableCell>
                <TableCell>{doctor.title}</TableCell>
                <TableCell className="font-medium">{doctor.fullName}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>{doctor.phone}</TableCell>
                <TableCell>৳{doctor.charge}</TableCell>
                <TableCell>{doctor.dateOfBirth}</TableCell>
                <TableCell>{doctor.degrees}</TableCell>
                <TableCell>{doctor.education}</TableCell>
                <TableCell>{doctor.experienceInYears} years</TableCell>
                <TableCell>{doctor.specialization}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" title="Edit" asChild>
                      <Link href={`/admin/doctors/${doctor._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDelete(doctor._id)}
                      variant="outline"
                      size="icon"
                      title="Delete"
                    >
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
