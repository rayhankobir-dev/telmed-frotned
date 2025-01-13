"use client";
import { useEffect, useState } from "react";
import PaientAppointmentList from "../appointment/paitnent";
import api from "@/api";
import Spinner from "../common/spinner";

export function Appointments() {
  const [isLoading, setIsLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await api.get("/appointments/my");
        setAppointments(res.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching appointments:", error);
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (isLoading)
    return (
      <div className="py-12 flex items-center justify-center text-center">
        <Spinner />
      </div>
    );

  return (
    <section className="flex flex-col gap-6">
      <div className="border-b pb-2">
        <h2 className="text-2xl font-bold">Appointments</h2>
        <p>Your upcoming and past appointments go here.</p>
      </div>

      <PaientAppointmentList appointments={appointments} />
    </section>
  );
}
