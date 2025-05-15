import { create } from 'zustand';

interface AIState {
  response: string;
  loading: boolean;
  resetResponse: () => void;
  appendResponse: (chunk: string) => void;
  setLoading: (value: boolean) => void;
}

export const useAIStore = create<AIState>((set) => ({
  response: '',
  loading: false,
  resetResponse: () => set({ response: '' }),
  appendResponse: (chunk) =>
    set((state) => ({ response: state.response + chunk })),
  setLoading: (value) => set({ loading: value }),
}));

export const getStreamedAIResponse = async (prompt: string) => {
  const { resetResponse, appendResponse, setLoading } = useAIStore.getState();

  resetResponse();
  setLoading(true);

  try {
    const res = await fetch('/api/gemini/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) {
      throw new Error('No response body');
    }

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);
      appendResponse(chunk);
    }
  } catch (error) {
    console.error('Streaming error:', error);
    appendResponse('\n[Error fetching response]');
  } finally {
    setLoading(false);
  }
};