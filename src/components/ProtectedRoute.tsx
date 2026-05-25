import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  children: ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuth = useAuthStore((state) => state.isAuth)

  if (!isAuth) {
    return <Navigate to="/admin-login" replace />
  }

  return <>{children}</>
}
