import React from 'react';
import { Search, Plus, Pencil, Smartphone, Monitor, Watch, Headphones, Camera, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';

const OtherPage = () => {
  // Mock data to match the grid layout
  const categories = [
    { name: 'Phones', icon: <Smartphone size={32} /> },
    { name: 'Computers', icon: <Monitor size={32} /> },
    { name: 'SmartWatch', icon: <Watch size={32} /> },
    { name: 'HeadPhones', icon: <Headphones size={32} /> },
    { name: 'Camera', icon: <Camera size={32} /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-6 bg-white p-2 rounded-lg border shadow-sm">
        <div className="flex gap-2">
          {['Categories', 'Brands', 'Banners'].map((tab, i) => (
            <button key={tab} className={`px-4 py-2 rounded-md ${i === 0 ? 'bg-blue-100 text-blue-600 font-medium' : 'text-gray-600'}`}>
              {tab}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          <Plus size={20} /> Add new
        </button>
      </div>

      {/* Search */}
      <div className="relative mb-6 max-w-sm">
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 border rounded-md" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="bg-white p-4 border rounded-lg flex flex-col items-center relative group">
            <Pencil size={16} className="absolute top-3 right-3 text-blue-500 cursor-pointer" />
            <div className="my-4">{categories[i % 5].icon}</div>
            <h3 className="text-sm font-medium">{categories[i % 5].name}</h3>
          </div>
        ))}
        {/* Gaming card */}
        <div className="bg-white p-4 border rounded-lg flex flex-col items-center relative">
          <Pencil size={16} className="absolute top-3 right-3 text-blue-500 cursor-pointer" />
          <div className="my-4"><Gamepad2 size={32} /></div>
          <h3 className="text-sm font-medium">Gaming</h3>
        </div>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center gap-2 text-gray-600">
        <button className="p-1 hover:bg-gray-200 rounded"><ChevronLeft size={18} /></button>
        {[1, 2, 3, 4, 5, 6, '...'].map((page, i) => (
          <button key={i} className={`px-3 py-1 rounded ${page === 2 ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-200'}`}>
            {page}
          </button>
        ))}
        <button className="p-1 hover:bg-gray-200 rounded"><ChevronRight size={18} /></button>
        <span className="ml-auto text-gray-500">274 Results</span>
      </div>
    </div>
  );
};

export default OtherPage;