import Card from "@/components/shared/Card";
import Fillter from "@/components/shared/Fillter";
import Pagination from "@/components/shared/Pagination";
import Title from "@/components/shared/Title";
import { contestFilterData } from "@/constants/ContestFilterData";

import { useContestPage } from "@/features/contest/useGetList";
import type { Contest } from "@/types/contestType";

import countDate from "@/utils/countDate";

import { useEffect, useState } from "react";

const ContestList = () => {
  // const { popularContests, fetchContest } = useContestStore();
  const [currentPage, setCurrentpage] = useState(1);
  const [category, setCategory] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
  const [organizerType, setOrganizerType] = useState<string[]>([]);

  //  react query 로 값 불러오기
  const { data } = useContestPage(currentPage);
  const [filteredContests, setFilteredContests] = useState<Contest[]>([]);

  // // 전체 페이지 수
  // const itemsPerPage = 12;
  // // start index
  // const indexOfLastItem = currentPage * itemsPerPage;
  // // end index
  // const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // 전체 공모전 불러오기
  useEffect(() => {
    if (data) {
      setFilteredContests(data);
    }
  }, [data, currentPage]);

  // 카테고리 필터
  useEffect(() => {
    if (data) {
      // 필터를 적용해도, 최신 데이터 기준으로 적용하도록
      const filtered = data.filter(item => {
        const contestTag = item.contest_tag.split(",")[0].trim();
        const selectedCategory = category.length === 0 || category.includes(contestTag);
        const selectedAge = age.length === 0 || age.includes(item.participants);
        const selectedOrganizer =
          organizerType.length === 0 || organizerType.includes(item.organizer_type);

        return selectedCategory && selectedAge && selectedOrganizer;
      });

      setFilteredContests(filtered);
    }
  }, [data, category, age, organizerType]);

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
      <div className="flex gap-6 flex-wrap justify-start py-5">
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

      {/* 페이징 */}
      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPrevious={() => setCurrentpage(prev => Math.max(prev - 1))}
          onNext={() =>
            setCurrentpage(prev => {
              return Math.min(prev + 1, 10);
            })
          }
          onPageChange={p => setCurrentpage(p)}
          intent="primary"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ContestList;
