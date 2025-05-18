import { expertList } from "@/lib/constants";
import { Expert } from "@/types/expert";
import { create } from 'zustand'
interface ExpertState {
  expert: Expert;
  expertList: Expert[];
  loading: boolean;
  setExpert: (expet: Expert) => void;
  // appendResponse: (chunk: string) => void;
  // setLoading: (value: boolean) => void;
}

const useExpertStore = create<ExpertState>((set) => ({
  expert: {id:expertList[0].num, name: expertList[0].expertName ,expertDiscription: expertList[0].expertDescription,systemInstruction:expertList[0].systemInstruction},
  expertList: expertList.map(item => ({
    id: item.num,
    name: item.expertName,expertDiscription: item.expertDescription,
    systemInstruction: item.systemInstruction
  })),
  loading: false,

  setExpert: async (expert: Expert) => {
    set({ expert: expert })
  }
}))

export default useExpertStore;