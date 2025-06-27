import axios from "@/api/axiosInstance";
import type { CommunityRegisterPayload } from "@/types/communityWriteType";

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

  const response = await axios.post("/api/community/register", transformedPayload);
  return response.data;
};
