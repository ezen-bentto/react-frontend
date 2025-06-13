import axios from "axios";

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
}

// @/api/community/list.ts 파일 수정 제안
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
    `${import.meta.env.VITE_API_URL}/api/community/getList`,
    {
      params: {
        community_type: communityType,
        page,
        size,
      },
    }
  );
  return response.data.data; // 서버 응답의 data 부분을 그대로 반환
};