import { create } from 'zustand'

interface AuthState {
  isAuth: boolean
  login: () => void
  logout: () => void
}

const getInitialAuth = () => {
  if (typeof window === 'undefined') {
    return false
  }

  return localStorage.getItem('isAuth') === 'true'
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuth: getInitialAuth(),

  login: () => {
    localStorage.setItem('isAuth', 'true')
    set({ isAuth: true })
  },

  logout: () => {
    localStorage.removeItem('isAuth')
    set({ isAuth: false })
  },
}))