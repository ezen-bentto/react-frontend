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
    <li className={combinedClass}>
      <div className="w-full overflow-hidden">
        <Avatar src={imgSrc} shape="circle" size="xl" alt={writer} />
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <p className="list-col-wrap text-base flex-1">{content}</p>
          <div className="text-xs uppercase font-semibold opacity-60">{writeDate}</div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-ghost"></button>
        </div>
      </div>
    </li>
  );
};

export default CommentItem;
