import { listItem, type ListItemVariants } from "@/components/style/listItem";

/**
 *
 * ListItem 컴포넌트
 * 제목, 작성자, 설명, 좋아요 수, 댓글 수 등 리스트 형태로 콘텐츠를 보여주는 UI
 * 의도(intent) 및 사이즈(size)에 따라 스타일이 달라지며, truncate 및 wrapping 적용
 *
 * @function ListItem.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param title 항목 제목
 * @param writer 작성자
 * @param description 항목 설명
 * @param size 스타일 사이즈
 * @param intent 스타일 의도
 * @param className 추가 클래스
 * @param likes 좋아요 수
 * @param comment 댓글 수
 */

interface ListItemProps extends ListItemVariants {
  title: string;
  writer: string;
  description: string;
  className?: string;
  likes: number;
  comment: number;
}

const ListItem = ({
  title,
  writer,
  description,
  size,
  intent,
  className,
  likes,
  comment,
}: ListItemProps) => {
  const combinedClass = `${listItem({ size, intent })} ${className ?? ""}`.trim();

  return (
    <li className={combinedClass}>
      <div className="w-full overflow-hidden">
        <div className="font-black justify-start text-xl truncate">{title}</div>
      </div>

      <div className="flex-default w-full">
        <div className="flex flex-col justify-between">
          <p className="list-col-wrap text-base flex-1">{description}</p>
          <div className="text-xs uppercase font-semibold opacity-60">{writer}</div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-ghost">
            {/* 여기에 댓글 icon, count 박을 예정 */}
            <span>{comment}</span>
          </button>

          <button className="btn btn-ghost">
            <svg className="size-[1.2em]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="currentColor"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
              </g>
            </svg>

            <span>{likes}</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
