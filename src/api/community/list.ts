import axios from "@/api/axiosInstance";
import type { CommunityListResponse } from "@/types/communityListType";

export const fetchCommunityList = async (
  communityType: string,
  page: number,
  size: number
): Promise<CommunityListResponse> => {
  const response = await axios.get<{ data: CommunityListResponse }>(
    "/api/community/getList",
    {
      params: {
        communityType: communityType,
        page,
        size,
      },
    }
  );
  return response.data.data;
};
