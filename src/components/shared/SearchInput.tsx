import React from "react";
import {
  searchLabel,
  searchInput,
  searchIcon,
  type SearchInputVariants,
} from "../style/searchInput";

/**
 *
 * SelectInput 컴포넌트
 * 옵션 배열을 받아 드롭다운 셀렉트 박스를 렌더링하는 UI 컴포넌트
 * intent와 size로 스타일 변형 가능
 *
 * @function SearchInput.tsx
 * @date 2025/06/01
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *        2025/06/01           이철욱             신규작성
 *        2025/06/20           이철욱             useMemo 적용
 *
 * @param options 드롭다운에 표시할 옵션 문자열 배열
 * @param intent 스타일 의도 (variant) - optional
 * @param size 입력창 크기 (optional) - "sm" | "md" | "lg"
 *
 */

interface SearchInputProps extends SearchInputVariants {
  // eslint-disable-next-line no-unused-vars
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({ size, value, onChange }: SearchInputProps) => {
  return (
    <label className={searchLabel()}>
      <svg className={searchIcon()} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <g
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeWidth="2.5"
          fill="none"
          stroke="currentColor"
        >
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </g>
      </svg>
      <input
        type="search"
        placeholder="검색어를 입력해주세요"
        className={searchInput({ size })}
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

export default React.memo(SearchInput);
