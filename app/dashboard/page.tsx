import DashboardCard from "@/Components/DashboardCard";
import Overview from "@/Components/Overview";
import { DataTable } from "@/Components/DataTable";
import { columns } from "./column";
import { Settings, DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Transaction } from "@/types/analytics";

export default function DashboardPage() {

  const stats = [
    { title: "Revenue", value: "$45,231.89", icon: DollarSign, trend: { value: 20.1, direction: "up" as const } },
    { title: "Subscriptions", value: "+2350", icon: Users, trend: { value: 180.1, direction: "up" as const } },
    { title: "Sales", value: "+12,234", icon: CreditCard, trend: { value: 19, direction: "up" as const } },
    { title: "Active Now", value: "+573", icon: Activity, trend: { value: 201, direction: "up" as const } }
  ];

  const transactions: Transaction[] = [
    {
      id: "1",
      user: { name: "Liam Johnson", email: "liam@example.com" },
      amount: 250.00,
      status: "success",
      date: "2024-01-02",
    },
    {
      id: "2",
      user: { name: "Olivia Smith", email: "olivia@example.com" },
      amount: 150.00,
      status: "processing",
      date: "2024-01-02",
    },
    {
      id: "3",
      user: { name: "Noah Williams", email: "noah@example.com" },
      amount: 350.00,
      status: "success",
      date: "2024-01-03",
    },
    {
      id: "4",
      user: { name: "Emma Brown", email: "emma@example.com" },
      amount: 450.00,
      status: "failed",
      date: "2024-01-04",
    },
    {
      id: "5",
      user: { name: "James Jones", email: "james@example.com" },
      amount: 550.00,
      status: "success",
      date: "2024-01-05",
    },
    {
      id: "6",
      user: {name: "Vivek Kumar", email: "vivek@gmail.com"},
      amount: 600.00,
      status: "success",
      date: "2026-05-02"
    }
  ];

  return (
    <div className="flex flex-col gap-5 w-full"> 
      {/* Row 1: Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <DashboardCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
          />
        ))}
      </div>

      {/* Row 2: Chart & Table */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Left: Overview Chart (4 cols) */}
        <div className="col-span-4 rounded-xl border bg-gray-800 shadow-sm p-4 pl-2">
          <h2 className="text-white mb-4 text-lg font-semibold px-2">Overview</h2>
          <Overview />
        </div>

        {/* Right: Recent Sales Table (3 cols) */}
        <div className="col-span-3 rounded-xl border bg-gray-800 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b">
            <h2 className="font-semibold text-gray-800">Recent Sales</h2>
            <p className="text-sm text-gray-500">You made 265 sales this month.</p>
          </div>
          <div className="p-0">
             {/* The Reusable Table Component */}
            <DataTable columns={columns} data={transactions} />
          </div>
        </div>

      </div>
    </div>
  );
}