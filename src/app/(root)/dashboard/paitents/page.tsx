/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import api from "@/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function PatientCard({ data }: any) {
  return (
    <Card className="w-[300px]">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage
              src={data.patient?.image}
              alt={data.patient?.fullName}
            />
            <AvatarFallback>
              {data.patient?.fullName?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1 text-center">
            <h3 className="font-semibold text-lg">{data.patient?.fullName}</h3>
            <p className="text-sm text-muted-foreground">
              {data.patient?.email}
            </p>
            <p className="text-sm text-muted-foreground">
              {data.patient?.mobile}
            </p>
            <p>{data.date}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button>
          <Link href={`/meeting?callId=${data.meetingId}`}>Start Call</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function Patients() {
  const [loading, setLoading] = useState(true);
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/appointments/paitents");
        setPatients(res.data.paitents);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {patients.length === 0 ? (
        <div>No patients found</div>
      ) : (
        <div className="container mx-auto py-8">
          <h1 className="text-2xl font-bold mb-6">Patient List</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {patients.map((patient: any) => (
              <PatientCard key={patient._id} data={patient} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Patients;
