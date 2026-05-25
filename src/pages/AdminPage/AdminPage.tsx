export default function AdminPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-slate-500 mt-1">Welcome back, admin. Here is your panel overview.</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Sales</p>
          <p className="mt-4 text-3xl font-semibold">$152k</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Cost</p>
          <p className="mt-4 text-3xl font-semibold">$99.7k</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Profit</p>
          <p className="mt-4 text-3xl font-semibold">$32.1k</p>
        </div>
      </div>

      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h2 className="text-xl font-semibold">Welcome Admin 🚀</h2>
        <p className="mt-3 text-slate-600">
          This is your admin panel landing page. Use the sidebar to navigate sections, and I left the dashboard area ready for your product cards and tables.
        </p>
      </section>
    </div>
  )
}