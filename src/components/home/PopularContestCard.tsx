import React from "react";

interface PopularContestCardProps {
  href: number;
  imgSrc: string;
  region: string;
  title: string;
  participants: string;
  summary: string;
}

const PopularContestCard: React.FC<PopularContestCardProps> = ({
  href,
  imgSrc,
  region,
  title,
  summary,
  participants,
}) => {
  return (
    <li
      className="shadow-md min-w-[300px] max-w-[calc(50%-16px)] p-6 overflow-hidden "
      data-aos="flip-left"
    >
      <a href={`/constet/${href}`} className="flex gap-4 no-underline">
        <img src={imgSrc} alt={title} className="flex-1 w-1/2 object-cover aspect-[5/7]" />
        <div className="flex-1 flex flex-col justify-start">
          <div className="flex flex-col max-w-[300px] overflow-hidden min-w-0">
            <div className="overflow-hidden text-xl font-bold break-words line-clamp-2">
              {title}
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 py-4 flex-1 text-md">
            <p className="">{region}</p>
            <p className="">{participants}</p>
            <p className="">{summary}</p>
          </div>
        </div>
      </a>
    </li>
  );
};

export default PopularContestCard;
