/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import api from "@/api";
import toast from "react-hot-toast";

export function MedicinesTable({ medicines = [] }: any) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 6;
  const filteredMedicines = medicines.filter((medicine: any) =>
    medicine.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentMedicines = filteredMedicines.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/medicines/${id}`);
      toast.success("Medicine deleted successfully");
      setSearchQuery("");
    } catch (error) {
      toast.error("Failed to delete medicine");
      console.error(error);
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between gap-4 mb-4">
        <Input
          type="text"
          placeholder="Search medicines by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        <Button>
          <Link className="flex items-center gap-1" href="/admin/medicines/new">
            <Plus size={18} />
            Add Medicine
          </Link>
        </Button>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Strength</TableHead>
              <TableHead>Dosage Form</TableHead>
              <TableHead>Generic</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentMedicines.length === 0 && (
              <TableRow className="py-4 text-center w-full">
                <TableCell className="py-8" colSpan={8}>
                  No medicines found.
                </TableCell>
              </TableRow>
            )}
            {currentMedicines.map((medicine: any) => (
              <TableRow key={medicine.id}>
                <TableCell>
                  <Image
                    src={medicine.image || "/placeholder.svg"}
                    alt={medicine.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                </TableCell>
                <TableCell className="font-medium">{medicine.name}</TableCell>
                <TableCell>{medicine.strength}</TableCell>
                <TableCell>{medicine.dosageForm}</TableCell>
                <TableCell>{medicine.generic}</TableCell>
                <TableCell>{medicine.company}</TableCell>
                <TableCell>৳{medicine.price.toFixed(2)}</TableCell>
                <TableCell>{medicine.discountPercentage}%</TableCell>
                <TableCell>{medicine.unit}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" size="icon" title="View" asChild>
                      <Link href={`/medicines/${medicine._id}`}>
                        <Eye className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="icon" title="Edit" asChild>
                      <Link href={`/admin/medicines/${medicine._id}`}>
                        <Edit className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      onClick={() => handleDelete(medicine._id)}
                      variant="outline"
                      size="icon"
                      title="Delete"
                    >
                      <Trash2 className="h-4 w-4" />
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
