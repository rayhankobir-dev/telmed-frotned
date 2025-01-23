"use client";
import api from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Doctor } from "@/types";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  const { isAuthenticated, user } = useAuth();
  const handleBooking = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to book an appointment");
      redirect("/login");
    }

    try {
      const res = await api.post("/appointments/book", {
        doctorId: doctor._id,
        date: new Date(),
        userId: user?._id,
      });

      const { url } = res.data;
      window.location.href = url;
    } catch (error) {
      console.error("Error booking appointment:", error);
      toast.error("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-sm border border-primary/20 hover:border-primary/50 shadow hover:shadow-lg duration-300">
      <div className="max-h-[200px] w-full overflow-hidden">
        <Image
          className="h-full w-full object-cover object-center"
          src={doctor.image || "/images/demo-doctor.png"}
          width={300}
          height={300}
          alt={doctor.fullName}
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-800">{doctor.fullName}</h2>
      <p className="text-sm text-gray-600">{doctor.specialization}</p>
      <p className="text-sm text-gray-500">📍 {doctor.degrees}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700 text-sm">
          🩺 {doctor.experienceInYears} yrs exp
        </span>
      </div>

      <h2 className="font-semibold text-lg">৳{doctor.charge}</h2>

      {user?.role === "USER" && (
        <button
          className="mt-4 w-full py-2 bg-primary text-white font-medium rounded-md transition"
          onClick={handleBooking}
        >
          Book Appointment
        </button>
      )}
    </div>
  );
};

export default DoctorCard;
