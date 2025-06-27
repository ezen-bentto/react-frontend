import { fetchBookmarkCnt, fetchCheckBookmark, fetchIsBookmark } from "@/api/contest/list";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export const useBookmark = (constetId: number) => {
  const { data, isLoading } = useQuery<boolean>({
    queryKey: ["bookmarkStatus", constetId],
    queryFn: () => fetchIsBookmark(constetId),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  const isBookmarked = data;
  return { isBookmarked, isLoading };
};

export const useBookmarkCnt = (constetId: number) => {
  const { data = false, isLoading } = useQuery<number>({
    queryKey: ["bookmarkCount", constetId],
    queryFn: () => fetchBookmarkCnt(constetId),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });

  const bookmarkCount = data;
  return { bookmarkCount, isLoading };
};

export const useBookmarkMutation = (contestId: number) => {
  const queryClient = useQueryClient();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: () => fetchCheckBookmark(contestId),

    onMutate: async () => {
      await Promise.all([
        queryClient.cancelQueries({ queryKey: ["bookmarkStatus", contestId] }),
        queryClient.cancelQueries({ queryKey: ["bookmarkCount", contestId] }),
      ]);

      let previousStatus = queryClient.getQueryData<boolean>(["bookmarkStatus", contestId]);
      let previousCount = queryClient.getQueryData<number>(["bookmarkCount", contestId]);

      if (previousStatus === undefined) {
        console.info("[onMutate] 북마크 상태 캐시가 없어 먼저 fetch");
        try {
          previousStatus = await fetchIsBookmark(contestId);
          queryClient.setQueryData(["bookmarkStatus", contestId], previousStatus);
        } catch (error) {
          console.error("북마크 상태 fetch 실패:", error);
          previousStatus = false;
        }
      }

      if (previousCount === undefined) {
        console.info("[onMutate] 북마크 카운트 캐시가 없어 먼저 fetch");
        try {
          const countResponse = await fetchBookmarkCnt(contestId);
          previousCount = Number(countResponse);
          queryClient.setQueryData(["bookmarkCount", contestId], previousCount);
        } catch (error) {
          console.error("북마크 카운트 fetch 실패:", error);
          previousCount = 0;
        }
      }

      previousCount = Number(previousCount);

      console.info("[onMutate] 이전 상태:", { previousStatus, previousCount });

      const newStatus = !previousStatus;
      const newCount = previousStatus ? previousCount - 1 : previousCount + 1;

      queryClient.setQueryData(["bookmarkStatus", contestId], newStatus);
      queryClient.setQueryData(["bookmarkCount", contestId], newCount);

      console.info("[onMutate] 낙관적 상태 적용됨:", { newStatus, newCount });

      return {
        previousStatus,
        previousCount,
      };
    },

    onSuccess: () => {
      console.info("[onSuccess] 성공 - 쿼리 무효화");

      // 기존 캐시 완전 삭제 후 다시 fetch
      queryClient.removeQueries({ queryKey: ["bookmarkStatus", contestId] });
      queryClient.removeQueries({ queryKey: ["bookmarkCount", contestId] });

      // 새로 fetch
      queryClient.fetchQuery({
        queryKey: ["bookmarkStatus", contestId],
        queryFn: () => fetchIsBookmark(contestId),
      });
      queryClient.fetchQuery({
        queryKey: ["bookmarkCount", contestId],
        queryFn: () => fetchBookmarkCnt(contestId),
      });
    },

    onError: (_err, _vars, context) => {
      console.error("[onError] 에러 발생, 이전 상태로 롤백");
      if (context) {
        if (typeof context.previousStatus === "boolean") {
          queryClient.setQueryData(["bookmarkStatus", contestId], context.previousStatus);
        }
        if (typeof context.previousCount === "number") {
          queryClient.setQueryData(["bookmarkCount", contestId], context.previousCount);
        }
      }
    },

    // onSettled 제거! 또는 로깅용으로만 사용
    onSettled: (data, error) => {
      console.info("[onSettled] mutation 완료", { data, error: error?.message });
    },
  });

  const debounceMutate = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      mutation.mutate();
    }, 300);
  };

  return {
    mutate: debounceMutate,
    isPending: mutation.isPending,
  };
};
