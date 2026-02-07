import DashboardCard from "@/Components/DashboardCard";
import Overview from "@/Components/Overview";
import { DataTable } from "@/Components/DataTable";
import { columns } from "./column";
import { Settings, DollarSign, Users, CreditCard, Activity } from "lucide-react";
import { Transaction } from "@/types/analytics";
import { supabase } from "@/lib/supabase";
import AddTransaction from "@/Components/AddTransaction";

export default async function DashboardPage() {

  const {data: transactions, error} = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', {ascending: false});

  if(error){
    console.log('Error fetching transactions', error)
  }
  
  // Calculate real metrics
  const safeTransactions = transactions || [];

  // Revenue: Sum of successful transactions
  const totalRevenue = safeTransactions.reduce((acc, curr) => {
    return curr.status === "success" ? acc + curr.amount : acc;
  }, 0);

  // sales count
  const salesCount = safeTransactions.filter(t => t.status === 'success').length;

  // pending orders
  const pendingOrder = safeTransactions.filter(t => 
    t.status === "pending" || t.status === "processing").length

  // average order value
  const avgOrderValue = salesCount > 0 ? totalRevenue / salesCount : 0;

  const stats = [
    {
      title: "Total Revenue",
      value: new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(totalRevenue),
      icon: DollarSign,
      trend: {value: 12, direction: "up" as const}
    },
    {
      title: "Successful Sales",
      value: `+${salesCount}`,
      icon: CreditCard,
      trend: {value: 4, direction: "up" as const}
    },
    {
      title: "Pending Orders",
      value: `${pendingOrder}`,
      icon: Activity,
      trend: {value: 2, direction: "down" as const}
    },
    {
      title: "Avg. Order Value",
      value: `${avgOrderValue}`,
      icon: Users,
      trend: {value: 0, direction: "up" as const}
    }
  ]

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
        <div className="col-span-3 rounded-xl border bg-gray-800 shadow-sm md:overflow-hidden">
          <div className="p-4 border-b">
            <AddTransaction/>
            <h2 className="font-semibold mt-3">Recent Sales</h2>
            <p className="text-sm text-gray-500">You made 265 sales this month.</p>
          </div>
          <div className="p-0">
             {/* The Reusable Table Component */}
            <DataTable columns={columns} data={transactions || []} />
          </div>
        </div>

      </div>
    </div>
  );
}