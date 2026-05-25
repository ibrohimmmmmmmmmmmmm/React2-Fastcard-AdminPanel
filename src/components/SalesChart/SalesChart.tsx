import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardTitle } from "../ui/card";

const data = [
  { name: 'Jan', orders: 10 }, { name: 'Feb', orders: 15 },
  { name: 'Mar', orders: 10 }, { name: 'Apr', orders: 25 },
  { name: 'May', orders: 35 }, { name: 'Jun', orders: 30 },
  { name: 'Jul', orders: 35 }, { name: 'Aug', orders: 50 },
  { name: 'Sep', orders: 45 }, { name: 'Oct', orders: 25 },
  { name: 'Nov', orders: 25 }, { name: 'Dec', orders: 35 },
];

export function SalesChart() {
  return (
    <Card className="lg:col-span-2 shadow-none border-slate-200 p-6">
      <CardTitle className="mb-6">Sales Revenue</CardTitle>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
            <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
            />
            <Area type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={3} fill="url(#colorOrders)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}