import { fetchContestListTmp, type ContestFilterParams } from "@/api/contest/list";
import type { Contest } from "@/types/contestType";
import { useQuery } from "@tanstack/react-query";

const useGetList = (filters: ContestFilterParams) => {
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
    staleTime: 5 * 60 * 1000, //5 분
  });

  return { data, isLoading };
};

export default useGetList;
