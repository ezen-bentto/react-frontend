import type { ResultModalProps } from "@/types/modalTypes";

const PostDeleteResultModal = ({ type, message, onClose }: ResultModalProps) => {
    if (!type) return null;

    const isSuccess = type === "success";

    return (
        <dialog id="result_modal" className="modal backdrop:bg-black backdrop:bg-opacity-50" open>
            <div className="modal-box border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl p-8 max-w-md">
                <div className="text-center">
                    <div className={`w-16 h-16 ${isSuccess
                        ? "bg-gradient-to-r from-green-400 to-green-500"
                        : "bg-gradient-to-r from-red-400 to-red-500"
                        } rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-white text-2xl">
                            {isSuccess ? "✓" : "✕"}
                        </span>
                    </div>
                    <h3 className={`font-bold text-xl mb-2 transition-colors duration-300 ${isSuccess ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
                        }`}>
                        {isSuccess ? "삭제 완료" : "삭제 실패"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                        {message}
                    </p>
                    {isSuccess && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            잠시 후 목록으로 이동합니다...
                        </p>
                    )}
                    <button
                        className={`w-full py-3 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl ${isSuccess
                            ? "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                            : "bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                            }`}
                        onClick={onClose}
                    >
                        확인
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default PostDeleteResultModal;