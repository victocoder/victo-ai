import { create } from 'zustand'
import axios from 'axios'
import { AuthCredentials, LoginFormData, RegisterFormData } from '@/types/auth'
import { authClient } from '@/lib/auth-client'
import router from 'next/router'
import { toast } from 'sonner'

interface AuthState {
  loading: boolean
  error: string | null
  registerUser: (formData: RegisterFormData) => Promise<boolean>
  loginUser: (formData: LoginFormData) => Promise<boolean>
  loginWithGoogle: () => Promise<string>
}


const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  registerUser: async (formData) => {
    set({ loading: true, error: null })
    const { data, error } = await authClient.signUp.email({ email: formData.email, password: formData.password, name: formData.name }, {
      onError(ctx) {
        //handle error
        toast.error(ctx.error.message || ctx.error.statusText)
        set({ error: ctx.error.message ||ctx.error.statusText })
      }
    })
    if (data) {
      set({ loading: false, error: null })
      return true;
    } else {
      set({ loading: false, error: error?.message || 'Register failed' })

      return false
    }


  },

  loginUser: async (formData: AuthCredentials) => {
    set({ loading: true, error: null })

    const { data, error } = await authClient.signIn.email(formData, {
      onError(ctx) {
        //handle error
        toast.error(ctx.error.message || ctx.error.statusText)
        set({ error: ctx.error.message ||ctx.error.statusText })
      }
    })
    console.log(error)
    if (data) {
      set({ loading: false, error: null })
      return true;
    } else {
      set({ loading: false ,error: error.message || error.statusText  || "Failed to login"})

      return false
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
