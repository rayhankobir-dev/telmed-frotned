"use client";

import { useEffect, useState } from "react";
import Spinner from "../common/spinner";
import OrdersTable from "../order/order-table";
import api from "@/api";

export function Orders() {
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders");
        const { orders } = res.data;
        setOrders(orders);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (isLoading)
    return (
      <div className="py-12 flex items-center justify-center text-center">
        <Spinner />
      </div>
    );

  return (
    <section>
      <div className="border-b pb-2">
        <h2 className="text-2xl font-bold">Orders</h2>
        <p>Your order history and details go here.</p>
      </div>

      {orders.length === 0 && (
        <div className="py-12">
          <h1 className="text-xl text-center text-primary">No orders found</h1>
        </div>
      )}

      <div className="">
        <OrdersTable orders={orders} />
      </div>
    </section>
  );
}
