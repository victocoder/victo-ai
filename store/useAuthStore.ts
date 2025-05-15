import { create } from 'zustand'
import axios from 'axios'
import { AuthCredentials, RegisterFormData, User } from '@/types/auth'
import { redirect } from 'next/navigation'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  registerUser: (formData: RegisterFormData) => Promise<void>
  loginUser: (formData: AuthCredentials) => Promise<string>
  logout: () => void
}


const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  registerUser: async (formData) => {
    set({ loading: true, error: null })

    try {
      const response = await axios.post('/api/register', formData)
      set({ user: response.data.user, loading: false })
      
    } catch (error: any) {
      set({
        error: error?.response?.data?.message || 'Registration failed',
        loading: false,
      })
    }
  },

    loginUser: async (formData: AuthCredentials) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('/api/login', formData)
      set({ user: res.data.user, loading: false })
      return "success"
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Login failed',
        loading: false,
      })
      return "error";
    }
  },

  logout: () => set({ user: null }),
}))

export default useAuthStore
