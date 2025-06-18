import { fetchCommunityList, type CommunityItem } from "@/api/community/list";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const useCommunityPage = () => {
  const { data, isLoading } = useQuery<CommunityItem[]>({
    queryKey: ["community"], // 캐시 구분용 키
    queryFn: async () => {
      const response = await fetchCommunityList("1", 1, 10);
      return response.list; // 여기서 list만 추출해서 반환
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 10, // 5분 동안은 “신선” 취급
  });

  return { data, isLoading };
};
