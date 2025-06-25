import axios from "@/api/axiosInstance";

// 댓글 수정 요청 타입
export interface CommentModifyRequest {
  commentId: number;
  content: string;
}

// 댓글 수정 응답 타입
export interface CommentResponse {
  insertId?: number;
  affectedRows: number;
}

/**
 *
 * 댓글 수정
 *
 * @function modifyComment
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 * @param CommentModifyRequest
 */
export const modifyComment = async (data: CommentModifyRequest): Promise<CommentResponse> => {
  try {
    const response = await axios.post("/api/comment/modify", data);
    return response.data;
  } catch (error) {
    console.error("댓글 수정 실패:", error);
    throw new Error("댓글 수정 중 오류가 발생했습니다.");
  }
};
