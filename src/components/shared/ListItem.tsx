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
 *        2025/06/10           김혜미               커뮤니티 매개변수 추가
 *
 * @param title 항목 제목
 * @param writer 작성자
 * @param description 항목 설명
 * @param size 스타일 사이즈
 * @param intent 스타일 의도
 * @param className 추가 클래스
 * @param likes 좋아요 수
 * @param comment 댓글 수
 * @param category 청년 정책 카테고리
 * @param type community, policy 타입
 * @param linkSrc a 태그 href
 * @param region policy 지역
 * @param endDate community 공모전 종료 날짜
 * @param division 공모전 분류
 * @param communityType 커뮤니티 분류(공모전, 스터디, 자유)
 * @param scrapYn 스크랩 여부 (Y/N)
 */

const getDivisionLabel = (division: number): string => {
  const divisionMap: Record<number, string> = {
    1: "포스터/웹툰/콘텐츠",
    2: "사진/영상/UCC",
    3: "아이디어/기획",
    4: "IT/학술/논문",
    5: "네이밍/슬로건",
    6: "스포츠/음악",
    7: "미술/디자인/건축",
  };
  return divisionMap[division] || "기타";
};

const getCommunityTypeLabel = (communityType: string): string => {
  const communityTypeMap: Record<string, string> = {
    "1": "공모전",
    "2": "스터디",
    "3": "자유",
  };
  return communityTypeMap[communityType] || "공모전";
};

interface ListItemProps extends ListItemVariants {
  type: "community" | "policy";
  title: string;
  writer?: string;
  description: string;
  className?: string;
  category?: string;
  likes?: number;
  comment?: number;
  linkSrc: string;
  region?: string;
  endDate?: string;
  division?: number;
  communityType?: string;
  scrapYn?: "Y" | "N";
  onScrapClick?: () => void;
}

const ListItem = ({
  type,
  title,
  writer,
  description,
  size,
  intent,
  className,
  category,
  likes,
  comment,
  linkSrc,
  region,
  endDate,
  division,
  communityType,
  scrapYn,
  onScrapClick,
}: ListItemProps) => {
  const combinedClass = `${listItem({ size, intent })} ${className ?? ""}`.trim();

  const handleScrapClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Link 클릭 방지
    e.stopPropagation();

    if (onScrapClick) {
      onScrapClick();
    }
  };

  return (
    <li className={combinedClass}>
      <Link to={linkSrc} className="flex-col w-full gap-2 p-4 flex-default">
        <div className="w-full flex-default">
          <div className="gap-2 flex-default">
            {type === "policy" && (
              <Badge size="sm" intent="primary">
                {category !== undefined ? category : "기타"}
              </Badge>
            )}
            {type === "community" && communityType === "1" && (
              <Badge size="sm" intent="primary">
                {division !== undefined ? getDivisionLabel(division) : "기타"}
              </Badge>
            )}
            {type === "policy" && (
              <div className="gap-2 flex-default">
                <Badge intent={"orange"} size={"sm"}>
                  {region}
                </Badge>
              </div>
            )}
          </div>
          {type === "community" && communityType !== "3" && (
            <div className="gap-2 flex-default">
              <Badge intent={"default"} size={"sm"}>
                {communityType !== undefined ? getCommunityTypeLabel(communityType) : "기타"}
              </Badge>
              <Badge intent={"orange"} size={"sm"}>
                {/* D- */}
                {countDate(endDate ?? "error") <= 0 ? "마감" : `D-${countDate(endDate ?? "error")}`}
              </Badge>
            </div>
          )}
        </div>

        <div className="w-full overflow-hidden">
          <h3 className="justify-start text-2xl font-black truncate">{title}</h3>
        </div>

        <div className="flex-default w-full">
          <div className="flex justify-center items-start flex-col min-h-[48px]">
            {type === "community" ? (
              <p
                className="flex-1 text-base list-col-wrap"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="flex-1 text-base list-col-wrap">{description}</p>
            )}
            {type === "community" && (
              <div className="text-xs font-semibold uppercase opacity-60">{writer}</div>
            )}
          </div>

          {type === "community" && (
            <div className="flex justify-end">
              <button className="btn btn-ghost">
                <CommentOutlined />
                <span>{comment}</span>
              </button>

              <button className="btn btn-ghost" onClick={handleScrapClick}>
                <svg
                  className="size-[1.2em]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <g
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth="2"
                    fill={type === "community" && scrapYn === "Y" ? "currentColor" : "none"}
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
