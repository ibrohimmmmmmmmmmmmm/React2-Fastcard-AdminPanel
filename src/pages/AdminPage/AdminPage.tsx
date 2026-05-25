import { ArrowRight, Package, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent, CardTitle } from "../../components/ui/card";
import { SalesChart } from "../../components/SalesChart/SalesChart";
import { RecentTransactions } from "../../components/RecentTransactions/RecentTransactions";
import { TopProductsTable } from "../../components/TopProductsTable/TopProductsTable";


const StatCard = ({ title, value, icon: Icon, color } : any) => (
  <Card className="shadow-none border-slate-200">
    <CardContent className="flex items-center gap-4 p-6">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon size={24} className={color.replace("bg-", "text-")} />
      </div>
      <div>
        <p className="text-sm text-slate-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export default function AdminPage() {
  return (
    <div className="p-8 space-y-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Sales" value="$152k" icon={TrendingUp} color="bg-orange-500" />
        <StatCard title="Cost" value="$99.7k" icon={DollarSign} color="bg-orange-500" />
        <StatCard title="Profit" value="$32.1k" icon={Package} color="bg-emerald-500" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <SalesChart />

        {/* Top Products */}
        <Card className="shadow-none border-slate-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold">Top selling products</h3>
            <button className="text-sm flex items-center gap-1 text-slate-600 hover:text-black">
              See All <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-md" />
                  <div>
                    <p className="text-sm font-medium">Healthcare Erbology</p>
                    <p className="text-xs text-slate-500">in Accessories</p>
                  </div>
                </div>
                <p className="text-sm font-semibold text-emerald-600">13,153</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex items-center justify-between">
            <RecentTransactions />
            <TopProductsTable />
      </div>
    </div>
  );
}