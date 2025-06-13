import { joinGroup, joinButton, type JoinButtonVariants } from "../style/pagination";

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
  const delta = 2;

  const createPageRange = () => {
    const range: (number | "...")[] = [];
    const left = Math.max(2, currentPage - delta);
    const right = Math.min(totalPages - 1, currentPage + delta);

    range.push(1);
    if (left > 2) range.push("...");

    for (let i = left; i <= right; i++) {
      range.push(i);
    }

    if (right < totalPages - 1) range.push("...");
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = createPageRange();

  return (
    <div className={joinGroup()}>
      <button
        className={joinButton({ intent, size })}
        onClick={onPrevious}
        disabled={currentPage === 1}
      >
        {"<"}
      </button>
      {pages.map((item, idx) =>
        item === "..." ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">
            ...
          </span>
        ) : (
          <button
            key={item}
            onClick={() => onPageChange(item)}
            className={joinButton({
              intent: currentPage === item ? "active" : intent,
              size,
            })}
          >
            {item}
          </button>
        )
      )}
      <button
        className={joinButton({ intent, size })}
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
