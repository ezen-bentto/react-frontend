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

const getCategoryTypeLabel = (categoryType: string): string => {
  const categoryMap: Record<string, string> = {
    1: "포스터/웹툰/콘텐츠",
    2: "사진/영상/UCC",
    3: "아이디어/기획",
    4: "IT/학술/논문",
    5: "네이밍/슬로건",
    6: "스포츠/음악",
    7: "미술/디자인/건축",
  };
  return categoryMap[categoryType] || "기타";
};

const getCommunityTypeLabel = (communityType: string): string => {
  const communityTypeMap: Record<string, string> = {
    "1": "공모전",
    "2": "스터디",
    // "3": "자유",
  };
  return communityTypeMap[communityType] || "공모전";
};

// 1. 모든 타입에 공통으로 필요한 기본 Props
interface ListItemBaseProps extends ListItemVariants {
  linkSrc: string;
  title: string;
  endDate?: string;
  scrapYn?: "Y" | "N";
  onScrapClick?: () => void;
  className?: string;
}

// 2. Community 타입 전용 Props
interface CommunityListItemProps extends ListItemBaseProps {
  type: "community";
  description: string;
  writer?: string;
  comment?: number;
  likes?: number;
  communityType?: string;
  categoryType?: string;
  division?: number;
  region?: string;
}

// 3. Policy 타입 전용 Props
interface PolicyListItemProps extends ListItemBaseProps {
  type: "policy";
  description: string;
  region?: string;
  category?: string;
  comment?: number;
  likes?: number;
  writer?: string;
}

// 4. Contest 타입 전용 Props
interface ContestListItemProps extends ListItemBaseProps {
  type: "contest";
  organizer?: string;
  organizerTypeTag?: string;
  participantsTag?: string;
  categoryTag?: string;
  division?: number;
}

// 5. 위 타입들을 모두 포함하는 최종 Props 타입
type ListItemProps = CommunityListItemProps | PolicyListItemProps | ContestListItemProps;

const ListItem = (props: ListItemProps) => {
  // props를 통째로 받도록 변경
  const { type, title, linkSrc, size, intent, className, endDate, onScrapClick } = props;
  const combinedClass = `${listItem({ size, intent })} ${className ?? ""}`.trim();

  const handleScrapClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onScrapClick) {
      onScrapClick();
    }
  };

  const isCommunityType = type === "community";
  const daysLeft = endDate ? countDate(endDate, isCommunityType) : 0;

  return (
    <li className={combinedClass}>
      <Link to={linkSrc} className="flex-col w-full gap-2 p-4 flex-default">
        <div className="w-full flex justify-between items-start">
          <div className="flex gap-2 flex-wrap">
            {props.type === "policy" && props.category && (
              <Badge size="sm" intent="primary">
                {props.category}
              </Badge>
            )}
            {props.type === "policy" && props.region && (
              <Badge intent="orange" size="sm">
                {props.region}
              </Badge>
            )}
            {props.type === "community" && props.communityType && (
              <Badge size="sm" intent="primary">
                {getCommunityTypeLabel(props.communityType)}
              </Badge>
            )}
            {props.type === "community" && props.categoryType && (
              <Badge size="sm" intent="primary">
                {getCategoryTypeLabel(props.categoryType)}
              </Badge>
            )}
            {props.type === "contest" && props.organizerTypeTag && (
              <Badge size="sm" intent="primary">
                {props.organizerTypeTag}
              </Badge>
            )}
            {props.type === "contest" && props.participantsTag && (
              <Badge size="sm" intent="primary">
                {props.participantsTag}
              </Badge>
            )}
            {props.type === "contest" && props.categoryTag && (
              <Badge size="sm" intent="primary">
                {props.categoryTag}
              </Badge>
            )}
            {(props.type === "contest" || props.type === "community") &&
              props.division !== undefined && (
                <Badge size="sm" intent="primary">
                  {getDivisionLabel(props.division)}
                </Badge>
              )}
          </div>

          {/* D-day 뱃지 로직 */}
          <div className="flex-shrink-0">
            {" "}
            {/* D-day 뱃지가 찌그러지지 않도록 flex-shrink-0 추가 */}
            {endDate && daysLeft > 0 && (
              <Badge intent="orange" size="sm">
                D-{daysLeft}
              </Badge>
            )}
            {endDate && daysLeft <= 0 && (
              <Badge intent="default" size="sm">
                마감
              </Badge>
            )}
          </div>
        </div>

        {/* 제목 */}
        <div className="w-full overflow-hidden">
          <h3 className="justify-start text-2xl font-black truncate">{title}</h3>
        </div>

        {/* 본문 및 하단 정보 */}
        <div className="flex-default w-full">
          <div className="flex justify-center items-start flex-col min-h-[48px] flex-1">
            {props.type === "community" && (
              <p
                className="flex-1 text-base list-col-wrap line-clamp-1"
                dangerouslySetInnerHTML={{
                  __html: (props.description || "").replace(/<img[^>]*>/g, ""),
                }}
              />
            )}
            {props.type === "policy" && (
              <p className="flex-1 text-base list-col-wrap">{props.description}</p>
            )}

            <div className="text-xs font-semibold uppercase opacity-60 mt-2">
              {props.type === "community" && <span>{props.writer}</span>}
              {props.type === "contest" && <span>{props.organizer}</span>}
            </div>
          </div>

          {props.type === "community" && (
            <div className="flex justify-end">
              <button className="btn btn-ghost">
                <CommentOutlined />
                <span>{props.comment}</span>
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
                    fill={props.scrapYn === "Y" ? "currentColor" : "none"}
                    stroke="currentColor"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </g>
                </svg>
                <span>{props.likes}</span>
              </button>
            </div>
          )}
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
