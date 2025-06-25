import axios from "@/api/axiosInstance";

// 댓글 목록 응답(row)
export interface CommentRow {
  comment_id: number;
  post_id: number;
  user_id: number;
  nickname: string;
  content: string;
  reg_date: string;
  del_yn: string;
}

// 댓글 목록 응답(배열)
export interface CommentListResponse {
  list: CommentRow[];
}

/**
 *
 * 댓글 목록 조회
 *
 * @function fetchCommentList
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 * @param postId
 */
export const fetchCommentList = async (postId: number): Promise<CommentListResponse> => {
  try {
    const response = await axios.get(
      `/api/comment/getList?postId=${postId}`
    );
    return response.data.data;
  } catch (error) {
    console.error("댓글 목록 조회 실패:", error);
    throw new Error("댓글 목록을 불러오는 중 오류가 발생했습니다.");
  }
};
