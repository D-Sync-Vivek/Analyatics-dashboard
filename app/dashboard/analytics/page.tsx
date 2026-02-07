import GrowthChart from "@/Components/GrowthChart";
import { supabase } from "@/lib/supabase";

export default async function AnalyticsPage() {
  // 1. Fetch Data
  const { data: transactions } = await supabase
    .from('transactions')
    .select('amount, created_at, status')
    .eq('status', 'success')
    .order('created_at', { ascending: true });
  
  const groupedData = (transactions || []).reduce((acc: any, curr) => {
    const date = new Date(curr.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += curr.amount;
    return acc;
  }, {});

  const chartData = Object.keys(groupedData).map(date => ({
    name: date,
    amount: groupedData[date]
  }));

  const finalData = chartData.length > 0 ? chartData : [{ name: "No Data", visitors: 0 }];

  return (
    <div className='bg-gray-800 rounded-xl p-6'>
      <div className="flex justify-between items-center mb-6">
        <header className='text-white text-xl font-semibold'>Revenue Analytics</header>
        <span className="text-sm text-gray-400">Last 30 Days</span>
      </div>
    
      <GrowthChart data={finalData} />
    </div>
  )
}