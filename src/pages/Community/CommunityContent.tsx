import { fetchCommunityDetail, type CommunityDetail } from "@/api/community/content";
import { deleteCommunity } from "@/api/community/delete";
import { fetchCommentList, type CommentRow } from "@/api/comment/list";
import { registerComment, type CommentRegisterRequest } from "@/api/comment/register";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteComment } from "@/api/comment/delete";
import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import Badge from "@/components/shared/Badge";
import { fetchCategory, type Category } from "@/api/common/category";
import { modifyComment } from "@/api/comment/modify";
import { useAuth } from "@/context/AuthContext";
import {
  ClockCircleOutlined,
  CalendarOutlined,
  TeamOutlined,
  MessageOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
  EyeOutlined,
  HeartOutlined,
  BulbOutlined,
  FireOutlined,
  HeartFilled
} from "@ant-design/icons";

const CommunityContent = () => {
  const { user, isLoggedIn } = useAuth();
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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(24);

  // HTML에 dark 클래스 추가/제거하는 useEffect 추가
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

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

  // 실제 수정 API 호출
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
    if (!isLoggedIn) {
      // 로그인 안 했으면 로그인 페이지로 이동
      navigate("/login");
      return;
    }

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

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white transition-all duration-300">
        <main className="pt-14">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
              <div className="ml-4 text-lg text-gray-500 dark:text-gray-300">로딩 중...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white transition-all duration-300">
        <main className="pt-14">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-red-500">{error}</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!community) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white transition-all duration-300">
        <main className="pt-14">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="text-lg text-gray-500 dark:text-gray-300">커뮤니티 정보를 찾을 수 없습니다.</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const { recruitment_detail_list = [] } = community;

  const ageGroupLabel: Record<string, string> = {
    "1": "대학생",
    "2": "제한없음",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white transition-all duration-300">
      {/* 다크모드 토글 */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isDarkMode
            ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
            : "bg-[#2B2B2B] text-white hover:bg-gray-700"
            }`}
        >
          {isDarkMode ? <FireOutlined /> : <BulbOutlined />}
        </button>
      </div>

      <main className="pt-14">
        <div className="max-w-[1400px] mx-auto px-4 py-8">
          {/* 통합된 메인 컨텐츠 카드 */}
          <div className="bg-white dark:bg-[#2B2B2B] border-gray-200 dark:border-gray-700 rounded-2xl mb-8 overflow-hidden">
            {/* 헤더 섹션 */}
            <div className="p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <Badge intent="primary" size="sm">
                    {getCategoryName(Number(community.category_type))}
                  </Badge>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <EyeOutlined />
                      <span className="text-sm">조회수</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleLike}
                        className={`flex items-center gap-1 px-3 py-1 rounded-full transition-all ${liked
                          ? "bg-red-500 text-white"
                          : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                          }`}
                      >
                        {liked ? <HeartFilled /> : <HeartOutlined />}
                        <span className="text-sm">{likeCount}</span>
                      </button>
                    </div>
                  </div>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-white">
                  {community.title || "제목 없음"}
                </h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                        <UserOutlined className="text-gray-600 dark:text-gray-300" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-200">{community.nickname}</span>
                    </div>
                    <span className="text-gray-500 dark:text-gray-400">{community.reg_date?.slice(0, 10)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 액션 버튼들 */}
            {user && user.id === community.author_id && (
              <div className="border-gray-200 dark:border-gray-700 pb-1">
                <div className="flex justify-end gap-1">
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate(`/community/write?mode=edit&id=${communityId}`)}
                  >
                    <EditOutlined />
                    수정
                  </button>
                  <button
                    className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={showDeleteConfirmModal}
                  >
                    <DeleteOutlined />
                    삭제
                  </button>
                </div>
              </div>
            )}

            {/* 모집 정보 섹션 */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <TeamOutlined />
                모집 정보
              </h2>

              {/* 카운트다운 */}
              {community.recruit_end_date && countdown && (
                <div className="mb-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <ClockCircleOutlined />
                      <span className="font-semibold">모집 마감까지</span>
                    </div>
                    <div className={`text-2xl font-bold tracking-wider ${countdown.includes("모집 종료") ? "text-red-200" : ""}`}>
                      {countdown}
                    </div>
                  </div>
                </div>
              )}

              {/* 정보 그리드 */}
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                      <TeamOutlined className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">활동 유형</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {community.community_type === "1" ? "공모전" : "기타"}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
                      <UserOutlined className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">모집 연령</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {ageGroupLabel[community.age_group] ?? "-"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                      <CalendarOutlined className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">진행 일정</div>
                      <div className="font-semibold text-gray-900 dark:text-white">
                        {community.start_date ? community.start_date.slice(0, 10) : "-"} ~ {community.end_date ? community.end_date.slice(0, 10) : "-"}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 모집 상세 */}
              {recruitment_detail_list.length > 0 && (
                <div className="border-t pt-6 border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">모집 상세</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {recruitment_detail_list.map((detail, index) => (
                      <div key={detail.recruitment_detail_id || index} className="p-4 rounded-xl text-center bg-gray-50 dark:bg-gray-700">
                        <div className="text-2xl font-bold text-blue-600 mb-1">
                          {detail.count}
                        </div>
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{detail.role}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 상세 설명 섹션 */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">상세 설명</h2>
              <div
                className="prose max-w-none min-h-[200px] prose-gray dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-li:text-gray-300"
                dangerouslySetInnerHTML={{ __html: community.content || "<p>상세 설명이 없습니다.</p>" }}
              />
            </div>
          </div>

          {/* 댓글 섹션 */}
          <div className="bg-white dark:bg-[#2B2B2B] border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl border backdrop-blur-sm">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                <MessageOutlined />
                <h2 className="text-xl font-bold">댓글 {comments?.length || 0}개</h2>
              </div>

              {/* 댓글 목록 */}
              <div className="space-y-4 mb-6">
                {comments &&
                  comments.map(comment => {
                    const isEditing = editingCommentId === comment.comment_id;
                    const isDeleted = comment.del_yn === "Y";

                    return (
                      <div
                        key={comment.comment_id}
                        className="p-4 rounded-xl hover:shadow-md transition-all duration-200 border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-700"
                      >
                        <div className="flex items-start gap-3">
                          <Avatar
                            src="/assets/icons/iconmonstr-user-circle-thin.svg"
                            size="md"
                            shape="circle"
                          />

                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-gray-900 dark:text-white">{comment.nickname}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                  {formatDate(comment.reg_date)}
                                </span>
                              </div>

                              {user && user.id === comment.user_id && !isDeleted && (
                                <div className="flex items-center gap-2">
                                  {isEditing ? (
                                    <>
                                      <button
                                        className="p-1 transition-colors text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                                        onClick={() => submitEdit(Number(comment.comment_id))}
                                      >
                                        <EditOutlined />
                                      </button>
                                      <button
                                        className="p-1 transition-colors text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                        onClick={cancelEditing}
                                      >
                                        취소
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <button
                                        className="p-1 transition-colors text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                                        onClick={() => startEditing(comment.comment_id, comment.content)}
                                      >
                                        <EditOutlined />
                                      </button>
                                      <button
                                        className="p-1 transition-colors text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                        onClick={() => showCommentDeleteConfirmModal(comment.comment_id)}
                                      >
                                        <DeleteOutlined />
                                      </button>
                                    </>
                                  )}
                                </div>
                              )}
                            </div>

                            {isEditing ? (
                              <textarea
                                className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-[#2B2B2B] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                value={editedContent}
                                onChange={e => setEditedContent(e.target.value)}
                              />
                            ) : (
                              <p className="leading-relaxed text-gray-700 dark:text-gray-200">
                                {isDeleted ? "삭제된 댓글입니다." : comment.content}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                {comments?.length === 0 && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    첫 번째 댓글을 작성해보세요!
                  </div>
                )}
              </div>

              {/* 댓글 작성 폼 */}
              {isLoggedIn && (
                <form
                  onSubmit={handleCommentSubmit}
                  className="p-4 rounded-xl border-2 border-dashed bg-blue-50/50 dark:bg-gray-700/30 border-blue-200 dark:border-blue-700"
                >
                  <div className="flex items-start gap-3">
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
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#2B2B2B] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        rows={3}
                        disabled={isSubmitting}
                      />

                      <div className="flex justify-end gap-2 mt-2">
                        <Button type="button" intent="primary" size="sm" onClickFnc={handleCommentCancel}>
                          취소
                        </Button>
                        <Button type="submit" intent="orange" size="sm" onClickFnc={() => { }}>
                          {isSubmitting ? "등록중..." : "등록"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* 커뮤니티 삭제 확인 모달 */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box border bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">삭제 확인</h3>
          <p className="py-4 whitespace-pre-line text-gray-700 dark:text-gray-300">{deleteModalState.message}</p>
          <div className="modal-action">
            <button
              className="btn border bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              onClick={() => closeModal("delete_modal")}
            >
              아니요
            </button>
            <button
              className="btn bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
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
        <div className="modal-box border bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <h3
            className={`font-bold text-lg ${deleteModalState.type === "success"
              ? "text-green-600"
              : "text-red-600"
              }`}
          >
            {deleteModalState.type === "success" ? "삭제 완료" : "삭제 실패"}
          </h3>
          <p className="py-4 text-gray-700 dark:text-gray-300">{deleteModalState.message}</p>
          {deleteModalState.type === "success" && (
            <p className="text-sm text-gray-500 dark:text-gray-400">잠시 후 목록으로 이동합니다...</p>
          )}
          <div className="modal-action">
            <button
              className={`btn ${deleteModalState.type === "success"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
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
        <div className="modal-box border bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">댓글 삭제 확인</h3>
          <p className="py-4 whitespace-pre-line text-gray-700 dark:text-gray-300">{commentDeleteModalState.message}</p>
          <div className="modal-action">
            <button
              className="btn border bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 border-gray-300 dark:border-gray-600"
              onClick={() => closeModal("comment_delete_modal")}
            >
              아니요
            </button>
            <button
              className="btn bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
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
        <div className="modal-box border bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white border-gray-200 dark:border-gray-700">
          <h3
            className={`font-bold text-lg ${commentDeleteModalState.type === "success"
              ? "text-green-600"
              : "text-red-600"
              }`}
          >
            {commentDeleteModalState.type === "success" ? "삭제 완료" : "삭제 실패"}
          </h3>
          <p className="py-4 text-gray-700 dark:text-gray-300">{commentDeleteModalState.message}</p>
          <div className="modal-action">
            <button
              className={`btn ${commentDeleteModalState.type === "success"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 text-white"
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
    </div>
  );
};

export default CommunityContent;