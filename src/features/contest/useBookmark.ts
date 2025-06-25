import { fetchBookmark, fetchIsBookmark } from "@/api/contest/list";
import type { bookmark } from "@/types/contestType";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";

export const useBookmark = (constetId: number) => {
  const { data } = useQuery<bookmark>({
    queryKey: ["bookmark", constetId],
    queryFn: () => fetchIsBookmark(constetId),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10,
  });
  const bookmarkCount = data?.isBookmarked;
  const isBookmarked = data?.isBookmarked;
  return { bookmarkCount, isBookmarked };
};

export const useBookmarkMutation = (contestId: number) => {
  const queryClient = useQueryClient();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: () => fetchBookmark(contestId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark-check", contestId] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark-check", contestId] });
    },
  });

  const debounceMutate = () => {
    // 이전 클릭 무시
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 마지막 클릭만 300ms 후 실행
    timerRef.current = setTimeout(() => {
      mutation.mutate();
    }, 300);
  };

  return { mutate: debounceMutate, isPending: mutation.isPending };
};
