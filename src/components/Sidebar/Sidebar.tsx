import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Tag, Users, Folder } from 'lucide-react';

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ListOrdered },
  { name: "Products", path: "/admin/products", icon: Tag },
  { name: "Other", path: "/admin/other", icon: Folder },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 min-h-screen bg-[#0f172a] p-4">
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? "bg-white text-[#0f172a] shadow-lg" 
                  : "text-slate-400 hover:bg-slate-800/50 hover:text-white"
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}