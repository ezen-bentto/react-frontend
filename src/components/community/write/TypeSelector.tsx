import React from "react";

interface TypeSelectorProps {
  selectedOption: "1" | "2" | "3";
  setSelectedOption: (value: "1" | "2" | "3") => void;
  isEditMode: boolean;
}

const typeOptions = [
  {
    value: "1",
    label: "공모전",
    icon: "🏆",
    color: "from-yellow-400 to-orange-500",
    description: "공모전 팀원을 모집해보세요",
  },
  {
    value: "2",
    label: "스터디",
    icon: "📚",
    color: "from-green-400 to-blue-500",
    description: "함께 공부할 팀원을 찾아보세요",
  },
  // {
  //   value: "3",
  //   label: "자유",
  //   icon: "💬",
  //   color: "from-purple-400 to-pink-500",
  //   description: "자유롭게 이야기를 나눠보세요",
  // },
] as const;

const TypeSelector: React.FC<TypeSelectorProps> = ({
  selectedOption,
  setSelectedOption,
  isEditMode,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {typeOptions.map(option => (
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
            onChange={() => setSelectedOption(option.value)}
            checked={selectedOption === option.value}
            disabled={isEditMode}
            className="sr-only"
          />
          <div
            className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center text-2xl mr-4`}
          >
            {option.icon}
          </div>
          <div>
            <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg transition-colors duration-300">
              {option.label}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">
              {option.description}
            </div>
          </div>
          {selectedOption === option.value && (
            <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
          )}
        </label>
      ))}

      {isEditMode && <input type="hidden" name="communityType" value={selectedOption} />}
    </div>
  );
};

export default TypeSelector;
