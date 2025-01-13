/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Calendar } from "lucide-react";

function PrescriptionCard({ prescription }: any) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{prescription.title}</CardTitle>
        <CardDescription>{prescription.description}</CardDescription>
        <p className="inline-flex items-center gap-1.5 text-sm">
          <Calendar size={14} /> {prescription.createdAt}
        </p>
      </CardHeader>
      <CardFooter>
        <ol className="list-inside list-decimal">
          {prescription.medicines.map((medicine: any) => (
            <li key={medicine}>{medicine}</li>
          ))}
        </ol>
      </CardFooter>
    </Card>
  );
}

export default PrescriptionCard;
