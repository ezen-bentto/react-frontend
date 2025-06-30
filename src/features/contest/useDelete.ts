import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchContestDelete } from "@/api/contest/content";
import { useNavigate } from "react-router-dom";

export const useContestDelete = (contestId: number) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => {
      return fetchContestDelete(contestId);
    },
    onSuccess: () => {
      // ✅ 수정 성공 시 해당 상세 데이터 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["contest-detail", contestId] });
      navigate("/contest");
    },
    onError: error => {
      console.error("공모전 수정 실패:", error);
    },
  });
};
