import React from "react";

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  email: string;
  phone: string;
  location: string;
  experience: number;
  rating: number;
  available: boolean;
}

const DoctorCard: React.FC<{ doctor: Doctor }> = ({ doctor }) => {
  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-sm border border-primary/20 hover:border-primary/50 shadow hover:shadow-lg duration-300">
      <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
      <p className="text-sm text-gray-600">{doctor.specialty}</p>
      <p className="text-sm text-gray-500">📍 {doctor.location}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-700 text-sm">
          🩺 {doctor.experience} yrs exp
        </span>
        <span className="text-yellow-500 font-semibold">
          ⭐ {doctor.rating}
        </span>
      </div>
      <div
        className={`mt-2 px-2 py-1 text-sm font-semibold rounded-md inline-block ${
          doctor.available
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-600"
        }`}
      >
        {doctor.available ? "Available" : "Unavailable"}
      </div>

      <button
        className={`mt-4 w-full py-2 text-white font-semibold rounded-md transition ${
          doctor.available
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        disabled={!doctor.available}
      >
        Book Appointment
      </button>
    </div>
  );
};

export default DoctorCard;
