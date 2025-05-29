// components/LoginForm.tsx
import { fieldset, legend, label, input, button, type InputVariants } from "../style/loginForm";

const LoginForm = ({ inputIntent }: { inputIntent?: InputVariants["intent"] }) => {
  return (
    <fieldset className={fieldset()}>
      <legend className={legend()}>Login</legend>

      <label className={label()}>Email</label>
      <input type="email" className={input({ intent: inputIntent })} placeholder="Email" />

      <label className={label()}>Password</label>
      <input type="password" className={input({ intent: inputIntent })} placeholder="Password" />

      <button className={button()}>Login</button>
    </fieldset>
  );
};

export default LoginForm;
