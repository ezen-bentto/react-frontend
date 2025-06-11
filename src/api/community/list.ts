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

export interface CommunityListResponse {
    list: CommunityItem[];
    totalCount: number;
}

/**
 *
 * 커뮤니티 목록 조회
 *
 * @function fetchCommunityList
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성  
 * @param communityType
 * @param page
 * @param size
 */
export const fetchCommunityList = async (
    communityType: string,
    page = 1,
    size = 10
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
    return response.data.data;
};