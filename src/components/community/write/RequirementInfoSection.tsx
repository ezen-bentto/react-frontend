import React from "react";
import RecruitmentRoleInput from "./RecruitmentRoleInput";

interface Recruitment {
  role: string;
  count: string;
}

interface RequirementInfoSectionProps {
  formData: {
    recruitEndDate: string;
    ageGroup: string;
    recruitments: Recruitment[];
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleRecruitmentChange: (index: number, field: "role" | "count", value: string) => void;
  handleAddRole: () => void;
  handleRemoveRole: (index: number) => void;
}

const RequirementInfoSection: React.FC<RequirementInfoSectionProps> = ({
  formData,
  handleFormChange,
  handleRecruitmentChange,
  handleAddRole,
  handleRemoveRole,
}) => {
  return (
    <div className="card-animation border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">2</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          모집정보를 입력해주세요
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
            ⏰ 모집 종료일
          </label>
          <input
            type="date"
            name="recruitEndDate"
            value={formData.recruitEndDate}
            onChange={handleFormChange}
            className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
          />
        </div>
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
            👥 모집 연령
          </label>
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleFormChange}
            className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-[#2B2B2B] text-gray-800 dark:text-white focus:border-blue-500 focus:ring-0 transition-colors duration-200"
          >
            <option value="" disabled hidden>
              모집 연령을 선택해주세요
            </option>
            <option value="1">대학생</option>
            <option value="2">직장인/일반인</option>
            <option value="3">제한없음</option>
          </select>
        </div>
      </div>

      {/* 모집 역할 섹션 */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
            모집 역할 및 인원
          </h3>
          <button
            type="button"
            onClick={handleAddRole}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:bg-transparent dark:border dark:border-gray-600 text-white dark:text-gray-300 rounded-lg hover:from-blue-600 hover:to-purple-600 dark:hover:bg-gray-800 dark:hover:border-gray-500 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg dark:shadow-none"
          >
            <span>+</span>
            <span>역할 추가</span>
          </button>
        </div>

        {formData.recruitments.map((r, idx) => (
          <RecruitmentRoleInput
            key={idx}
            index={idx}
            role={r.role}
            count={r.count}
            onChange={handleRecruitmentChange}
            onRemove={handleRemoveRole}
            isOnlyOne={formData.recruitments.length === 1}
          />
        ))}
      </div>
    </div>
  );
};

export default RequirementInfoSection;
