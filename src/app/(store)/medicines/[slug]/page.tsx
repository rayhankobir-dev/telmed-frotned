import axios from "axios";
import MedicineDetails from "@/components/medicine/medicine-details";

async function Medicine({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const data = await axios.get(`http://localhost:4000/api/medicines/${slug}`);

  return (
    <main>
      <MedicineDetails data={data.data} />
    </main>
  );
}

export default Medicine;
