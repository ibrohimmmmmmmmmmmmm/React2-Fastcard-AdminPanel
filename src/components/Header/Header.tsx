import img from "@/assets/Group 1116606595 (5).png"
import { Languages, Menu, Search } from "lucide-react"
import { useTheme } from "next-themes"
import { memo, useState } from "react"
import UserHeader from "../UserHeader/UserHeader"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"

import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "../../components/ui/sheet"

export default memo(function Header() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full   bg-[#0f172a] backdrop-blur-xl text-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-4 md:gap-10">
          <img className="h-10 w-auto" src={img} alt="logo" />

          {/* Desktop Search */}
          <div className="hidden md:flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-xl border border-slate-800">
            <Search className="w-4 h-4 text-slate-400" />
            <Input
              className="bg-transparent border-none text-white placeholder:text-slate-500 focus-visible:ring-0"
              placeholder="Search products..."
            />
          </div>
        </div>

        {/* RIGHT SIDE (DESKTOP) */}
        <div className="hidden md:flex items-center gap-3">

          {/* Language */}
          <Select defaultValue="en">
            <SelectTrigger className="w-[90px] bg-slate-900 border-slate-800 text-white">
              <Languages className="h-4 w-4 mr-1" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 text-white border-slate-800">
              <SelectItem value="en">ENG</SelectItem>
              <SelectItem value="ru">RUS</SelectItem>
            </SelectContent>
          </Select>

          {/* THEME SELECT (NEW HIGH LEVEL) */}
          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-32.5 bg-slate-900 border-slate-800 text-white">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent className="bg-slate-900 text-white border-slate-800">
              <SelectItem value="light">🌞 Light</SelectItem>
              <SelectItem value="dark">🌙 Dark</SelectItem>
            </SelectContent>
          </Select>

          <UserHeader />
        </div>

        {/* MOBILE MENU */}
        <div className="md:hidden flex items-center gap-2">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="bg-slate-950 text-white border-slate-800 w-[280px]"
            >
              <div className="flex flex-col gap-5 mt-6">

                {/* Search */}
                <div className="flex items-center gap-2 bg-slate-900 px-3 py-2 rounded-lg">
                  <Search className="w-4 h-4 text-slate-400" />
                  <input
                    className="bg-transparent outline-none w-full text-sm"
                    placeholder="Search..."
                  />
                </div>

                {/* Language */}
                <Select defaultValue="en">
                  <SelectTrigger className="bg-slate-900 border-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 text-white">
                    <SelectItem value="en">ENG</SelectItem>
                    <SelectItem value="ru">RUS</SelectItem>
                  </SelectContent>
                </Select>

                {/* Theme */}
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger className="bg-slate-900 border-slate-800">
                    <SelectValue placeholder="Theme" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 text-white">
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>

                <UserHeader />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
})