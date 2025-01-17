import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderChart } from "./order-chart";
import api from "@/api";

export default async function Dashboard() {
  const res = await api.get("/orders/analytics");
  const { stats } = res.data;
  const chartData = [
    {
      name: "Appointment",
      visitors: stats?.totalAppointmentValue[0]?.totalPrice,
      fill: "var(--color-chrome)",
    },
    {
      name: "Medicine",
      visitors: stats?.totalOrderValue[0]?.totalPrice,
      fill: "var(--color-safari)",
    },
  ];

  return (
    <div className="">
      <h1 className="text-xl font-semibold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          title="Total Orders"
          value={stats.totalOrders}
          subValue={`৳${stats?.totalOrderValue[0]?.totalPrice}`}
        />
        <StatCard
          title="Total Appointments"
          value={stats.totalAppointments}
          subValue={`৳${stats?.totalAppointmentValue[0]?.totalPrice}`}
        />
        <StatCard title="Total Users" value={stats.totalUsers} />
        <StatCard title="Total Doctors" value={stats.totalDoctors} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Orders breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderChart chartData={chartData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subValue,
}: {
  title: string;
  value: string;
  subValue?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p>{subValue}</p>
      </CardContent>
    </Card>
  );
}
