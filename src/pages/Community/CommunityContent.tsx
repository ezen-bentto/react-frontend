import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/community/content/Header";
import Actions from "@/components/community/content/Actions";
import Info from "@/components/community/content/Info";
import Details from "@/components/community/content/Details";
import CommentSection from "@/components/community/content/CommentSection";
import DarkModeToggle from "@/components/community/content/DarkModeToggle";
import PostDeleteModal from "@/components/community/modal/PostDeleteModal";
import PostDeleteResultModal from "@/components/community/modal/PostDeleteResultModal";
import CommentDeleteModal from "@/components/community/modal/CommentDeleteModal";
import CommentResultModal from "@/components/community/modal/CommentResultModal";
import { useCommunityData } from "@/hooks/community/useCommunityData";
import { useCountdown } from "@/hooks/community/useCountdown";
import { useEffect, useState } from "react";
import { toggleScrap } from "@/api/scrap/toggle";
import { registerComment } from "@/api/comment/register";
import { modifyComment } from "@/api/comment/modify";
import { deleteComment } from "@/api/comment/delete";
import { deleteCommunity } from "@/api/community/delete";
import { fetchCategory, type Category } from "@/api/common/category";

interface ConfirmState {
  type: "confirm";
  message: string;
  commentId: number;
}
interface ResultState {
  type: "success" | "error";
  message: string;
}
interface NullState {
  type: null;
  message: "";
  commentId?: number;
}
type CommentDeleteModalState = ConfirmState | ResultState | NullState;

const CommunityContent = () => {
  const { user, isLoggedIn } = useAuth();
  const { communityId } = useParams<{ communityId: string }>();
  const navigate = useNavigate();

  const {
    community,
    comments,
    isLoading,
    error,
    reloadComments,
    reloadCommunity,
  } = useCommunityData(communityId);

  const countdown = useCountdown(community?.recruit_end_date);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [deleteModalState, setDeleteModalState] = useState({
    type: null as "confirm" | "success" | "error" | null,
    message: "",
  });
  const [commentDeleteModalState, setCommentDeleteModalState] = useState<CommentDeleteModalState>({
    type: null,
    message: "",
  });
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategory = async () => {
      try {
        const res = await fetchCategory();
        setCategoryList(res.data.list);
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
      }
    };
    loadCategory();
  }, []);

  const getCategoryName = (categoryId?: number | null) => {
    const matched = categoryList.find((c) => c.category_id === categoryId);
    return matched?.name || "카테고리 없음";
  };

  const handleToggleScrap = async () => {
    if (!isLoggedIn) return alert("로그인이 필요합니다.");
    if (!community) return;
    try {
      await toggleScrap(community.community_id);
      await reloadCommunity();
    } catch (err) {
      console.error("스크랩 토글 실패:", err);
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  const handleCommentSubmit = async (content: string) => {
    if (!communityId) return;
    setIsSubmitting(true);
    try {
      await registerComment({ postId: Number(communityId), content });
      await reloadComments();
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCommentDelete = async () => {
    if (commentDeleteModalState.type !== "confirm") return;
    const commentId = Number(commentDeleteModalState.commentId);
    if (!commentId) return;
    try {
      await deleteComment({ commentId });
      await reloadComments();
      setCommentDeleteModalState({ type: "success", message: "삭제 완료" });
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      setCommentDeleteModalState({ type: "error", message: "삭제 실패" });
    }
  };

  const handleDelete = async () => {
    if (!communityId) return;
    try {
      await deleteCommunity({ communityId: Number(communityId) });
      setDeleteModalState({ type: "success", message: "삭제가 완료되었습니다." });
      setTimeout(() => navigate("/community/list"), 2000);
    } catch (err) {
      console.error("게시글 삭제 실패:", err);
      setDeleteModalState({ type: "error", message: "삭제 실패" });
    }
  };

  if (isLoading) return <div className="pt-20 text-center">로딩 중...</div>;
  if (error || !community) return <div className="pt-20 text-center">{error || "정보 없음"}</div>;

  return (
    <div className="p-6 min-h-screen bg-white dark:bg-[#2B2B2B] text-gray-900 dark:text-white transition-all duration-300">
      <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <main className="pt-14 max-w-[1400px] mx-auto px-4 py-8">
        <div className="bg-white dark:bg-[#2B2B2B] border-gray-200 dark:border-gray-700 rounded-2xl mb-8 overflow-hidden">
          <Header
            community={community}
            getCategoryName={() => getCategoryName(community.category_type)}
            onToggleScrap={handleToggleScrap}
          />
          <Actions
            authorId={community.author_id}
            currentUserId={user?.id}
            communityId={communityId!}
            onDeleteClick={() => setDeleteModalState({ type: "confirm", message: "정말 삭제하시겠습니까?" })}
          />
          <Info
            communityType={community.community_type}
            ageGroup={community.age_group}
            startDate={community.start_date}
            endDate={community.end_date}
            recruitEndDate={community.recruit_end_date}
            countdownText={countdown}
          />
          <Details
            contentHtml={community.content || ""}
            recruitmentDetailList={community.recruitment_detail_list}
          />
        </div>
        <CommentSection
          comments={comments}
          currentUserId={user?.id}
          onEdit={(id, content) => {
            setEditingCommentId(id);
            setEditedContent(content);
          }}
          onDelete={(id) => {
            setCommentDeleteModalState({ type: "confirm", message: "댓글을 삭제하시겠습니까?", commentId: Number(id) });
          }}
          onSubmit={handleCommentSubmit}
          onCancel={() => setEditedContent("")}
          isSubmitting={isSubmitting}
          editingCommentId={editingCommentId}
          editedContent={editedContent}
          setEditedContent={setEditedContent}
          cancelEditing={() => setEditingCommentId(null)}
          submitEdit={async (id) => {
            try {
              await modifyComment({ commentId: Number(id), content: editedContent });
              await reloadComments();
              setEditingCommentId(null);
            } catch (err) {
              console.error("댓글 수정 실패:", err);
              throw new Error("댓글 수정 중 오류가 발생했습니다.");
            }
          }}
        />
      </main>

      <PostDeleteModal
        isOpen={deleteModalState.type === "confirm"}
        message={deleteModalState.message}
        onCancel={() => setDeleteModalState({ type: null, message: "" })}
        onConfirm={handleDelete}
      />

      <PostDeleteResultModal
        type={deleteModalState.type === "success" || deleteModalState.type === "error" ? deleteModalState.type : null}
        message={deleteModalState.message}
        onClose={() => setDeleteModalState({ type: null, message: "" })}
      />

      <CommentDeleteModal
        isOpen={commentDeleteModalState.type === "confirm"}
        message={commentDeleteModalState.message}
        onCancel={() => setCommentDeleteModalState({ type: null, message: "" })}
        onConfirm={handleCommentDelete}
      />

      <CommentResultModal
        type={commentDeleteModalState.type === "success" || commentDeleteModalState.type === "error" ? commentDeleteModalState.type : null}
        message={commentDeleteModalState.message}
        onClose={() => setCommentDeleteModalState({ type: null, message: "" })}
      />
    </div>
  );
};

export default CommunityContent;
