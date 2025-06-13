import axios from "axios";

// 커뮤니티 수정 요청 타입
export interface CommunityModifyRequest {
    communityId: number;
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
export const modifyCommunity = async (data: CommunityModifyRequest): Promise<CommunityModifyResponse> => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/community/modify`, data);
        return response.data;
    } catch (error) {
        console.error("커뮤니티 수정 실패:", error);
        throw new Error("커뮤니티 수정 중 오류가 발생했습니다.");
    }
};