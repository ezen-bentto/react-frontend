import { create } from "zustand";
import { fetchAllPolicies } from "./api";
import { type PolicyType } from "./types";

interface PolicyStore {
  policies: PolicyType[];
  isLoading: boolean;
  error: string | null;
  fetchPolicies: () => Promise<void>;
}

export const usePolicyStore = create<PolicyStore>(set => ({
  policies: [],
  isLoading: false,
  error: null,

  fetchPolicies: async () => {
    set({ isLoading: true, error: null });
    try {
      const data = await fetchAllPolicies();
      set({ policies: data });
    } catch (error) {
      set({ error: "정책 데이터를 불러오지 못했습니다." });
      console.error(error);
    } finally {
      set({ isLoading: false });
    }
  },
}));
