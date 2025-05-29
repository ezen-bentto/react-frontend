// components/NameField.tsx
import { fieldset, legend, input, optionalLabel } from "../style/nameField";

type NameFieldProps = {
  status?: "normal" | "error" | "success";
};

const NameField = ({ status = "normal" }: NameFieldProps) => {
  return (
    <fieldset className={fieldset()}>
      <legend className={legend()}>What is your name?</legend>
      <input type="text" className={input({ status })} placeholder="Type here" />
      <p className={optionalLabel()}>Optional</p>
    </fieldset>
  );
};

export default NameField;
