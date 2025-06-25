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
  const { data, isLoading } = useQuery<string>({
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

      const previousStatus = queryClient.getQueryData<boolean>(["bookmarkStatus", contestId]);
      const previousCount = queryClient.getQueryData<number>(["bookmarkCount", contestId]);

      if (typeof previousStatus === "boolean") {
        queryClient.setQueryData(["bookmarkStatus", contestId], !previousStatus);
      }

      if (typeof previousCount === "number") {
        queryClient.setQueryData(
          ["bookmarkCount", contestId],
          previousStatus ? previousCount - 1 : previousCount + 1
        );
      }

      return {
        previousStatus,
        previousCount,
      };
    },

    onError: (_err, _vars, context) => {
      if (context) {
        if (typeof context.previousStatus === "boolean") {
          queryClient.setQueryData(["bookmarkStatus", contestId], context.previousStatus);
        }
        if (typeof context.previousCount === "number") {
          queryClient.setQueryData(["bookmarkCount", contestId], context.previousCount);
        }
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmarkStatus", contestId] });
      queryClient.invalidateQueries({ queryKey: ["bookmarkCount", contestId] });
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
