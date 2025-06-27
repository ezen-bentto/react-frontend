// api ------------------------------------------------
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
        role: string;
        count: number;
    }>;
}

// 커뮤니티 수정 응답 타입
export interface CommunityModifyResponse {
    insertId?: number;
    affectedRows: number;
}

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

// 커뮤니티 글 삭제 요청
export interface CommunityDeletePayload {
    communityId: number;
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