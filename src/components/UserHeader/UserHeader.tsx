import { Bell, LogOut, Settings, User } from "lucide-react";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuthStore } from "../../store/authStore";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

export default memo(function UserHeader() {
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)

  const handleLogout = () => {
    logout()
    navigate("/admin-login")
  }

  return (
    <div className="flex items-center gap-4 bg-[#0f172a] p-4 text-white">
      {/* Notification Icon */}
      <div className="relative cursor-pointer">
        <Bell size={20} />
        <span className="absolute -top-2 -right-2 bg-blue-600 text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
          5
        </span>
      </div>

      {/* User Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 outline-none hover:bg-slate-800 p-2 rounded-xl transition">
          <Avatar className="h-8 w-8 bg-emerald-500">
            <AvatarFallback className="bg-emerald-500 text-white font-bold">MI</AvatarFallback>
          </Avatar>
          <span className="font-medium">Mukhtorov Ibrohim</span>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent className="w-56 bg-[#0f172a] border-slate-700 text-white">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-slate-700" />
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-800">
            <User className="mr-2 h-4 w-4" /> Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer hover:bg-slate-800">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-700" />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 hover:text-red-500 hover:bg-slate-800">
            <LogOut className="mr-2 h-4 w-4" /> Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
})