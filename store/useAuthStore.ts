import { create } from 'zustand'
import axios from 'axios'
import { AuthCredentials, LoginFormData, RegisterFormData, User } from '@/types/auth'
import { authClient } from '@/lib/auth-client'
import router from 'next/router'

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
  registerUser: (formData: LoginFormData) => Promise<void>
  loginUser: (formData: AuthCredentials) => Promise<string>
  loginWithGoogle: () => Promise<string>
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
      set({ user: response.data.registerdata, loading: false })

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
      set({ user: data?.user, loading: false })
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

  logout: async () => {
    const { data, error } = await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login"); // redirect to login page
        },
      },
    });
    set({ user: null })
  },

}))

export default useAuthStore
