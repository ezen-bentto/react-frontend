// api/contest/contest.ts
import axios from "axios";

// 공모전 데이터 타입 정의
export interface Contest {
  contest_id: number;
  title: string;
}

export interface ContestResponse {
  success: boolean;
  data: Contest[];
  message: string;
}

/**
 * 카테고리별 진행중인 공모전 목록 조회
 * @param categoryId 카테고리 ID
 * @returns 공모전 목록
 */
export const fetchContestsByCategory = async (categoryId: number): Promise<ContestResponse> => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/contest/category?categoryId=${categoryId}`
    );
    return response.data;
  } catch (error) {
    console.error("카테고리별 공모전 조회 실패:", error);
    throw error;
  }
};
