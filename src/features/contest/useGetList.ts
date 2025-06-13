import {
  fetchContestListTmp,
  fetchContestPage,
  type ContestFilterParams,
} from "@/api/contest/list";
import type { Contest } from "@/types/contestType";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

// 이건 12개 내에서 필터링하는거니까 그냥 이거 ㄱㄱ
export const useContestPage = (page: number) => {
  const { data, isLoading } = useQuery<Contest[]>({
    queryKey: ["contests", page], // 캐시 구분용 키
    queryFn: () => fetchContestPage(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 5분 동안은 “신선” 취급
  });

  return { data, isLoading };
};

// DB 연결 한다면 이거 써야할듯?
export const useGetList = (filters: ContestFilterParams) => {
  // queryKey는 안정성을 위해 배열은 정렬 해줘야함
  const queryKey = [
    "contestList",
    {
      field: [...(filters.field ?? [])].sort(),
      ageGroup: filters.ageGroup ?? "",
      organizerType: [...(filters.organizerType ?? [])].sort(),
    },
  ];

  const { data, isLoading } = useQuery<Contest[]>({
    queryKey: queryKey,
    queryFn: () => fetchContestListTmp(filters),
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, //5 분
  });

  return { data, isLoading };
};
