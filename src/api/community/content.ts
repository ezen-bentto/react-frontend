import axios from "@/api/axiosInstance";
import type { CommunityDetail } from "@/types/communityContentType";

/**
 *
 * 커뮤니티 상세 내용 조회
 *
 * @function fetchCommunityDetail
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 *        2025/06/24           김혜미               scrap_yn 추가
 * @param communityId
 */
export const fetchCommunityDetail = async (communityId: number): Promise<CommunityDetail> => {
  const response = await axios.get<{ data: CommunityDetail }>(
    `/api/community/getDetail?communityId=${communityId}`
  );
  return response.data.data;
};
