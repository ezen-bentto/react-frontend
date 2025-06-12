import type { getContestList } from "@/schemas/contest.schema";
import React from "react";
import { Link } from "react-router-dom";

const PopularContestCard: React.FC<getContestList> = ({
  title,
  img,
  organizer,
  prize,
  start_date,
  end_date,
  participants,
  benefits,
  contest_tag,
  id,
}) => {
  return (
    <li
      className="shadow-md min-w-[300px] max-w-[calc(50%-16px)] p-6 overflow-hidden "
      data-aos="flip-left"
    >
      <Link to={`/constet/${id}`} className="flex gap-4 no-underline">
        <img src={img} alt={title} className="flex-1 w-1/2 object-cover aspect-[5/7]" />
        <div className="flex-1 flex flex-col justify-start gap-4">
          <div className="flex flex-col max-w-[300px] overflow-hidden min-w-0">
            <div className="overflow-hidden text-xl font-bold break-words line-clamp-2">
              {title}
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 py-4 flex-1 text-md">
            <p className="">
              <span>주최사 : </span>
              <span className="">{organizer}</span>
            </p>
            <p className="">
              <span>태그 : </span>
              <span>{contest_tag}</span>
            </p>
            <p className="">
              <span>상금 : </span>
              <span>{prize}</span>
            </p>
            <p className="">
              <span>참가 대상 : </span>
              <span>{participants}</span>
            </p>
            <p className="">
              <span>혜택 : </span>
              <span>{benefits}</span>
            </p>
            <p className="">
              <span>기간 : </span>
              <span>
                {start_date} ~ {end_date}
              </span>
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PopularContestCard;
