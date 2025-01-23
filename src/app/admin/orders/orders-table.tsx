/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, Fragment } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

export function OrdersTable({ orders }: any) {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 10;

  const filteredOrders = orders.filter((order: any) =>
    order.transactionId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  const toggleRow = (transactionId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(transactionId)) {
        newSet.delete(transactionId);
      } else {
        newSet.add(transactionId);
      }
      return newSet;
    });
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Filter by status..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Total Discount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Order Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentOrders.length === 0 && (
              <TableRow className="py-4 text-center w-full">
                <TableCell className="py-8" colSpan={8}>
                  No orders found.
                </TableCell>
              </TableRow>
            )}

            {currentOrders.map((order: any) => (
              <Fragment key={order.transactionId}>
                <TableRow>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(order.transactionId)}
                    >
                      {expandedRows.has(order.transactionId) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell>{order.transactionId}</TableCell>
                  <TableCell>৳{order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>৳{order.totalDiscount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={cn("capitalize")}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("capitalize")}>
                      {order.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.orderDate}</TableCell>
                </TableRow>
                {expandedRows.has(order.transactionId) && (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Generic</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {order.medicines.map(
                            ({ medicine, quantity }: any) => (
                              <TableRow key={medicine._id}>
                                <TableCell>
                                  <img
                                    className="rounded-md"
                                    src={medicine.image}
                                    alt={medicine.name}
                                    width={50}
                                    height={50}
                                  />
                                </TableCell>
                                <TableCell>
                                  {medicine.name} ({medicine.strength}){" "}
                                  {medicine.dosageForm}
                                </TableCell>
                                <TableCell>{medicine.generic || "-"}</TableCell>
                                <TableCell>{medicine.company || "-"}</TableCell>
                                <TableCell>{quantity || "-"}</TableCell>
                                <TableCell>
                                  ৳{medicine.price.toFixed(2)}
                                </TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
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
