// api ------------------------------------------------

export interface RecruitmentDetailResponse {
  recruitment_detail_id: number;
  role: string;
  count: number;
}

// 커뮤니티 수정 응답 타입
export interface CommunityModifyResponse {
  insertId?: number;
  affectedRows: number;
}

// 모집상세 요청 타입 (기존 ID 포함)
export interface RecruitmentDetail {
  recruitmentDetailId?: number; // 추가: 기존 항목 식별용
  role: string;
  count: number;
}

export interface ModifyPayload extends SubmitPayload {
  communityId: number;
  recruitments: Array<{
    recruitmentDetailId?: number; // 추가: 기존 항목 식별용
    role: string;
    count: number;
  }>;
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

// 커뮤니티 글 삭제 요청
export interface CommunityDeletePayload {
  communityId: number;
}

// 커뮤니티 수정 요청 타입
export interface CommunityModifyRequest {
  communityId: number;
  communityType: string;
  contestId?: number | null;
  categoryType?: number | null;
  startDate?: string | null;
  endDate?: string | null;
  recruitEndDate?: string | null;
  ageGroup?: string | null;
  title: string;
  content: string;
  recruitments?: Array<{
    recruitmentDetailId?: number; // 추가: 기존 항목 식별용
    role: string;
    count: number;
  }>;
}

// 모집상세 요청 타입 (기존 ID 포함)
export interface RecruitmentDetail {
  recruitmentDetailId?: number; // 추가: 기존 항목 식별용
  role: string;
  count: number;
}

// 모집상세 응답 타입 (API에서 받는 데이터)
export interface RecruitmentDetailResponse {
  recruitment_detail_id: number;
  role: string;
  count: number;
}

// 커뮤니티 상세 응답 타입
export interface CommunityDetailResponse {
  community_id: number;
  community_type: string;
  category_type: number;
  contest_id: number;
  start_date: string | null;
  end_date: string | null;
  recruit_end_date: string | null;
  age_group: string;
  title: string;
  content: string;
  author_id: number;
  nickname: string;
  reg_date: string | null;
  recruitment_detail_list: RecruitmentDetailResponse[];
  scrap_yn: boolean;
}

// 수정 payload
export interface ModifyPayload extends SubmitPayload {
  communityId: number;
  recruitments: Array<{
    recruitmentDetailId?: number; // 추가: 기존 항목 식별용
    role: string;
    count: number;
  }>;
}

// api ------------------------------------------------

// 등록 payload
export interface SubmitPayload {
  communityType: string;
  categoryType: number | null;
  contestId: number | null;
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  recruitEndDate: string;
  ageGroup: string;
  recruitments: Array<{
    role: string;
    count: number;
  }>;
}

// 수정 payload
export interface ModifyPayload extends SubmitPayload {
  communityId: number;
}



