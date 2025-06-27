import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Avatar from "@/components/shared/Avatar";
import type { CommentItemProps } from "@/types/commentType";

const CommentItem = ({
  comment,
  currentUserId,
  isEditing,
  editedContent,
  setEditedContent,
  onEdit,
  onCancel,
  onSubmitEdit,
  onDelete,
}: CommentItemProps) => {
  const isAuthor = Number(comment.user_id) === currentUserId;

  const isDeleted = comment.del_yn === "Y";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("ko-KR", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 rounded-xl hover:shadow-md transition-all duration-200 border bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-blue-200 dark:hover:border-blue-700">
      <div className="flex items-start gap-3">
        <Avatar src="/assets/icons/iconmonstr-user-circle-thin.svg" size="md" shape="circle" />

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                {comment.nickname}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {formatDate(comment.reg_date)}
              </span>
            </div>

            {isAuthor && !isDeleted && (
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <button
                      className="p-1 transition-colors text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                      onClick={onSubmitEdit}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      onClick={onCancel}
                    >
                      취소
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                      onClick={onEdit}
                    >
                      <EditOutlined />
                    </button>
                    <button
                      className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                      onClick={onDelete}
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
};

export default CommentItem;
