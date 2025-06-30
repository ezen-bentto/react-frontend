import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchContestEdit } from "@/api/contest/content";
import type { RequestContestData } from "@/types/contestType";

export const useEditContestMutation = (contestId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: RequestContestData) => {
      return fetchContestEdit(contestId, {
        ...formData,
        contest_tag: formData.contest_tag.join(","), // 변환은 여기서 처리
      });
    },
    onSuccess: () => {
      // ✅ 수정 성공 시 해당 상세 데이터 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["contest-detail", contestId] });
    },
    onError: error => {
      console.error("공모전 수정 실패:", error);
    },
  });
};
