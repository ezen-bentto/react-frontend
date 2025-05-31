import { comment, type CommentVariants } from "@/components/style/comment";
import Avatar from "./Avatar";

/**
 *
 * CommentItem 컴포넌트
 * 댓글 정보를 시각적으로 표시하는 컴포넌트
 * 작성자 아바타, 작성자 이름, 작성일, 댓글 내용, 수정/삭제 버튼을 포함한다.
 * 스타일은 size, intent, className 등을 통해 조정 가능하다.
 *
 * @function CommentItem.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *
 * @param writer 댓글 작성자 이름
 * @param writeDate 댓글 작성일
 * @param content 댓글 내용
 * @param imgSrc 작성자의 아바타 이미지 주소
 * @param size 스타일 사이즈 ("md" | "lg")
 * @param intent 스타일 테마 ("default")
 * @param className 외부에서 전달받은 추가 클래스 이름
 */

interface CommentProps extends CommentVariants {
  writer: string;
  writeDate: string;
  content: string;
  imgSrc: string;
  className: string;
}

const CommentItem = ({
  writer,
  writeDate,
  content,
  imgSrc,
  size,
  intent,
  className,
}: CommentProps) => {
  const combinedClass = `${comment({ size, intent })} ${className ?? ""}`.trim();

  return (
    <li className={`${combinedClass}`}>
      <div>
        <Avatar src={imgSrc} shape="circle" size="md" alt={writer} />
      </div>

      <div className="flex-default w-full">
        <div className="flex flex-col w-full justify-between">
          <div className="text-xs uppercase font-semibold opacity-60">{writer}</div>
          <p className="list-col-wrap flex-1 text-xl">{content}</p>
          <div className="text-xs uppercase font-semibold opacity-60">{writeDate}</div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-ghost">수정</button>
          <button className="btn btn-ghost">삭제</button>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
