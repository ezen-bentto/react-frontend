import React from "react";
import { button, type ButtonVariants } from "../style/button";

/**
 *
 * Button 컴포넌트
 * 다양한 스타일(intent, size)을 적용할 수 있는 버튼 컴포넌트
 *
 * @function Button.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *        2025/06/20           이철욱             useMemo 적용
 *
 * @param intent 버튼의 색상 의도 (예: primary, sky, orange 등)
 * @param size 버튼의 크기 옵션 (예: sm, lg 등)
 * @param children 버튼 안에 들어갈 텍스트 또는 요소
 */

interface ButtonProps extends ButtonVariants {
  type: "button" | "submit";
  onClickFnc: () => void;
}

const Button = ({
  intent,
  type,
  size,
  children,
  onClickFnc,
}: ButtonProps & { children: React.ReactNode }) => {
  return (
    <button type={type} className={button({ intent, size })} onClick={() => onClickFnc()}>
      {children}
    </button>
  );
};

export default React.memo(Button);
