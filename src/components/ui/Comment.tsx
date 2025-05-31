import { comment, type CommentVariants } from "@/components/style/comment";
import Avatar from "./Avatar";

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
      <div className="">
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
