import api from "@/api";
import { OrdersTable } from "./orders-table";

async function AdminOrders() {
  const res = await api.get("/orders/all?");
  console.log(res.data);
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-semibold text-xl">Orders</h1>
        <p>All orders are listed here. Search by name</p>
      </div>
      <OrdersTable orders={res.data} />
    </div>
  );
}

export default AdminOrders;
