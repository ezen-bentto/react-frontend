// Button.tsx
import { button, type ButtonVariants } from "../style/button";

const Button = ({ intent, size, children }: ButtonVariants & { children: React.ReactNode }) => {
  return <button className={button({ intent, size })}>{children}</button>;
};

export default Button;
