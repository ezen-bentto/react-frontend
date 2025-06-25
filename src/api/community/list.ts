import axios from "@/api/axiosInstance";

export interface CommunityItem {
  community_id: number;
  community_type: string;
  category_type: number | null;
  contest_id: number | null;
  start_date: string | null;
  end_date: string | null;
  recruit_end_date: string | null;
  age_group: string | null;
  title: string;
  content: string;
  nickname: string;
  author_id: number;
  reg_date: string;
  mod_date: string;
  scrap_count: number;
  comment_count: number;
  scrap_yn: "Y" | "N";
}

export interface CommunityListResponse {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  list: CommunityItem[];
}

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
