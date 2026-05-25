import { useEffect, useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useAuthStore } from '../../store/authStore'

import img from "@/assets/Group 1116606595 (5).png"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const login = useAuthStore((state) => state.login)
  const isAuth = useAuthStore((state) => state.isAuth)

  useEffect(() => {
    if (!isAuth) {
      setEmail('')
      setPassword('')
    }
  }, [isAuth])

  useEffect(() => {
    if (isAuth) {
      navigate('/admin')
    }
  }, [isAuth, navigate])

  const compare = () => {
    if (
      email === "admin@fastcard.tj" &&
      password === "admin123"
    ) {
      login()
      navigate("/admin")
    } else {
      alert("Incorrect email or password")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Sidebar */}
      <div className="hidden lg:flex w-1/2 bg-[#0f172a] text-white p-12 flex-col justify-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to admin panel
        </h1>

        <div className="flex items-center gap-2">
          <img src={img} alt="" />
        </div>
      </div>

      {/* Login Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Log in
            </h2>
          </div>

          <div className="space-y-4">
            {/* Email */}
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>

            {/* Forgot password */}
            <div className="text-sm text-center">
              <a
                href="#"
                className="text-blue-600 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              onClick={compare}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Log in
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}