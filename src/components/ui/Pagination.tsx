// components/Pagination.tsx
import { joinGroup, joinButton, type JoinButtonVariants } from "../style/pagination";

type PaginationProps = {
  currentPage: number;
  onPrevious: () => void;
  onNext: () => void;
} & JoinButtonVariants;

const Pagination = ({ currentPage, onPrevious, onNext, intent, size }: PaginationProps) => {
  return (
    <div className={joinGroup()}>
      <button className={joinButton({ intent, size })} onClick={onPrevious}>
        {"<"}
      </button>
      <button className={joinButton({ intent, size })}>{currentPage}</button>
      <button className={joinButton({ intent, size })} onClick={onNext}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
