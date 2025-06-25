import axios from "@/api/axiosInstance";

export interface CommunityDeletePayload {
  communityId: number;
}

/**
 *
 * 커뮤니티 글 삭제
 *
 * @function deleteCommunity
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 * @param CommunityDeletePayload
 */
export const deleteCommunity = async (payload: CommunityDeletePayload) => {
  const transformedPayload = {
    communityId: Number(payload.communityId),
  };

  const response = await axios.post(
    "/api/community/delete",
    transformedPayload
  );
  return response.data.data;
};
