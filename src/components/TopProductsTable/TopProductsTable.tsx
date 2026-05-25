import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardTitle } from "@/components/ui/card";

const topProducts = [
  { name: "Men Grey Hoodie", price: "$49.90", units: 204 },
  { name: "Women Striped T-Shirt", price: "$34.90", units: 155 },
  { name: "Wome White T-Shirt", price: "$40.90", units: 120 },
];

export function TopProductsTable() {
  return (
    <Card className="shadow-none border-slate-200 p-6 w-[49%]">
      <CardTitle className="mb-4">Top Products by Units Sold</CardTitle>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Units</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topProducts.map((p, i) => (
            <TableRow key={i} className="hover:bg-slate-50 border-none">
              <TableCell className="flex items-center gap-3">
                 <div className="w-8 h-8 bg-slate-100 rounded" />
                 {p.name}
              </TableCell>
              <TableCell className="text-slate-600">{p.price}</TableCell>
              <TableCell className="font-semibold">{p.units}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}