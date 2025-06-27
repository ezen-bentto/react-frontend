import React from "react";

interface SubmitModalProps {
    isEditMode: boolean;
    onConfirm: () => void;
}

const SubmitModal: React.FC<SubmitModalProps> = ({ isEditMode, onConfirm }) => {
    return (
        <dialog id="alert_modal" className="modal backdrop:bg-black backdrop:bg-opacity-50" open>
            <div className="modal-box border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl p-8 max-w-md">
                <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-white text-2xl">✓</span>
                    </div>
                    <h3 className="font-bold text-xl text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">
                        {isEditMode ? "수정 완료" : "등록 완료"}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 transition-colors duration-300">
                        {isEditMode
                            ? "게시글이 성공적으로 수정되었습니다."
                            : "새로운 게시글이 성공적으로 등록되었습니다."}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                        {isEditMode
                            ? "잠시 후 상세 페이지로 이동합니다..."
                            : "잠시 후 목록으로 이동합니다..."
                        }
                    </p>
                    <button
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
                        onClick={onConfirm}
                    >
                        확인
                    </button>
                </div>
            </div>
        </dialog>
    );
};

export default SubmitModal;