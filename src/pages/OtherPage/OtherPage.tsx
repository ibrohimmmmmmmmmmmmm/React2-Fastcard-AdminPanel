import { NavLink, Outlet } from 'react-router-dom'
import { Layers3 } from 'lucide-react'

const tabs = [
  { label: 'Categories', path: 'categories' },
  { label: 'Brands', path: 'brands' },
  { label: 'Banners', path: 'banners' },
]

export default function OtherPage() {
  return (
    <div className="space-y-6">
      <div className="rounded-[28px] border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          
          {/* LEFT SIDE */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-sm">
              <Layers3 className="h-7 w-7 text-white" />
            </div>

            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.28em] text-slate-400">
                Other management
              </p>

              <h1 className="mt-1 text-[20px] font-bold leading-none text-slate-900 md:text-[22px]">
                Categories, brands and banners
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-1">
  {tabs.map((tab) => (
    <NavLink
      key={tab.path}
      to={tab.path}
      className={({ isActive }) =>
        `rounded-full px-5 py-2.5 text-[15px] font-medium transition-colors duration-200 
        ${
          isActive
            ? 'bg-blue-600 text-white shadow-sm' 
            : 'text-slate-600 hover:text-slate-900'
        }`
      }
    >
      {tab.label}
    </NavLink>
  ))}
</div>
        </div>
      </div>

      <Outlet />
    </div>
  )
}