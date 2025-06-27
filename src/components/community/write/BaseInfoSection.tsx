import React from "react";
import CategorySelect from "./CategorySelect";
import ContestSelect from "./ContestSelect";
import type { Category } from "@/api/common/category";
import type { Contest } from "@/api/contest/listByCategory";

interface BaseInfoSectionProps {
    selectedOption: "1" | "2" | "3";
    setSelectedOption: (val: "1" | "2" | "3") => void;
    isEditMode: boolean;
    categories: Category[];
    selectedCategory: Category | null;
    isCategoryDropdownOpen: boolean;
    setIsCategoryDropdownOpen: (val: boolean) => void;
    handleCategorySelect: (category: Category) => void;
    contests: Contest[];
    selectedContest: Contest | null;
    isContestDropdownOpen: boolean;
    isLoadingContests: boolean;
    setIsContestDropdownOpen: (val: boolean) => void;
    handleContestSelect: (contest: Contest) => void;
    formData: { startDate: string; endDate: string };
    handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseInfoSection: React.FC<BaseInfoSectionProps> = ({
    selectedOption,
    setSelectedOption,
    isEditMode,
    categories,
    selectedCategory,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    handleCategorySelect,
    contests,
    selectedContest,
    isContestDropdownOpen,
    isLoadingContests,
    setIsContestDropdownOpen,
    handleContestSelect,
    formData,
    handleFormChange,
}) => {
    return (
        <div className="card-animation border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                    <span className="text-white font-bold text-lg">1</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    기본 정보를 입력해주세요
                </h2>
            </div>

            {/* 유형 선택 라디오 버튼 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                    {
                        value: "1",
                        label: "공모전",
                        icon: "🏆",
                        color: "from-yellow-400 to-orange-500",
                    },
                    {
                        value: "2",
                        label: "스터디",
                        icon: "📚",
                        color: "from-green-400 to-blue-500",
                    },
                    {
                        value: "3",
                        label: "자유",
                        icon: "💬",
                        color: "from-purple-400 to-pink-500",
                    },
                ].map((option) => (
                    <label
                        key={option.value}
                        className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
            ${selectedOption === option.value ? "border-blue-500 shadow-lg" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}
            ${isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        <input
                            type="radio"
                            name="communityType"
                            value={option.value}
                            onChange={() => setSelectedOption(option.value as "1" | "2" | "3")}
                            checked={selectedOption === option.value}
                            disabled={isEditMode}
                            className="sr-only"
                        />
                        <div className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center text-2xl mr-4`}>
                            {option.icon}
                        </div>
                        <div>
                            <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg transition-colors duration-300">
                                {option.label}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">
                                {option.value === "1" && "공모전 팀원을 모집해보세요"}
                                {option.value === "2" && "함께 공부할 팀원을 찾아보세요"}
                                {option.value === "3" && "자유롭게 이야기를 나눠보세요"}
                            </div>
                        </div>
                        {selectedOption === option.value && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm">✓</span>
                            </div>
                        )}
                    </label>
                ))}
                {isEditMode && (
                    <input type="hidden" name="communityType" value={selectedOption} />
                )}
            </div>

            {/* 공모전일 때만 분야/공모전 선택 및 날짜 */}
            {selectedOption === "1" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                    <CategorySelect
                        categories={categories}
                        selectedCategory={selectedCategory}
                        isDropdownOpen={isCategoryDropdownOpen}
                        setIsDropdownOpen={setIsCategoryDropdownOpen}
                        onSelect={handleCategorySelect}
                    />
                    <ContestSelect
                        selectedCategory={selectedCategory}
                        contests={contests}
                        selectedContest={selectedContest}
                        isDropdownOpen={isContestDropdownOpen}
                        isLoading={isLoadingContests}
                        setIsDropdownOpen={setIsContestDropdownOpen}
                        onSelect={handleContestSelect}
                    />
                </div>
            )}

            {/* 시작일 / 종료일 */}
            {selectedOption !== "3" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                            📅 시작일
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleFormChange}
                            className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                        />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                            📅 종료일
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleFormChange}
                            className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default BaseInfoSection;
