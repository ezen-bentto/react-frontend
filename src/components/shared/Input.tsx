import { fieldset, legend, input } from "../style/input";
import { type InputHTMLAttributes } from "react";

/**
 *
 * Input 컴포넌트
 * 사용자 이름 등의 단일 텍스트 입력을 위한 인풋 UI 컴포넌트
 * 상태에 따라 스타일이 다르게 적용되며, 입력 필드 위에 범례 텍스트를 보여준다.
 *
 * @function NameField.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param status 입력창 상태 ("normal" | "error" | "success")
 * @param legendText 입력 필드를 설명하는 레전드 텍스트
 */

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  status?: "normal" | "error" | "success";
  legendText: string;
};

const Input = ({ status = "normal", legendText, className, ...props }: InputProps) => {
  const baseStyle = input({ status });
  const combinedClass = `${baseStyle} ${className ?? ""}`.trim();

  return (
    <fieldset className={fieldset()}>
      <legend className={legend()}>{legendText}</legend>
      <input className={combinedClass} {...props} />
    </fieldset>
  );
};

export default Input;
