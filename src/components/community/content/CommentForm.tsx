import Button from "@/components/shared/Button";
import type { CommentFormProps } from "@/types/commentType";
import { useState } from "react";

const CommentForm = ({ onSubmit, onCancel, isSubmitting }: CommentFormProps) => {
    const [value, setValue] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = value.trim();
        if (!trimmed) return;
        await onSubmit(trimmed);
        setValue(""); // 초기화
    };

    return (
        <form
            onSubmit={handleSubmit}
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
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="댓글을 입력해주세요..."
                        className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-[#2B2B2B] border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        rows={3}
                        disabled={isSubmitting}
                    />

                    <div className="flex justify-end gap-2 mt-2">
                        <Button
                            type="button"
                            intent="primary"
                            size="sm"
                            onClickFnc={onCancel}
                        >
                            취소
                        </Button>
                        <Button
                            type="submit"
                            intent="orange"
                            size="sm"
                            onClickFnc={() => { }}
                        >
                            {isSubmitting ? "등록중..." : "등록"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default CommentForm;
