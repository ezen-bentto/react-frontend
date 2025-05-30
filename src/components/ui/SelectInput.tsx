// components/SelectInput.tsx
import { select, type SelectVariants } from "../style/selectInput";

type SelectInputProps = {
  options: string[];
  placeholder?: string;
} & SelectVariants;

const SelectInput = ({ options, intent, size }: SelectInputProps) => {
  return (
    <select className={select({ intent, size })}>
      {options.map(option => (
        <option key={option}>{option}</option>
      ))}
    </select>
  );
};

export default SelectInput;
