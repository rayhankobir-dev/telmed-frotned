/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Fragment, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function OrdersTable({ orders = [] }) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

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

  const getStatusColor = (status: any) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "paid":
        return "bg-blue-500";
      case "delivered":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getPaymentStatusColor = (paymentStatus: any) => {
    switch (paymentStatus) {
      case "Paid":
        return "bg-green-500";
      case "Unpaid":
        return "bg-red-500";
      case "Refunded":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Table className="bg-primary/5 rounded-md mt-3 overflow-hidden">
      <TableHeader className="bg-primary/20 text-white">
        <TableRow>
          <TableHead className="font-semibold h-14 text-primary w-10"></TableHead>
          <TableHead className="font-semibold h-14 text-primary">
            Transaction ID
          </TableHead>
          <TableHead className="font-semibold h-14 text-primary">
            Total Price
          </TableHead>
          <TableHead className="font-semibold h-14 text-primary">
            Total Discount
          </TableHead>
          <TableHead className="font-semibold h-14 text-primary">
            Status
          </TableHead>
          <TableHead className="font-semibold h-14 text-primary">
            Payment Status
          </TableHead>
          <TableHead className="font-semibold h-14 text-primary">
            Order Date
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: any) => (
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
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>${order.totalDiscount.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  className={cn("capitalize", getStatusColor(order.status))}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  className={cn(
                    "capitalize",
                    getPaymentStatusColor(order.paymentStatus)
                  )}
                >
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
                      {order.medicines.map(({ medicine, quantity }: any) => (
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
                          <TableCell>{medicine.generic}</TableCell>
                          <TableCell>{medicine.company}</TableCell>
                          <TableCell>{quantity}</TableCell>
                          <TableCell>${medicine.price.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))}
      </TableBody>
    </Table>
  );
}
