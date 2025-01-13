/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import api from "@/api";
import PrescriptionCard from "@/components/shared/prescription";
import Spinner from "@/components/common/spinner";

function Prescriptions() {
  const [loading, setLoading] = useState(true);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const res = await api.get("/prescriptions");
        setPrescriptions(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  return (
    <section>
      <h1 className="font-semibold text-2xl">Prescriptions</h1>
      <p>Your prescriptions go here.</p>

      {prescriptions.length === 0 && (
        <div className="flex flex-col justify-center items-center py-12 rounded-lg">
          <img
            className="max-w-[200px] rounded-lg"
            src="/images/empty-state.png"
            alt="Empty State"
            width={200}
            height={200}
          />
          <p className="mt-4 text-gray-500">No prescriptions found</p>
        </div>
      )}

      <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5">
        {prescriptions.map((prescription: any) => (
          <PrescriptionCard key={prescription.id} prescription={prescription} />
        ))}
      </div>
    </section>
  );
}

export default Prescriptions;
