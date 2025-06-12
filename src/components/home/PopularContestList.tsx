import { useEffect, useState } from "react";
import Title from "../shared/Title";
import type { ContestItem } from "./ContestSlider";
import axios from "axios";
import PopularContestCard from "./PopularContestCard";

function PopularContestList() {
  const [items, setItems] = useState<ContestItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<ContestItem[]>("/data/contests-list.json");
      const slicedWithId = response.data.slice(0, 4);
      setItems(slicedWithId);
    } catch (error) {
      console.error("공모전 데이터 로딩 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="flex-default flex-col w-full gap-8">
      <Title linkSrc="/contest" titleText="주목받는 공모전" />
      <ul className="flex items-center md:justify-between justify-center flex-wrap gap-y-8 md:gap-8 w-full">
        {items.map(item => (
          <PopularContestCard
            id={item.id}
            benefits={item.benefits}
            contest_tag={item.contest_tag}
            start_date={item.start_date}
            end_date={item.end_date}
            img={item.img}
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
