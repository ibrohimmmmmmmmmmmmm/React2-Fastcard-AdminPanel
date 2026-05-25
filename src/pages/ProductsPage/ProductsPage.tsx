import { Package, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-20">Products</h1>

      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-4">
        <div className="bg-slate-100 p-6 rounded-full mb-2">
          <Package size={48} className="text-[#3b4b88]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">No Products Yet</h2>
          <p className="text-slate-500 max-w-sm">
            Your inventory will show up here once you add products. You can manage pricing, stock, and categories from this page.
          </p>
        </div>

        <Button className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-5 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Add product
        </Button>
      </div>
    </div>
  );
}
