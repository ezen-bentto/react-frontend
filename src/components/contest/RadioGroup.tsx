interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: RadioOption[];
  selectedValue: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  name?: string;
}

export const RadioGroup = ({ options, selectedValue, onChange, name }: RadioGroupProps) => (
  <div className={"flex flex-wrap gap-x-8 gap-y-2"}>
    {options.map(option => (
      <label key={option.value} className="flex items-center space-x-2 text-sm cursor-pointer">
        <div className="relative">
          <input
            type="radio"
            name={name || "radio-group"}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={e => onChange(e.target.value)}
            className="sr-only" // 기본 라디오 버튼 숨기기
          />
          <div 
            className={`w-4 h-4 border-2 rounded-sm flex items-center justify-center transition-colors ${
              selectedValue === option.value
                ? "bg-blue-600 border-blue-600"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
          >
            {selectedValue === option.value && (
              <svg 
                className="w-2.5 h-2.5 text-white" 
                fill="currentColor" 
                viewBox="0 0 20 20"
              >
                <path 
                  fillRule="evenodd" 
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                  clipRule="evenodd" 
                />
              </svg>
            )}
          </div>
        </div>
        <span>{option.label}</span>
      </label>
    ))}
  </div>
);