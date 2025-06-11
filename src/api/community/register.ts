import axios from "axios";

// 모집상세 요청 타입
export interface RecruitmentDetail {
  role: string;
  count: number;
}

// 커뮤니티 요청 타입
export interface CommunityRegisterPayload {
  communityType: string; // "1" | "2" | "3"
  contestId?: string | number | null;
  startDate?: string | null;
  endDate?: string | null;
  recruitEndDate?: string | null;
  categoryType?: string | number | null;
  ageGroup?: string | null;
  title: string;
  content: string;
  recruitments?: RecruitmentDetail[];
}

/**
 *
 * 커뮤니티 글 저장
 *
 * @function registerCommunity
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성  
 * @param CommunityRegisterPayload
 */
export const registerCommunity = async (payload: CommunityRegisterPayload) => {
  const transformedPayload = {
    ...payload,
    contestId:
      payload.contestId !== undefined && payload.contestId !== null
        ? Number(payload.contestId)
        : null,
    categoryType:
      payload.categoryType !== undefined && payload.categoryType !== null
        ? Number(payload.categoryType)
        : null,
    communityType: payload.communityType as "1" | "2" | "3",
    ageGroup: payload.ageGroup?.trim() ? payload.ageGroup : null,
    recruitments: payload.recruitments?.map(r => ({
      ...r,
      count: Number(r.count),
    })),
  };

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/community/register`,
    transformedPayload
  );
  return response.data;
};
