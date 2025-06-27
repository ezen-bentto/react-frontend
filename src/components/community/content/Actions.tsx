import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ActionsProps } from "@/types/communityContentType";

const Actions = ({ authorId, currentUserId, communityId, onDeleteClick }: ActionsProps) => {
    const navigate = useNavigate();

    const isAuthor = currentUserId === authorId;

    if (!isAuthor) return null;

    return (
        <div className="border-gray-200 dark:border-gray-700 pb-1">
            <div className="flex justify-end gap-1 px-6">
                <button
                    className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => navigate(`/community/write?mode=edit&id=${communityId}`)}
                >
                    <EditOutlined />
                    수정
                </button>
                <button
                    className="flex items-center gap-1 px-2 py-1 text-xs rounded transition-all text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={onDeleteClick}
                >
                    <DeleteOutlined />
                    삭제
                </button>
            </div>
        </div>
    );
};

export default Actions;
