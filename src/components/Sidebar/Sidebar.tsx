import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ListOrdered, Tag, Folder } from 'lucide-react';

const menuItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Orders", path: "/admin/orders", icon: ListOrdered },
  { name: "Products", path: "/admin/products", icon: Tag },
  { name: "Other", path: "/admin/other", icon: Folder },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b bg-slate-900 via-[#0b1220] to-[#0f172a] border-r border-slate-800 p-5">
      
      {/* Brand */}
      <div className="mb-8 px-3">
        <h1 className="text-white text-xl font-semibold tracking-wide">
          Admin Panel
        </h1>
        <p className="text-slate-500 text-xs mt-1">
          Control Center
        </p>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden
              
              ${
                isActive
                  ? "bg-white text-[#0f172a] shadow-xl scale-[1.03]"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              {/* Active left indicator */}
              {isActive && (
                <span className="absolute left-0 top-0 h-full w-1 bg-indigo-500 rounded-r-full" />
              )}

              {/* Icon */}
              <Icon
                size={20}
                strokeWidth={isActive ? 2.5 : 2}
                className={`transition-all duration-300 ${
                  isActive ? "text-[#0f172a]" : "group-hover:text-white"
                }`}
              />

              {/* Text */}
              <span className="font-medium tracking-wide">
                {item.name}
              </span>

              {/* Hover glow effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300" />
            </Link>
          );
        })}
      </nav>

      {/* Bottom subtle decoration */}
      <div className="absolute bottom-6 left-5 right-5">
        <div className="h-px bg-slate-800 mb-3" />
        <p className="text-slate-600 text-xs">
          v1.0.0 • Dashboard UI
        </p>
      </div>
    </aside>
  );
}