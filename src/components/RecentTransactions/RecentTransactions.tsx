import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle } from "@/components/ui/card";

const transactions = [
  { name: "Jagarnath S.", date: "24.05.2023", amount: "$124.97", status: "Paid" },
  { name: "Anand G.", date: "23.05.2023", amount: "$55.42", status: "Pending" },
  { name: "Kartik S.", date: "23.05.2023", amount: "$89.90", status: "Paid" },
];

export function RecentTransactions() {
  return (
    <Card className="shadow-none border-slate-200 p-6 w-[49%] h-[285px]">
      <CardTitle className="mb-4">Recent Transactions</CardTitle>
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
                <Badge className={t.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-600"}>
                  {t.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}