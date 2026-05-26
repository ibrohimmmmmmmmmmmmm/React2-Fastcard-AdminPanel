import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import Sidebar from '../components/Sidebar/Sidebar'

export default memo(function Layout() {
  return (
    <>
      <Header />
      <div className="flex min-h-[calc(100vh-72px)] bg-slate-100">
        <Sidebar />
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </>
  )
})
