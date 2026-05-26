import { ArrowRight, Package, TrendingUp, DollarSign } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { SalesChart } from "../../components/SalesChart/SalesChart";
import { RecentTransactions } from "../../components/RecentTransactions/RecentTransactions";
import { TopProductsTable } from "../../components/TopProductsTable/TopProductsTable";

const StatCard = ({ title, value, icon: Icon, color }: any) => (
  <Card className="border border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
    <CardContent className="flex items-center gap-4 p-5">
      
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon size={22} className={color.replace("bg-", "text-")} />
      </div>

      <div>
        <p className="text-xs text-slate-500 dark:text-slate-400">{title}</p>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {value}
        </h3>
      </div>
    </CardContent>
  </Card>
);

export default function AdminPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">

      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
        Dashboard
      </h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <StatCard title="Sales" value="$152k" icon={TrendingUp} color="bg-orange-500" />
        <StatCard title="Cost" value="$99.7k" icon={DollarSign} color="bg-orange-500" />
        <StatCard title="Profit" value="$32.1k" icon={Package} color="bg-emerald-500" />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

        {/* Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 shadow-sm">
          <SalesChart />
        </div>

        {/* Top Products */}
        <Card className="shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 md:p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-900 dark:text-white">
              Top selling products
            </h3>

            <button className="text-sm flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition">
              See All <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between">
                
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 dark:bg-slate-800 rounded-md" />
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      Healthcare Erbology
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      in Accessories
                    </p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-emerald-600">
                  13,153
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6">
          <RecentTransactions />
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6">
          <TopProductsTable />
        </div>
      </div>

    </div>
  );
}