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
  const bookmarkCount = data?.bookmarkCount;
  const isBookmarked = data?.isBookmarked;
  return { bookmarkCount, isBookmarked };
};

export const useBookmarkMutation = (contestId: number) => {
  const queryClient = useQueryClient();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const mutation = useMutation({
    mutationFn: () => fetchBookmark(contestId),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["bookmark", contestId] });

      const previous = queryClient.getQueryData<{
        isBookmarked: boolean;
        bookmarkCount: number;
      }>(["bookmark", contestId]);

      if (previous) {
        queryClient.setQueryData(["bookmark", contestId], {
          isBookmarked: !previous.isBookmarked,
          bookmarkCount: previous.isBookmarked
            ? previous.bookmarkCount - 1
            : previous.bookmarkCount + 1,
        });
      }

      return { previous };
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["bookmark", contestId], context.previous);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookmark", contestId] });
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
