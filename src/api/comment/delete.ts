import axios from "@/api/axiosInstance";

// 댓글 삭제 요청 타입
export interface CommentDeleteRequest {
  commentId: number;
}

// 댓글 삭제 응답 타입
export interface CommentResponse {
  insertId?: number;
  affectedRows: number;
}

/**
 *
 * 댓글 삭제
 *
 * @function deleteComment
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 * @param CommentDeleteRequest
 */
export const deleteComment = async (data: CommentDeleteRequest): Promise<CommentResponse> => {
  try {
    const response = await axios.post("/api/comment/delete", data);
    return response.data.data;
  } catch (error) {
    console.error("댓글 삭제 실패:", error);
    throw new Error("댓글 삭제 중 오류가 발생했습니다.");
  }
};
