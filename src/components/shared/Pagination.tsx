import { joinGroup, joinButton, type JoinButtonVariants } from "../style/pagination";

/**
 *
 * Pagination 컴포넌트
 * 현재 페이지 표시 및 이전/다음 페이지 버튼으로 구성된 간단한 페이지네이션 UI
 * 스타일은 intent, size에 따라 다르게 적용됨
 *
 * @function Pagination.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param currentPage 현재 페이지 번호
 * @param onPrevious 이전 페이지로 이동하는 콜백 함수
 * @param onNext 다음 페이지로 이동하는 콜백 함수
 * @param intent 버튼의 스타일 의도
 * @param size 버튼의 크기
 */

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
      {/* map 을 돌리던가 해서 페이지 버튼을 늘리던가 해야하지 않을까 */}
      <button className={joinButton({ intent, size })}>{currentPage}</button>
      <button className={joinButton({ intent, size })} onClick={onNext}>
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
