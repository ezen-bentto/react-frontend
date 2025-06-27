import type { RepusetModalProps } from "@/types/modalTypes";

const CommentDeleteModal = ({ isOpen, message, onCancel, onConfirm }: RepusetModalProps) => {
  if (!isOpen) return null;

  return (
    <dialog
      id="comment_delete_modal"
      className="modal backdrop:bg-black backdrop:bg-opacity-50"
      open
    >
      <div className="modal-box border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl p-8 max-w-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚠</span>
          </div>
          <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">
            댓글 삭제 확인
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300 whitespace-pre-line">
            {message}
          </p>
          <div className="flex gap-3">
            <button
              className="flex-1 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 font-medium"
              onClick={onCancel}
            >
              아니요
            </button>
            <button
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              onClick={onConfirm}
            >
              예
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CommentDeleteModal;
