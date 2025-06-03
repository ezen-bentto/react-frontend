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

const SearchInput = ({ size }: { size?: SearchInputVariants["size"] }) => {
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
      <input type="search" required placeholder="Search" className={searchInput({ size })} />
    </label>
  );
};

export default SearchInput;
