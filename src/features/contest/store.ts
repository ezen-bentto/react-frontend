import type { Contest, ContestStore } from "@/types/contestType";
import axios from "axios";
import { create } from "zustand";

export const useContestStore = create<ContestStore>(set => ({
  contests: [],
  popularContests: [],
  latestContests: [],

  fetchContest: async () => {
    const response = await axios.get<Contest[]>("/data/contest/contest_1.json");
    const contests = response.data;

    const viewSorted = [...contests].sort((a, b) => b.views - a.views);
    const ascSorted = [...contests].sort((a, b) => parseInt(a.reg_date) - parseInt(b.reg_date));
    const top10 = viewSorted.slice(0, 12);
    const latestList = ascSorted.slice(0, 12);

    set({
      contests,
      popularContests: top10,
      latestContests: latestList,
    });
  },
}));
