import axios from "@/api/axiosInstance";

// 댓글 등록 요청 타입
export interface CommentRegisterRequest {
  content: string;
  postId: number;
}

// 댓글 등록 응답 타입
export interface CommentResponse {
  insertId?: number;
  affectedRows: number;
}

/**
 *
 * 댓글 목록 조회
 *
 * @function registerComment
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 * @param CommentRegisterRequest
 */
export const registerComment = async (data: CommentRegisterRequest): Promise<CommentResponse> => {
  try {
    const response = await axios.post("/api/comment/register", data);
    return response.data;
  } catch (error) {
    console.error("댓글 등록 실패:", error);
    throw new Error("댓글 등록 중 오류가 발생했습니다.");
  }
};
