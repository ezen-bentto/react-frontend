import { featchContestlist } from "@/api/contest/list";
import Card from "@/components/shared/Card";
import type { Contest } from "@/types/contestType";
import countDate from "@/utils/countDate";
import { useEffect, useState } from "react";

const ContestList = () => {
  const [items, setItems] = useState<Contest[]>([]);

  const fetchData = async () => {
    try {
      const data = await featchContestlist();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {/* 필터 */}
      <div></div>
      {/* 배너 */}

      {/* 카드 리스트 */}
      <div className="flex gap-6 flex-wrap justify-center mt-8">
        {items.length === 0 ? (
          <p>데이터 로딩 중...</p>
        ) : (
          items.map(item => (
            <Card
              key={item.id}
              dday={countDate(item.end_date).toString()}
              id={item.id}
              img={item.img ? item.img : ""}
              text={item.organizer}
              title={item.title}
              intent="neutral"
              size="sm"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ContestList;
