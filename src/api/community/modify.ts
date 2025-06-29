import axios from "@/api/axiosInstance";
import type { CommunityModifyRequest, CommunityModifyResponse } from "@/types/communityWriteType";

/**
 *
 * 커뮤니티 수정
 *
 * @function modifyCommunity
 * @date 2025/06/13
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/13           김혜미               신규작성
 * @param CommunityModifyRequest
 */
export const modifyCommunity = async (
  data: CommunityModifyRequest
): Promise<CommunityModifyResponse> => {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await axios.post("/api/community/modify", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("커뮤니티 수정 실패:", error);
    throw new Error("커뮤니티 수정 중 오류가 발생했습니다.");
  }
};
