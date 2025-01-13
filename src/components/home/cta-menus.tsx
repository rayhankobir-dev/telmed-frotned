/* eslint-disable @next/next/no-img-element */
"use client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { UploadPrescription } from "../shared/upload-prescription";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

function CtaMenuSection() {
  const { isAuthenticated } = useAuth();

  const handlePrescriptionUpload = () => {
    if (!isAuthenticated) {
      toast.error("Please login first");
      redirect("/login");
    }
  };
  return (
    <section className="grid grid-cols-2 md:grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-3 mt-5">
      <UploadPrescription>
        <Card
          onClick={handlePrescriptionUpload}
          className="flex flex-col justify-between cursor-pointer hover:shadow-md border border-primary/10 bg-green-700/10"
        >
          <CardHeader className="p-2.5 pt-4">
            <img
              className="w-9 h-auto mx-auto"
              src="/icons/prescription.png"
              alt="Upload Prescriptions"
            />
          </CardHeader>
          <CardContent className="p-2.5 text-center">
            <h3 className="font-medium text-lg">Upload Prescriptions</h3>
            <p className="font-light text-sm">
              Upload your prescriptions here and store as digital.
            </p>
          </CardContent>
        </Card>
      </UploadPrescription>

      <Link
        href="/dashboard/profile"
        className="flex flex-col justify-between cursor-pointer hover:shadow-md border border-primary/10 bg-orange-700/10"
      >
        <CardHeader className="p-2.5 pt-4">
          <img
            className="w-9 h-auto mx-auto"
            src="/icons/health-report.png"
            alt="Health Report"
          />
        </CardHeader>
        <CardContent className="p-2.5 text-center">
          <h3 className="font-medium text-lg">Health Report</h3>
          <p className="font-light text-sm">Get your health report here.</p>
        </CardContent>
      </Link>

      <Link
        href="/doctors"
        className="flex flex-col justify-between cursor-pointer hover:shadow-md border border-primary/10 bg-primary/10"
      >
        <CardHeader className="p-2.5 pt-4">
          <img
            className="w-9 h-auto mx-auto"
            src="/icons/doctor.png"
            alt="Book Appointment"
          />
        </CardHeader>
        <CardContent className="p-2.5 text-center">
          <h3 className="font-medium text-lg">Book Appointment</h3>
          <p className="font-light text-sm">Book your appointment here.</p>
        </CardContent>
      </Link>

      <Link
        href="/dashboard/help"
        className="flex flex-col justify-between cursor-pointer hover:shadow-md border border-green-500/10 bg-green-700/10"
      >
        <CardHeader className="p-2.5 pt-4">
          <img
            className="w-9 h-auto mx-auto"
            src="/icons/doctor.png"
            alt="Get Help"
          />
        </CardHeader>
        <CardContent className="p-2.5 text-center">
          <h3 className="font-medium text-lg">Get Help</h3>
          <p className="font-light text-sm">Get your help here.</p>
        </CardContent>
      </Link>
    </section>
  );
}

export default CtaMenuSection;
