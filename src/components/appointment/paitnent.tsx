/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const AppointmentCard = ({ appointment }: any) => {
  const { doctor, date }: any = appointment;
  const appointmentDate = new Date(date);

  return (
    <Card className="mb-4">
      <CardContent className="flex items-start p-4">
        <img
          src={doctor.image || "/images/demo-doctor.png"}
          alt={doctor.fullName}
          width={80}
          height={80}
          className="rounded-full mr-4 aspect-square object-cover object-center"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold">{doctor.fullName}</h3>
          <p className="text-sm text-gray-600">{doctor.specialization}</p>
          <p className="text-sm text-gray-600">
            {doctor.experienceInYears} years of experience
          </p>
          <p className="text-sm text-gray-600">{doctor.email}</p>
          <h1 className="pt-2 font-semibold">৳{doctor.charge}</h1>

          <div className="flex flex-wrap items-center mt-2 gap-y-2">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {appointmentDate.toLocaleDateString()}
            </span>
            <Clock className="w-4 h-4 ml-4 mr-1" />
            <span className="text-sm">
              {appointmentDate.toLocaleTimeString()}
            </span>

            <Badge className="capitalize ml-2">{appointment.status}</Badge>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {appointment.paymentStatus === "paid" && (
            <Button className="ml-4">
              <Link href={`/meeting?callId=${appointment.meetingId}`}>
                Join
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function PaientAppointmentList({ appointments = [] }) {
  const [filter, setFilter] = useState<"upcoming" | "past">("upcoming");

  return (
    <div className="flex flex-col justify-start">
      <ToggleGroup
        type="single"
        value={filter}
        onValueChange={(value) => setFilter(value as "upcoming" | "past")}
        className="w-fit mb-4"
      >
        <ToggleGroupItem value="upcoming">Upcoming</ToggleGroupItem>
        <ToggleGroupItem value="past">Past</ToggleGroupItem>
      </ToggleGroup>

      <div className="grid xl:grid-cols-2 gap-2">
        {appointments.map((appointment: any) => (
          <AppointmentCard key={appointment._id} appointment={appointment} />
        ))}
      </div>
    </div>
  );
}
