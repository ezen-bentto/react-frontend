interface CheckboxOption {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  selectedValues: string[];
  // eslint-disable-next-line no-unused-vars
  onChange: (values: string[]) => void;
}

export const CheckboxGroup = ({ options, selectedValues, onChange }: CheckboxGroupProps) => (
  <div className={"flex flex-wrap gap-x-8 gap-y-2"}>
    {options.map(option => (
      <label key={option.value} className="flex items-center space-x-2 text-sm cursor-pointer">
        <input
          type="checkbox"
          checked={selectedValues.includes(option.value)}
          onChange={e => {
            if (e.target.checked) {
              onChange([...selectedValues, option.value]);
            } else {
              onChange(selectedValues.filter(v => v !== option.value));
            }
          }}
          // className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          className="w-4 h-4 border-2 rounded-sm flex items-center justify-center"
        />
        <span>{option.label}</span>
      </label>
    ))}
  </div>
);
