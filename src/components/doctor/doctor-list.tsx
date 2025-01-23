import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Image from "next/image";
import DoctorCard from "./doctor-card";

function DoctorList({ doctors = [] }) {
  return (
    <section>
      <div className="flex justify-between items-center gap-2 px-1.5 py-1 pb-5">
        <h1 className="font-medium text-xl">Doctors</h1>
        <div className="inline-flex items-center gap-2 font-light text-sm">
          Sort by:
          <Select>
            <SelectTrigger className="h-10 w-[250px]">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="apple">Price: High to Low</SelectItem>
                <SelectItem value="banana">Price: Low to High</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {doctors.length === 0 && (
        <div className="flex flex-col justify-center items-center py-12 border border-dashed rounded-lg">
          <img
            className="max-w-[200px]"
            src="/images/empty-state.png"
            alt="Empty State"
            width={200}
            height={200}
          />
          <h1 className="font-semibold text-2xl text-primary mt-5">
            No Doctors Found
          </h1>
          <p className="max-w-sm text-center text-sm mt-2">
            Please make sure your doctor name correctly and explore more doctors
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-3 p-1">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}

export default DoctorList;
