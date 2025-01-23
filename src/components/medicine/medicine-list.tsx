import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import MedicineCard from "@/components/medicine/medicine-card";

function MedicineList({ isTitleShow = true, medicines = [] }) {
  return (
    <section>
      {isTitleShow && (
        <div className="flex justify-between items-center gap-2 px-1.5 py-1 pb-5">
          <h1 className="font-medium text-xl">Medicines</h1>
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
      )}
      {medicines.length === 0 && (
        <div className="flex flex-col justify-center items-center py-12 border border-dashed rounded-lg">
          <img
            className="max-w-[200px]"
            src="/images/empty-state.png"
            alt="Empty State"
            width={200}
            height={200}
          />
          <h1 className="font-semibold text-2xl text-primary mt-5">
            No Medicines Found
          </h1>
          <p className="max-w-sm text-center text-sm mt-2">
            Please make sure your medicine name correctly and explore more
            medicines
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 px-1">
        {medicines.map((medicine, index) => (
          <MedicineCard key={index} medicine={medicine} />
        ))}
      </div>
    </section>
  );
}

export default MedicineList;
