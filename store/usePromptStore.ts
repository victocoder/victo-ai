import { create } from 'zustand'
import axios from 'axios'

interface PromptState {
  aiResponse: string | null
  loading: boolean
  error: string | null
  askAi: (formData: PromptFormData) =>Promise<string>
}

const usePromtStore = create<PromptState>((set) => ({
  aiResponse: null,
  loading: false,
  error: null,

  askAi: async (formData: PromptFormData) => {
    set({ loading: true, error: null })
    try {
      const res = await axios.post('/api/gemini', formData)
      set({ aiResponse: res.data.response, loading: false })
      return "success"
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || 'Request failed',
        loading: false,
      })
      return "error";
    }
  },
}))

export default usePromtStore
