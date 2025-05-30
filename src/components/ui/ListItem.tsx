import { listItem, type ListItemVariants } from "@/components/style/listItem";

interface ListItemProps extends ListItemVariants {
  title: string;
  writer: string;
  description: string;
  className?: string;
  comment: number;
}

const ListItem = ({
  title,
  writer,
  description,
  size,
  intent,
  className,
  comment,
}: ListItemProps) => {
  const combinedClass = `${listItem({ size, intent })} ${className ?? ""}`.trim();

  return (
    <li className={combinedClass}>
      <div className="w-full overflow-hidden">
        <div className="font-black justify-start text-xl truncate">{title}</div>
      </div>

      <div className="flex justify-between w-full">
        <div className="flex flex-col justify-between">
          <p className="list-col-wrap text-base flex-1">{description}</p>
          <div className="text-xs uppercase font-semibold opacity-60">{writer}</div>
        </div>
        <div className="flex justify-end">
          <button className="btn btn-ghost"></button>

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

            <span>{comment}</span>
          </button>
        </div>
      </div>
    </li>
  );
};

export default ListItem;
