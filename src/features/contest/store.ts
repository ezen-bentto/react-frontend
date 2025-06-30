import { fetchDataDetail } from "@/api/contest/contestApi";
import type { ContestStore } from "@/types/contestType";

import { create } from "zustand";

export const useContestStore = create<ContestStore>(set => ({
  contests: [],
  popularContests: [],
  latestContests: [],

  fetchContest: async () => {
    const contests = await fetchDataDetail();

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
