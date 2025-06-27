import React from "react";
import type { Contest } from "@/api/contest/listByCategory";
import type { Category } from "@/api/common/category";

interface ContestSelectProps {
    selectedCategory: Category | null;
    contests: Contest[];
    selectedContest: Contest | null;
    isDropdownOpen: boolean;
    isLoading: boolean;
    setIsDropdownOpen: (open: boolean) => void;
    onSelect: (contest: Contest) => void;
}

const ContestSelect: React.FC<ContestSelectProps> = ({
    selectedCategory,
    contests,
    selectedContest,
    isDropdownOpen,
    isLoading,
    setIsDropdownOpen,
    onSelect,
}) => {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                🎪 참여 공모전
            </label>
            <div className="relative">
                <div
                    className={`w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-transparent cursor-pointer flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-500 focus-within:border-blue-500 transition-colors duration-200 ${!selectedCategory ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (selectedCategory && contests.length > 0) {
                            setIsDropdownOpen(!isDropdownOpen);
                        }
                    }}
                >
                    <span
                        className={
                            selectedContest
                                ? "text-gray-800 dark:text-gray-200 font-medium"
                                : "text-gray-400 dark:text-gray-500"
                        }
                    >
                        {isLoading
                            ? "공모전을 불러오는 중..."
                            : selectedContest
                                ? selectedContest.title
                                : selectedCategory
                                    ? contests.length > 0
                                        ? "참여할 공모전을 선택해주세요"
                                        : "진행중인 공모전이 없습니다"
                                    : "먼저 분야를 선택해주세요"}
                    </span>
                    <span
                        className={`transition-transform duration-200 text-gray-600 dark:text-gray-400 ${isDropdownOpen ? "rotate-180" : ""
                            }`}
                    >
                        ▼
                    </span>
                </div>

                {isDropdownOpen &&
                    selectedCategory &&
                    contests.length > 0 && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2B2B2B] border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                            {contests.map((contest, index) => (
                                <div
                                    key={contest.contest_id}
                                    className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 ${index !== contests.length - 1
                                            ? "border-b border-gray-100 dark:border-gray-600"
                                            : ""
                                        } ${index === 0 ? "rounded-t-xl" : ""} ${index === contests.length - 1 ? "rounded-b-xl" : ""
                                        }`}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        onSelect(contest);
                                    }}
                                >
                                    <span className="text-gray-800 dark:text-white font-medium block">
                                        {contest.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
            </div>
        </div>
    );
};

export default ContestSelect;
