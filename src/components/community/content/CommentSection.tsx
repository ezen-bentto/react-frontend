import { MessageOutlined } from "@ant-design/icons";
import type { CommentSectionProps } from "@/types/commentType";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";

const CommentSection = ({
    comments,
    currentUserId,
    onEdit,
    onDelete,
    onSubmit,
    onCancel,
    isSubmitting,
    editingCommentId,
    editedContent,
    setEditedContent,
    cancelEditing,
    submitEdit,
}: CommentSectionProps) => {
    return (
        <div className="bg-white dark:bg-[#2B2B2B] border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl border backdrop-blur-sm mt-8">
            <div className="p-6">
                {/* 헤더 */}
                <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white">
                    <MessageOutlined />
                    <h2 className="text-xl font-bold">댓글 {comments.length}</h2>
                </div>

                {/* 댓글 리스트 */}
                <div className="space-y-4 mb-6">
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <CommentItem
                                key={comment.comment_id}
                                comment={comment}
                                currentUserId={currentUserId}
                                isEditing={editingCommentId === comment.comment_id}
                                editedContent={editedContent}
                                setEditedContent={setEditedContent}
                                onEdit={() => onEdit(comment.comment_id, comment.content)}
                                onCancel={cancelEditing}
                                onSubmitEdit={() => submitEdit(comment.comment_id)}
                                onDelete={() => onDelete(comment.comment_id)}
                            />
                        ))
                    ) : (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            첫 번째 댓글을 작성해보세요!
                        </div>
                    )}
                </div>

                {/* 댓글 입력폼 */}
                <CommentForm
                    onSubmit={onSubmit}
                    onCancel={onCancel}
                    isSubmitting={isSubmitting}
                />
            </div>
        </div>
    );
};

export default CommentSection;
