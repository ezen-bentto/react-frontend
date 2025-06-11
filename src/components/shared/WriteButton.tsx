import { useNavigate } from "react-router-dom";
import { fixedCircleBtn } from "../style/fixedCircleBtn";

/**
 *
 * WriteButton 컴포넌트
 * 화면 우측 하단 고정된 위치에 나타나는 원형 글쓰기 버튼
 * 클릭 시 /write 경로로 이동하며, Pen 아이콘을 내부에 렌더링
 *
 * @function WriteButton.tsx
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           이철욱               신규작성
 *
 * @component
 * @returns TSX.Element
 */

export const PenIcon = ({ className }: { className: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className} // Tailwind로 사이즈 조절
  >
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 000-1.41l-2.34-2.34a1 1 0 00-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
);

const WriteButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/write")}
      aria-label="Write post"
      className={fixedCircleBtn({ color: "write" })}
    >
      <PenIcon className={"w-10 h-10 text-white"} />
    </button>
  );
};

export default WriteButton;
