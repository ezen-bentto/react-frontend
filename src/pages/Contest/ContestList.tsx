import Card from "@/components/shared/Card";
import Fillter from "@/components/shared/Fillter";
import Title from "@/components/shared/Title";
import { contestFilterData } from "@/constants/ContestFilterData";
import { useContestStore } from "@/store/contest/useContest";
import countDate from "@/utils/countDate";

import { useEffect, useState } from "react";

const ContestList = () => {
  const { popularContests, fetchContest } = useContestStore();
  const [category, setCategory] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
  const [organizerType, setOrganizerType] = useState<string[]>([]);
  const [filteredContests, setFilteredContests] = useState(popularContests);
  // const isFiltered = category.length > 0 || age.length > 0 || organizerType.length > 0;

  // const [items, setItems] = useState<Contest[]>([]);

  // const fetchData = async () => {
  //   try {
  //     const data = await featchContestlist();
  //     console.info(data);
  //     setItems(data);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetchContest();
  }, []);

  // 전체 공모전 불러오기
  useEffect(() => {
    if (popularContests) {
      setFilteredContests(popularContests);
    }
  }, [popularContests]);

  // 카테고리 필터
  useEffect(() => {
    console.info(category, age, organizerType);
    if (!popularContests) return;

    const filtered = popularContests.filter(item => {
      const selectedCategory = category.length === 0 || category.includes(item.contest_tag);
      const selectedAge = age.length === 0 || age.includes(item.participants);
      const selectedOrganizer =
        organizerType.length === 0 || organizerType.includes(item.organizer_type);

      return selectedCategory && selectedAge && selectedOrganizer;
    });

    setFilteredContests(filtered);
  }, [category, age, organizerType]);

  return (
    <div className="flex flex-col gap-5 mt-28">
      <Title titleText="공모전" linkSrc="" />
      {/* 필터 */}

      <div className="py-5">
        <Fillter
          filters={contestFilterData}
          onFilterChange={(group, value) =>
            group === "field"
              ? setCategory(value)
              : group === "ageGroup"
                ? setAge(value)
                : setOrganizerType(value)
          }
          onSearchSubmit={() => console.info("검색 핸들러")}
        />
      </div>

      {/* 배너 */}

      {/* 카드 리스트 */}
      <div className="flex gap-6 flex-wrap justify-center py-5">
        {!filteredContests ? (
          <p>데이터 로딩 중...</p>
        ) : (
          filteredContests.map(item => (
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
