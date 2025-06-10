import { listItem, type ListItemVariants } from "@/components/style/listItem";
import { CommentOutlined } from "@ant-design/icons";
import Badge from "./Badge";
import { Link } from "react-router-dom";
import countDate from "@/utils/countDate";

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
 *        2025/06/08           이철욱               매개변수 추가 및 type 에 따른 컴포넌트 변화
 *
 * @param title 항목 제목
 * @param writer 작성자
 * @param description 항목 설명
 * @param size 스타일 사이즈
 * @param intent 스타일 의도
 * @param className 추가 클래스
 * @param likes 좋아요 수
 * @param comment 댓글 수
 * @param type community, policy 타입
 * @param linkSrc a 태그 href
 * @param region policy 지역
 * @param endDate community 공모전 종료 날짜
 */

interface ListItemProps extends ListItemVariants {
  type: "community" | "policy";
  title: string;
  writer?: string;
  description: string;
  className?: string;
  likes?: number;
  comment?: number;
  linkSrc: string;
  region?: string;
  endDate?: string;
}

const ListItem = ({
  type,
  title,
  writer,
  description,
  size,
  intent,
  className,
  likes,
  comment,
  linkSrc,
  region,
  endDate,
}: ListItemProps) => {
  const combinedClass = `${listItem({ size, intent })} ${className ?? ""}`.trim();

  return (
    <li className={combinedClass}>
      <Link to={linkSrc} className="flex-default flex-col gap-2 p-4 w-full">
        <div className="w-full flex-default">
          <div className="flex-default gap-2">
            <Badge size={"sm"} intent={"primary"}>
              건설
            </Badge>
            {type === "policy" && (
              <div className="flex-default gap-2">
                <Badge intent={"orange"} size={"sm"}>
                  {region}
                </Badge>
              </div>
            )}
          </div>
          {type === "community" && (
            <div className="flex-default gap-2">
              <Badge intent={"default"} size={"sm"}>
                공모전
              </Badge>
              <Badge intent={"orange"} size={"sm"}>
                D-{countDate(endDate ? endDate : "error")}
              </Badge>
            </div>
          )}
        </div>

        <div className="w-full overflow-hidden">
          <h3 className="font-black justify-start text-2xl truncate">{title}</h3>
        </div>

        <div className="flex-default w-full">
          <div className="flex justify-start items-center flex-col ">
            <p className="list-col-wrap text-base flex-1">{description}</p>
            {type === "community" && (
              <div className="text-xs uppercase font-semibold opacity-60 w-full">{writer}</div>
            )}
          </div>

          {type === "community" && (
            <div className="flex justify-end">
              <button className="btn btn-ghost">
                <CommentOutlined />
                <span>{comment}</span>
              </button>

              <button className="btn btn-ghost">
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
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
          )}
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
