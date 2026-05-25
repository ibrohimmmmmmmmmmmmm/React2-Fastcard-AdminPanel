import React, { memo } from 'react'
import img from "@/assets/Group 1116606595 (5).png"
import { Search } from 'lucide-react'
import UserHeader from '../UserHeader/UserHeader'
export default memo(function Header() {
  return (
    <div className='bg-slate-900 flex items-center justify-between p-5 text-white'>
      <div className='flex items-center gap-20'>
        <img className='w-41.5 h-12' src={img} alt="" />
        <div className='flex items-center gap-3 border-b-2 border-slate-700 pb-1'>
          <Search className='text-white' />
          <input className='text-[#FFFFFF] outline-none' type="text" placeholder="Search..." />
        </div>
      </div>
      <UserHeader />
        
    </div>
  )
})
