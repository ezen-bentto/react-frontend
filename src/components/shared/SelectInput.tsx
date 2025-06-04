import { Select } from "antd";
import { selectWrapper, type SelectVariants } from "../style/selectInput";

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
 *        2025/06/04           김수연          라이브러리 변경
 *
 * @param options 드롭다운에 표시할 옵션 문자열 배열
 * @param intent 스타일 의도 (variant) - optional
 * @param size 입력창 크기 (optional) - "sm" | "md"
 *
 */

type SelectInputProps = {
  options: string[]; // "인기순", "최신순" 등
  placeholder?: string;
  defaultValue?: string;
  // onChange?: (value: string) => void;
} & SelectVariants;

const SelectInput = ({
  options,
  placeholder,
  defaultValue,
  // onChange,
  intent,
  size,
}: SelectInputProps) => {
  const mappedOptions = options.map(option => ({
    label: option,
    value: option,
  }));

  return (
    <Select
      className={selectWrapper({ intent, size })}
      options={mappedOptions}
      placeholder={placeholder}
      defaultValue={defaultValue}
      // onChange={onChange}
    />
  );
};

export default SelectInput;
