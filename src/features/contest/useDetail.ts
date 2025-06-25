import { fetchContestDetail, fetchContestPage } from "@/api/contest/contestApi";
import type { ContestDetail } from "@/types/contestType";
import { useQuery } from "@tanstack/react-query";

export const useDetail = (contestId: number | undefined) => {
  return useQuery<ContestDetail | undefined>({
    queryKey: ["contest-detail", contestId],
    enabled: !!contestId,
    queryFn: async () => {
      if (!contestId) return;

      if (contestId < 241) {
        const res = await fetchContestPage();
        return res.find(item => item.id === contestId);
      } else {
        return await fetchContestDetail(contestId);
      }
    },
    staleTime: 1000 * 60 * 5, // optional
  });
};
