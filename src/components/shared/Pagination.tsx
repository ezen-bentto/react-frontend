import { joinGroup, joinButton, type JoinButtonVariants } from "../style/pagination";
import { v4 as uuidv4 } from "uuid";

type PaginationProps = {
  currentPage: number; // 현재 페이지 (필수로 처리)
  totalPages: number; // 전체 페이지 수
  onPrevious: () => void;
  onNext: () => void;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void; // 페이지 번호 클릭 시 콜백
} & JoinButtonVariants;

const Pagination = ({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
  intent,
  size,
}: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => ({
    id: uuidv4(),
    value: i + 1,
  }));

  return (
    <div className={joinGroup()}>
      <button className={joinButton({ intent, size })} onClick={onPrevious}>
        {"<"}
      </button>

      {pages.map(page => (
        <button
          key={page.id}
          className={joinButton({
            intent: page.value === currentPage ? "active" : intent, // 현재 페이지면 강조
            size,
          })}
          onClick={() => onPageChange(page.value)}
        >
          {page.value}
        </button>
      ))}

      <button className={joinButton({ intent, size })} onClick={onNext}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
