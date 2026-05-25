import { CircleDot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OtherPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-20">Other</h1>

      <div className="flex flex-col items-center justify-center flex-grow text-center space-y-4">
        <div className="bg-slate-100 p-6 rounded-full mb-2">
          <CircleDot size={48} className="text-[#3b4b88]" />
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-slate-900">No Content Yet</h2>
          <p className="text-slate-500 max-w-sm">
            The other section is ready for your extra controls, shortcuts, and tools. Build it out as you need.
          </p>
        </div>

        <Button className="bg-[#2563eb] hover:bg-blue-700 text-white px-6 py-5 rounded-lg flex items-center gap-2">
          <Plus size={18} /> Create new item
        </Button>
      </div>
    </div>
  );
}
