import { fetchCommunityDetail, type CommunityDetail } from "@/api/community/content";
import { deleteCommunity } from "@/api/community/delete";
import { fetchCommentList, type CommentRow } from "@/api/comment/list";
import { registerComment, type CommentRegisterRequest } from "@/api/comment/register";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment } from "@/api/comment/delete";
import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import { fetchCategory, type Category } from "@/api/common/category";
import { modifyComment } from "@/api/comment/modify";

const CommunityContent = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [community, setCommunity] = useState<CommunityDetail | null>(null);
  const [comments, setComments] = useState<CommentRow[]>([]);
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [deleteModalState, setDeleteModalState] = useState<{
    type: "confirm" | "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // 댓글 삭제 모달 상태 추가
  const [commentDeleteModalState, setCommentDeleteModalState] = useState<{
    type: "confirm" | "success" | "error" | null;
    message: string;
    commentId?: number;
  }>({ type: null, message: "" });

  const navigate = useNavigate();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [countdown, setCountdown] = useState<string>("");

  // 실시간 디데이 계산 Hook
  useEffect(() => {
    if (!community?.recruit_end_date) return;

    const calculateCountdown = () => {
      try {
        // ISO 형식의 날짜를 그대로 사용 (이미 시간 정보 포함)
        const endTime = new Date(community.recruit_end_date);

        // 유효한 날짜인지 확인
        if (isNaN(endTime.getTime())) {
          console.error("Invalid date format:", community.recruit_end_date);
          setCountdown("날짜 형식 오류");
          return;
        }

        const now = new Date();
        const diff = endTime.getTime() - now.getTime();

        if (diff <= 0) {
          setCountdown("모집이 종료되었습니다.");
          return;
        }

        const totalSeconds = Math.floor(diff / 1000);
        const days = Math.floor(totalSeconds / (60 * 60 * 24));
        const hours = String(Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60))).padStart(
          2,
          "0"
        );
        const minutes = String(Math.floor((totalSeconds % (60 * 60)) / 60)).padStart(2, "0");
        const seconds = String(totalSeconds % 60).padStart(2, "0");

        setCountdown(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
      } catch (error) {
        console.error("Date parsing error:", error);
        setCountdown("날짜 파싱 오류");
        return;
      }
    };

    // 즉시 실행
    calculateCountdown();

    // 1초마다 업데이트
    const timer = setInterval(calculateCountdown, 1000);

    // 클린업
    return () => clearInterval(timer);
  }, [community?.recruit_end_date]);

  const startEditing = (commentId: number, currentContent: string) => {
    setEditingCommentId(commentId);
    setEditedContent(currentContent);
  };

  const cancelEditing = () => {
    setEditingCommentId(null);
    setEditedContent("");
  };

  // ✅ 실제 수정 API 호출
  const submitEdit = async (commentId: number) => {
    if (!editingCommentId || !editedContent.trim()) return;

    try {
      await modifyComment({
        commentId: commentId,
        content: editedContent.trim(),
      });

      await loadComments(); // 목록 갱신
      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      console.error("댓글 수정 실패:", error);
      alert("댓글 수정 중 오류가 발생했습니다.");
    }
  };

  // 카테고리 조회
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategory();
        setCategories(res.data.list);
      } catch (error) {
        console.error("카테고리 조회 실패", error);
      }
    };

    loadCategories();
  }, []);

  const getCategoryName = (id: number): string => {
    const found = categories.find(c => c.category_id === id);
    return found?.name ?? "알 수 없음";
  };

  // 댓글 목록 조회 함수
  const loadComments = async () => {
    if (!communityId) return;

    try {
      const commentData = await fetchCommentList(Number(communityId));
      setComments(commentData.list);
    } catch (error) {
      console.error("댓글 목록 조회 실패:", error);
    }
  };

  // 댓글 삭제 확인 모달 표시
  const showCommentDeleteConfirmModal = (commentId: number) => {
    setCommentDeleteModalState({
      type: "confirm",
      message: "정말 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.",
      commentId: commentId,
    });

    const modal = document.getElementById("comment_delete_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  // 댓글 삭제 실행
  const handleCommentDelete = async () => {
    const { commentId } = commentDeleteModalState;
    if (!commentId) return;

    try {
      const res = await deleteComment({ commentId });

      if (res.affectedRows > 0) {
        // 삭제 성공
        setCommentDeleteModalState({
          type: "success",
          message: "댓글이 성공적으로 삭제되었습니다.",
        });

        // 댓글 목록 갱신
        await loadComments();
      } else {
        // 삭제 실패
        setCommentDeleteModalState({
          type: "error",
          message: "댓글 삭제에 실패했습니다.",
        });
      }

      // 결과 모달 표시
      const resultModal = document.getElementById("comment_result_modal");
      if (resultModal instanceof HTMLDialogElement) {
        resultModal.showModal();
      }
    } catch (error) {
      console.error("댓글 삭제 실패:", error);

      // 삭제 실패 모달 표시
      setCommentDeleteModalState({
        type: "error",
        message: "댓글 삭제 중 오류가 발생했습니다.",
      });

      const errorModal = document.getElementById("comment_result_modal");
      if (errorModal instanceof HTMLDialogElement) {
        errorModal.showModal();
      }
    }
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    if (!communityId) {
      setError("커뮤니티 ID가 없습니다.");
      setIsLoading(false);
      return;
    }

    const loadContent = async () => {
      try {
        const data = await fetchCommunityDetail(Number(communityId));
        setCommunity(data);
      } catch (error) {
        console.error("커뮤니티 상세 불러오기 실패:", error);
        setError("커뮤니티 정보를 불러오는데 실패했습니다.");
      }
    };

    const loadData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await loadContent();
        await loadComments();
      } catch (error) {
        console.error("데이터 로딩 실패:", error);
        setError("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [communityId]);

  // 댓글 등록
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!commentContent.trim()) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }

    if (!communityId) return;

    setIsSubmitting(true);
    try {
      const commentData: CommentRegisterRequest = {
        content: commentContent.trim(),
        postId: Number(communityId),
      };

      await registerComment(commentData);

      // 댓글 등록 성공 후 목록 새로고침
      await loadComments();

      // 입력창 초기화
      setCommentContent("");
    } catch (error) {
      console.error("댓글 등록 실패:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // 댓글 취소 처리
  const handleCommentCancel = () => {
    setCommentContent("");
  };

  // 날짜 포맷팅
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      .replace(/\. /g, ".")
      .replace(",", "");
  };

  // 커뮤니티 삭제 처리
  const handleDelete = async () => {
    try {
      await deleteCommunity({ communityId: Number(communityId) });

      // 삭제 성공 모달 표시
      setDeleteModalState({
        type: "success",
        message: "삭제가 완료되었습니다.",
      });

      // 성공 모달 표시
      const successModal = document.getElementById("result_modal");
      if (successModal instanceof HTMLDialogElement) {
        successModal.showModal();
      }

      // 2초 후 해당 커뮤니티 타입의 리스트로 이동
      setTimeout(() => {
        const communityType = community?.community_type === "1" ? "contest" : "etc";
        navigate(`/community/list?type=${communityType}`);
      }, 2000);
    } catch (error) {
      console.error("삭제 실패:", error);

      // 삭제 실패 모달 표시
      setDeleteModalState({
        type: "error",
        message: "삭제 중 오류가 발생했습니다.",
      });

      const errorModal = document.getElementById("result_modal");
      if (errorModal instanceof HTMLDialogElement) {
        errorModal.showModal();
      }
    }
  };

  const showDeleteConfirmModal = () => {
    setDeleteModalState({
      type: "confirm",
      message: "정말 삭제하시겠습니까?\n삭제 후에는 복구할 수 없습니다.",
    });

    const modal = document.getElementById("delete_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.showModal();
    }
  };

  const closeModal = (modalId: string) => {
    const modal = document.getElementById(modalId);
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }
  };

  if (isLoading) {
    return (
      <main className="pt-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">로딩 중...</div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-500">{error}</div>
          </div>
        </div>
      </main>
    );
  }

  if (!community) {
    return (
      <main className="pt-14">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-500">커뮤니티 정보를 찾을 수 없습니다.</div>
          </div>
        </div>
      </main>
    );
  }

  const { recruitment_detail_list = [] } = community;

  const ageGroupLabel: Record<string, string> = {
    "1": "대학생",
    "2": "제한없음",
  };

  return (
    <main className="pt-14">
      <div className="max-w-[1400px] mx-auto">
        {/* 게시글 헤더 */}
        <section className="pt-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 pt-8">
              <span className="px-2 py-1 border rounded bg-gray-800 text-white text-sm truncate">
                {getCategoryName(Number(community.category_type))}
              </span>
              <span className="text-xl font-bold truncate">{community.title || "제목 없음"}</span>
            </div>
            <div className="flex justify-end gap-4 text-sm">
              <span>{community.nickname}</span>
              <span>{community.reg_date?.slice(0, 10)}</span>
            </div>
          </div>
        </section>

        {/* 모집 정보 */}
        <section className="py-6">
          <div className="border-t-2 border-gray-200 py-5">
            {/* 상단 우측 버튼 */}
            <div className="flex justify-end text-xs text-gray-500 gap-2">
              <button
                className="cursor-pointer"
                onClick={() => navigate(`/community/write?mode=edit&id=${communityId}`)}
              >
                수정
              </button>
              <button className="cursor-pointer" onClick={showDeleteConfirmModal}>
                삭제
              </button>
            </div>

            {/* 2단 정보 영역 */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* 왼쪽 열 */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">활동 유형</span>
                  <span className="text-black">
                    {community.community_type === "1" ? "공모전" : "기타"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">모집 연령</span>
                  <span className="text-black">{ageGroupLabel[community.age_group] ?? "-"}</span>
                </div>
              </div>

              {/* 오른쪽 열 */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">진행 일정</span>
                  <span className="text-black">
                    {community.start_date ? community.start_date.slice(0, 10) : "-"} ~{" "}
                    {community.end_date ? community.end_date.slice(0, 10) : "-"}
                  </span>
                </div>
                <div className="flex items-baseline">
                  <span className="w-28 text-gray-600 font-semibold">모집 종료</span>
                  {community.recruit_end_date && countdown && (
                    <span
                      className={`text-sm font-medium ${countdown.includes("모집 종료") ? "text-red-500" : "text-black-600"}`}
                    >
                      {countdown}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 모집 상세 */}
          <div className="min-h-[14rem]">
            {recruitment_detail_list.length > 0 && (
              <div className="flex flex-col gap-4 border-t-2 border-gray-200 px-2 py-3">
                <div className="flex flex-wrap gap-6">
                  <span className="font-bold">모집 상세</span>
                  <div className="flex gap-8 flex-wrap">
                    <div className="flex flex-col gap-2 text-sm">
                      {recruitment_detail_list.map(detail => (
                        <div key={detail.recruitment_detail_id}>
                          <span className="font-bold mr-2">{detail.role}</span>
                          <span>{detail.count}명</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6">
                  <span className="font-bold">상세 설명</span>
                  <div
                    className="text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: community.content }}
                  />
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 댓글 섹션 */}
        <section className="py-6 border-t border-gray-200">
          <div className="mb-6">
            <h3 className="text-sm font-semibold mb-1">댓글 {comments?.length || 0}개</h3>

            {/* 댓글 목록 */}
            <div className="space-y-1">
              {comments &&
                comments.map(comment => {
                  const isEditing = editingCommentId === comment.comment_id;
                  const isDeleted = comment.del_yn === "Y";

                  return (
                    <div key={comment.comment_id} className="flex gap-3 items-start p-2 rounded-lg">
                      <Avatar
                        src="/assets/icons/iconmonstr-user-circle-thin.svg"
                        size="md"
                        shape="circle"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-gray-900">{comment.nickname}</span>
                            <span className="text-sm text-gray-500">
                              {formatDate(comment.reg_date)}
                            </span>
                          </div>

                          {!isDeleted && (
                            <div className="flex justify-end text-xs text-gray-500 gap-2">
                              {isEditing ? (
                                <>
                                  <button onClick={() => submitEdit(Number(comment.comment_id))}>
                                    수정
                                  </button>
                                  <button onClick={cancelEditing}>취소</button>
                                </>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      startEditing(comment.comment_id, comment.content)
                                    }
                                  >
                                    수정
                                  </button>
                                  <button
                                    onClick={() =>
                                      showCommentDeleteConfirmModal(comment.comment_id)
                                    }
                                  >
                                    삭제
                                  </button>
                                </>
                              )}
                            </div>
                          )}
                        </div>

                        {isEditing ? (
                          <textarea
                            className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none resize-none"
                            value={editedContent}
                            onChange={e => setEditedContent(e.target.value)}
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed">
                            {isDeleted ? "삭제된 댓글입니다." : comment.content}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}

              {comments?.length === 0 && (
                <div className="text-center py-8 text-gray-500">첫 번째 댓글을 작성해보세요!</div>
              )}
            </div>
          </div>

          {/* 댓글 작성 폼 */}
          <form
            onSubmit={handleCommentSubmit}
            className="flex items-start gap-3 bg-white border border-gray-200 rounded-lg p-4"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0">
              <img
                src="/assets/icons/iconmonstr-user-circle-thin.svg"
                alt="프로필"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <textarea
                value={commentContent}
                onChange={e => setCommentContent(e.target.value)}
                placeholder="댓글을 입력해주세요..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2"
                rows={3}
                disabled={isSubmitting}
              />
              <div className="flex justify-end gap-2 mt-2">
                <Button type="button" intent="primary" size="sm" onClickFnc={handleCommentCancel}>
                  취소
                </Button>
                <Button type="submit" intent="orange" size="sm" onClickFnc={() => {}}>
                  {isSubmitting ? "등록중..." : "등록"}
                </Button>
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* 커뮤니티 삭제 확인 모달 */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">삭제 확인</h3>
          <p className="py-4 whitespace-pre-line">{deleteModalState.message}</p>
          <div className="modal-action">
            <button className="btn" onClick={() => closeModal("delete_modal")}>
              아니요
            </button>
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                closeModal("delete_modal");
                handleDelete();
              }}
            >
              예
            </button>
          </div>
        </div>
      </dialog>

      {/* 커뮤니티 삭제 결과 안내 모달 (성공/실패) */}
      <dialog id="result_modal" className="modal">
        <div className="modal-box">
          <h3
            className={`font-bold text-lg ${
              deleteModalState.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {deleteModalState.type === "success" ? "삭제 완료" : "삭제 실패"}
          </h3>
          <p className="py-4">{deleteModalState.message}</p>
          {deleteModalState.type === "success" && (
            <p className="text-sm text-gray-500">잠시 후 목록으로 이동합니다...</p>
          )}
          <div className="modal-action">
            <button
              className={`btn ${
                deleteModalState.type === "success"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              onClick={() => {
                closeModal("result_modal");
                if (deleteModalState.type === "error") {
                  // 실패 시에는 현재 페이지에 그대로 있음
                  setDeleteModalState({ type: null, message: "" });
                }
              }}
            >
              확인
            </button>
          </div>
        </div>
      </dialog>

      {/* 댓글 삭제 확인 모달 */}
      <dialog id="comment_delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">댓글 삭제 확인</h3>
          <p className="py-4 whitespace-pre-line">{commentDeleteModalState.message}</p>
          <div className="modal-action">
            <button className="btn" onClick={() => closeModal("comment_delete_modal")}>
              아니요
            </button>
            <button
              className="btn bg-red-500 hover:bg-red-600 text-white"
              onClick={() => {
                closeModal("comment_delete_modal");
                handleCommentDelete();
              }}
            >
              예
            </button>
          </div>
        </div>
      </dialog>

      {/* 댓글 삭제 결과 안내 모달 (성공/실패) */}
      <dialog id="comment_result_modal" className="modal">
        <div className="modal-box">
          <h3
            className={`font-bold text-lg ${
              commentDeleteModalState.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {commentDeleteModalState.type === "success" ? "삭제 완료" : "삭제 실패"}
          </h3>
          <p className="py-4">{commentDeleteModalState.message}</p>
          <div className="modal-action">
            <button
              className={`btn ${
                commentDeleteModalState.type === "success"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              onClick={() => {
                closeModal("comment_result_modal");
                // 모달 상태 초기화
                setCommentDeleteModalState({ type: null, message: "" });
              }}
            >
              확인
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default CommunityContent;
