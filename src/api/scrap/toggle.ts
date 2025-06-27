import axios from "@/api/axiosInstance";

/**
 * 스크랩 토글 요청
 *
 * @function toggleScrap
 * @date 2025/06/24
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *        2025/06/24           김혜미               신규작성
 *
 * @param targetId 스크랩 대상 ID (커뮤니티 글 ID)
 */
export const toggleScrap = async (targetId: number) => {
  const response = await axios.post("/api/scrap/toggle", { targetId });
  return response.data;
};
