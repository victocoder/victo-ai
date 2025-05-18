import { create } from 'zustand'
import axios from 'axios'
import { AuthCredentials, LoginFormData, RegisterFormData } from '@/types/auth'
import { authClient } from '@/lib/auth-client'
import router from 'next/router'

interface AuthState {
  loading: boolean
  error: string | null
  registerUser: (formData: LoginFormData) => Promise<void>
  loginUser: (formData: AuthCredentials) => Promise<string>
  loginWithGoogle: () => Promise<string>
}


const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  registerUser: async (formData) => {
    set({ loading: true, error: null })

    try {
      const response = await axios.post('/api/register', formData)
      set({loading: false })

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
      const { data, error } = await authClient.signIn.email(formData)
      set({loading:false})
      return "success"
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Login failed',
        loading: false,
      })
      return "error";
    }
  },
  loginWithGoogle: async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google"
    })


    if (data) {
      return "success"
    }
    else {
      return "error"
    }
  },


}))

export default useAuthStore
