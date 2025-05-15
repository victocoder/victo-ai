interface ExpertState {
  expert: string;
  loading: boolean;
  resetResponse: () => void;
  appendResponse: (chunk: string) => void;
  setLoading: (value: boolean) => void;
}