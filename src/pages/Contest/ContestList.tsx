import { featchContestlist } from "@/api/contest/list";
import type { ContestItem } from "@/components/home/ContestSlider";
import Card from "@/components/shared/Card";
import countDate from "@/utils/countDate";
import { useEffect, useState } from "react";


const ContestList = () => {
  const [items, setItems] = useState<ContestItem[]>([]);

  const fetchData = async () => {
    try {
      const data = await featchContestlist();
      console.log(data);
      setItems(data);
    } catch(e) {
      console.error(e)
    }
  };

  useEffect(() => {
    console.log("실행은됨")
    fetchData();
  }, [])

  return (
    <div>
       {/* 필터 */}
       {/* 배너 */}
       
       {/* 카드 리스트 */}
       {items.length === 0 ? (
        <p>데이터 로딩 중...</p>
        ) : (
          items.map(item => (
            <Card
              key={item.id}
              dday={countDate(item.end_date).toString()}
              id={item.id}
              img={item.img}
              text={item.organizer}
              title={item.title}
              intent="neutral"
              size="sm"
            />
          ))
        )}
    </div>
  )
}

export default ContestList