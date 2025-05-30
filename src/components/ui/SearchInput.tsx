// components/SearchInput.tsx
import {
  searchLabel,
  searchInput,
  searchIcon,
  type SearchInputVariants,
} from "../style/searchInput";

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
