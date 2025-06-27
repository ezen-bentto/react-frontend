import React from "react";
import type { Category } from "@/api/common/category";

interface CategorySelectProps {
  categories: Category[];
  selectedCategory: Category | null;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  onSelect: (category: Category) => void;
}

const CategorySelect: React.FC<CategorySelectProps> = ({
  categories,
  selectedCategory,
  isDropdownOpen,
  setIsDropdownOpen,
  onSelect,
}) => {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
        🎯 분야
      </label>
      <div className="relative">
        <div
          className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-transparent cursor-pointer flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-500 focus-within:border-blue-500 transition-colors duration-200"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setIsDropdownOpen(!isDropdownOpen);
          }}
        >
          <span
            className={
              selectedCategory
                ? "text-gray-800 dark:text-gray-200 font-medium"
                : "text-gray-400 dark:text-gray-500"
            }
          >
            {selectedCategory ? selectedCategory.name : "공모전 분야를 선택해주세요"}
          </span>
          <span
            className={`transition-transform duration-200 text-gray-600 dark:text-gray-400 ${isDropdownOpen ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </div>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2B2B2B] border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <div
                  key={category.category_id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150
                    ${index !== categories.length - 1 ? "border-b border-gray-100 dark:border-gray-600" : ""}
                    ${index === 0 ? "rounded-t-xl" : ""} ${index === categories.length - 1 ? "rounded-b-xl" : ""}`}
                  onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelect(category);
                  }}
                >
                  <span className="text-gray-800 dark:text-white font-medium">{category.name}</span>
                </div>
              ))
            ) : (
              <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                카테고리를 불러오는 중...
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelect;
