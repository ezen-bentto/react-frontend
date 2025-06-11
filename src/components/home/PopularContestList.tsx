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
    <div className="flex-default flex-col w-full">
      <Title linkSrc="/contest" titleText="주목받는 공모전" />
      <ul className="flex items-center md:justify-between justify-center flex-wrap gap-y-8 md:gap-8 w-full">
        {items.map(item => (
          <PopularContestCard
            href={item.id}
            title={item.title}
            region={item.organizer}
            imgSrc={item.img}
            summary={item.benefits}
            key={item.id}
            participants={item.participants}
          />
        ))}
      </ul>
    </div>
  );
}

export default PopularContestList;
