import { select, type SelectVariants } from "../style/selectInput";

/**
 *
 * SelectInput 컴포넌트
 * 옵션 배열을 받아 드롭다운 셀렉트 박스를 렌더링하는 UI 컴포넌트
 * intent와 size로 스타일 변형 가능
 *
 * @function SelectInput.tsx
 * @date 2025/06/01
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *        2025/06/01           이철욱             신규작성
 *
 * @param options 드롭다운에 표시할 옵션 문자열 배열
 * @param intent 스타일 의도 (variant) - optional
 * @param size 입력창 크기 (optional) - "sm" | "md" | "lg"
 *
 */

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
