// components/SelectInput.tsx
import { select, type SelectVariants } from "../style/selectInput";

type SelectInputProps = {
  options: string[];
  placeholder?: string;
} & SelectVariants;

const SelectInput = ({
  options,
  placeholder = "Pick an option",
  intent,
  size,
}: SelectInputProps) => {
  return (
    <select defaultValue={placeholder} className={select({ intent, size })}>
      <option disabled>{placeholder}</option>
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default SelectInput;
