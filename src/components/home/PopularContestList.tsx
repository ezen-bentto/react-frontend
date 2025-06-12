import { useEffect, useState } from "react";
import Title from "../shared/Title";
import PopularContestCard from "./PopularContestCard";
import type { Contest } from "@/types/contestType";
import { useContestStore } from "@/store/contest/useContest";

function PopularContestList() {
  const { popularContests } = useContestStore();
  const [top4, setTop4] = useState<Contest[]>();

  // const fetchData = async () => {};

  useEffect(() => {
    const slicedWithId = popularContests.slice(0, 4);
    setTop4(slicedWithId);
  }, [popularContests]);
  return (
    <div className="flex-default flex-col w-full gap-8">
      <Title linkSrc="/contest" titleText="주목받는 공모전" />
      <ul className="flex items-center md:justify-between justify-center flex-wrap gap-y-8 md:gap-8 w-full">
        {top4 &&
          top4.map(item => (
            <PopularContestCard
              id={item.id}
              benefits={item.benefits}
              contest_tag={item.contest_tag}
              start_date={item.start_date}
              end_date={item.end_date}
              img={item.img ? item.img : ""}
              organizer={item.organizer}
              participants={item.participants}
              prize={item.prize}
              title={item.title}
              key={item.id}
              views="0"
            />
          ))}
      </ul>
    </div>
  );
}

export default PopularContestList;
