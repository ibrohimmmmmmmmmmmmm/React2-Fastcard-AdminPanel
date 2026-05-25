import { ClipboardList, Plus } from "lucide-react";
import { Button } from "../../components/ui/button";

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-8">
      {/* Title */}
      <h1 className="text-2xl font-bold text-slate-900 mb-20">Orders</h1>

      {/* Empty State Container */}
      <div className="flex flex-col items-center justify-center flex-grow:1 text-center space-y-4">
        {/* Icon Container */}
        <div className="bg-slate-100 p-6 rounded-full mb-2">
          <ClipboardList size={48} className="text-[#3b4b88]" />
        </div>

        {/* Text Section */}
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">No Orders Yet</h2>
          <p className="text-slate-500 max-w-sm">
            All the upcoming orders from your store will be visible in this page.
            <br />
            You can add orders by yourself if you sell offline.
          </p>
        </div>

        {/* Action Button */}
        <Button className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-5 rounded-lg flex items-center gap-2">
          <Plus size={18} />
          Add order
        </Button>
      </div>
    </div>
  );
}