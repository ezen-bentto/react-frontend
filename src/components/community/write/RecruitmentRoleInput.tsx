import React from "react";

interface RecruitmentRoleInputProps {
    index: number;
    role: string;
    count: string;
    onChange: (index: number, field: "role" | "count", value: string) => void;
    onRemove: (index: number) => void;
    isOnlyOne: boolean;
}

const RecruitmentRoleInput: React.FC<RecruitmentRoleInputProps> = ({
    index,
    role,
    count,
    onChange,
    onRemove,
    isOnlyOne,
}) => {
    return (
        <div className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 transition-colors duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        💼 역할 {index + 1}
                    </label>
                    <input
                        type="text"
                        placeholder="예: 프론트엔드 개발자"
                        value={role}
                        onChange={e => onChange(index, "role", e.target.value)}
                        className="w-full h-10 px-3 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                    />
                </div>
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                        👤 모집 인원
                    </label>
                    <input
                        type="number"
                        placeholder="1"
                        min={1}
                        value={count}
                        onChange={e => onChange(index, "count", e.target.value)}
                        className="w-full h-10 px-3 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                    />
                </div>
            </div>

            {!isOnlyOne && (
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={() => onRemove(index)}
                        className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 text-sm"
                    >
                        삭제
                    </button>
                </div>
            )}
        </div>
    );
};

export default RecruitmentRoleInput;
