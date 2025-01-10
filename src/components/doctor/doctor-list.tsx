import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DoctorCard from "./doctor-card";
import doctors from "@/constants/doctors";

function DoctorList() {
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

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 p-1">
        {doctors.map((doctor, index) => (
          <DoctorCard key={index} doctor={doctor} />
        ))}
      </div>
    </section>
  );
}

export default DoctorList;
