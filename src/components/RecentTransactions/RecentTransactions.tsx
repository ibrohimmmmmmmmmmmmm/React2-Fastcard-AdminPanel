import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "../../components/ui/table";
import { Badge } from "../../components/ui/badge";
import { Card, CardTitle } from "../../components/ui/card";

const transactions = [
  { name: "Jagarnath S.", date: "24.05.2023", amount: "$124.97", status: "Paid" },
  { name: "Anand G.", date: "23.05.2023", amount: "$55.42", status: "Pending" },
  { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
];

export function RecentTransactions() {
  return (
    <Card className="shadow-none border-slate-200 p-4 md:p-6 w-full h-auto md:h-71.25">

      <CardTitle className="mb-4 text-base md:text-lg">
        Recent Transactions
      </CardTitle>

      {/* 📱 MOBILE VERSION (modern cards) */}
      <div className="md:hidden space-y-3">
        {transactions.map((t, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-100 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-sm text-slate-900">
                {t.name}
              </p>

              <Badge
                className={
                  t.status === "Paid"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }
              >
                {t.status}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{t.date}</span>
              <span className="font-semibold text-slate-900">
                {t.amount}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 💻 DESKTOP VERSION (unchanged) */}
      <div className="hidden md:block">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {transactions.map((t, i) => (
              <TableRow key={i} className="hover:bg-slate-50 border-none">
                <TableCell className="font-medium">{t.name}</TableCell>
                <TableCell className="text-slate-500">{t.date}</TableCell>
                <TableCell>{t.amount}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      t.status === "Paid"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-slate-100 text-slate-600"
                    }
                  >
                    {t.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

    </Card>
  );
}