import React from "react";
import AddMedicine from "../new/page";
import api from "@/api";

async function EditMedicine({ params }: { params: { slug: string } }) {
  console.log(params);
  const res = await api.get(`/medicines/678539559fbd976066ff8692`);
  const { medicine } = res.data;

  return (
    <div>
      <AddMedicine initial={medicine} />
    </div>
  );
}

export default EditMedicine;
