import { Link } from "react-router-dom";
import { card, type CardVariants } from "../style/card";
import Badge from "./Badge";

/**
 *
 * Card 컴포넌트
 * 공모전 등의 정보를 보여주는 카드 UI 컴포넌트
 * 제목, 설명, 이미지, 디데이 뱃지를 표시하며, 클릭 시 상세 페이지로 이동한다.
 * `size`, `intent` 속성을 받아 스타일을 유연하게 조정할 수 있다.
 *
 * @function Card.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param id 공모전 고유 ID로, 해당 값을 링크 경로로 사용
 * @param dday 마감일까지 남은 기간을 나타내는 문자열 (예: "D-3")
 * @param img 카드에 표시할 썸네일 이미지 경로
 * @param title 카드 제목
 * @param text 카드 설명
 * @param size 카드 크기 설정 값 (예: sm, md, lg)
 * @param intent 카드의 색상 테마 설정 값 ("neutral" | "primary" | "warning")
 * @param className 외부에서 전달받은 추가 클래스 이름
 */

interface CardProps extends CardVariants {
  id: number;
  dday: string;
  img: string;
  title: string;
  text: string;
  className?: string;
}

const Card = ({ id, dday, img, title, text, size, intent, className }: CardProps) => {
  const combinedClass = `relative ${card({ size, intent })} ${className ?? ""}`.trim();

  return (
    <Link to={`/contest/${id}`}>
      <div className={combinedClass}>
        <div className="p-4 flex justify-end absolute w-full">
          <Badge intent="orange">{dday}</Badge>
        </div>
        <figure className="">
          <img
            src={img}
            alt={title}
            className="aspect-[4/3] w-full object-cover object-top overflow-hidden"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{text}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
