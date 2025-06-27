// api ------------------------------------------------

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
  contest_id: number | null;
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

// api ------------------------------------------------
// 수정, 삭제 props
export interface ActionsProps {
  authorId: number;
  currentUserId: number | undefined;
  communityId: string;
  onDeleteClick: () => void;
}

// 카운트다운 props
export interface CountDownProps {
  countdown: string;
}

// 다크모드 props
export interface DarkModeProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

// 모집상세 props
export interface DetailsProps {
  contentHtml: string;
  recruitmentDetailList?: RecruitmentDetail[];
}
export interface RecruitmentDetail {
  recruitment_detail_id: number;
  role: string;
  count: number;
}

// 커뮤니티 상세 헤더 props
export interface HeaderProps {
  community: CommunityDetail;
  getCategoryName: (id: number) => string;
  onToggleScrap: () => void;
}

// 모집정보 props
export interface InfoProps {
  communityType: string;
  ageGroup: string;
  startDate?: string;
  endDate?: string;
  recruitEndDate?: string;
  countdownText: string;
}
