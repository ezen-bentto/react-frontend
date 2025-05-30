// components/NameField.tsx
import { fieldset, legend, input } from "../style/input";

type InputProps = {
  status?: "normal" | "error" | "success";
  legendText: string;
};

const Input = ({ status = "normal", legendText }: InputProps) => {
  return (
    <fieldset className={fieldset()}>
      <legend className={legend()}>{legendText}</legend>
      <input type="text" className={input({ status })} placeholder="Type here" />
    </fieldset>
  );
};

export default Input;
