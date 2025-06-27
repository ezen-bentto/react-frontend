import axios from "@/api/axiosInstance";

// 모집 상세 응답 타입
export interface RecruitmentDetail {
  recruitment_detail_id: number;
  role: string;
  count: number;
}

// 커뮤니티 상세 응답 타입
export interface CommunityDetail {
  community_id: number;
  community_type: string;
  category_type: number;
  contest_id: number;
  start_date: string;
  end_date: string;
  recruit_end_date: string;
  age_group: string;
  nickname: string;
  title: string;
  content: string;
  author_id: number;
  reg_date: string;
  recruitment_detail_list: RecruitmentDetail[];
  scrap_yn: boolean;
}

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
