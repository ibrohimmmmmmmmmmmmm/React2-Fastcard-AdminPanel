import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2 } from 'lucide-react';

import { Checkbox } from "../../components/ui/checkbox";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

const products = [
  { id: 1, name: "Men Grey Hoodie", inventory: "96 in stock", category: "Hoodies", price: "$49.90" },
  { id: 2, name: "Women Striped T-Shirt", inventory: "56 in stock", category: "T-Shirt", price: "$34.90" },
  { id: 3, name: "Women White T-Shirt", inventory: "78 in stock", category: "T-Shirt", price: "$40.90" },
];

export default function ProductPage() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(r => r !== id) : [...prev, id]
    );
  };

  return (
    <div className=" max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Button className="bg-blue-600 p-5 hover:bg-blue-700">
          <Plus className="mr-2 h-4 w-4" /> Add order
        </Button>
      </div>

      <div className="flex item-center justify-between mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input placeholder="Search..." className="pl-9" />
        </div>
        <Select defaultValue="newest">
          <SelectTrigger className="w-45">
            <SelectValue placeholder="Newest" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
        <div className='flex item-center gap-3'>
        <Button variant="outline" size="icon"><Edit className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon"><Trash2 className="h-4 w-4" /></Button>
        </div>
        
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"><Checkbox /></TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Inventory</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <Checkbox checked={selectedRows.includes(p.id)} onCheckedChange={() => toggleRow(p.id)} />
                </TableCell>
                <TableCell className="font-medium flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-md" /> {/* Placeholder for image */}
                  {p.name}
                </TableCell>
                <TableCell>{p.inventory}</TableCell>
                <TableCell>{p.category}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="ghost" size="icon"><Edit className="h-4 w-4 text-blue-500" /></Button>
                  <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}