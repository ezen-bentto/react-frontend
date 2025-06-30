import { fetchContestDetail, fetchDataDetail } from "@/api/contest/contestApi";
import type { ContestDetail } from "@/types/contestType";
import { useQuery } from "@tanstack/react-query";

export const useDetail = (contestId: number | undefined) => {
  return useQuery<ContestDetail | undefined>({
    queryKey: ["contest-detail", contestId],
    enabled: !!contestId,
    queryFn: async () => {
      if (!contestId) return;

      const numId = Number(contestId);
      if (numId < 241) {
        const res = await fetchDataDetail();
        const target = res.find(item => item.id === numId);
        if (!target) throw new Error("Contest not found");
        return target;
      } else {
        return await fetchContestDetail(numId);
      }
    },
    staleTime: 1000 * 60 * 5, // optional
    refetchOnMount: true,
  });
};
