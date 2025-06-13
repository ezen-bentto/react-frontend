import { fetchContestPage } from "@/api/contest/list";
import Card from "@/components/shared/Card";
import Fillter from "@/components/shared/Fillter";
import Pagination from "@/components/shared/Pagination";
import Title from "@/components/shared/Title";
import { contestFilterData } from "@/constants/ContestFilterData";
import type { Contest } from "@/types/contestType";
import countDate from "@/utils/countDate";
import { useEffect, useMemo, useState } from "react";

const ContestList = () => {
  const [currentPage, setCurrentpage] = useState(1);
  const [category, setCategory] = useState<string[]>([]);
  const [age, setAge] = useState<string[]>([]);
  const [organizerType, setOrganizerType] = useState<string[]>([]);
  const [data, setData] = useState<Contest[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // 페이지당 item 갯수
  const itemsPerPage = 12;
  // 시작 index
  const indexOfLastItem = currentPage * itemsPerPage;
  // 끝 index
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // ✅ 필터링은 useMemo로
  const filteredContests = useMemo(() => {
    if (!data) return [];

    return data.filter(item => {
      const contestTag = item.contest_tag.split(",")[0].trim();
      const selectedCategory = category.length === 0 || category.includes(contestTag);
      const selectedAge = age.length === 0 || age.includes(item.participants);
      const selectedOrganizer =
        organizerType.length === 0 || organizerType.includes(item.organizer_type);

      const matchesSearch =
        searchText.trim() === "" || item.title.toLowerCase().includes(searchText.toLowerCase());
      return selectedCategory && selectedAge && selectedOrganizer && matchesSearch;
    });
  }, [data, category, age, organizerType, searchText]);

  // ✅ 현재 페이지 데이터
  const currentItem = filteredContests.slice(indexOfFirstItem, indexOfLastItem);

  // 전체 공모전 불러오기
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const res = await fetchContestPage();
      if (res) {
        setData(res);
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // 필터 바뀌면 페이지 리셋 & 페이지 수 다시 계산
  useEffect(() => {
    setTotalPages(Math.ceil(filteredContests.length / itemsPerPage));
    setCurrentpage(1);
  }, [filteredContests]);

  return (
    <div className="flex flex-col gap-5 mt-28">
      <Title titleText="공모전" linkSrc="" />

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
          onSearchSubmit={value => setSearchText(value)}
        />
      </div>

      <div className="flex gap-6 flex-wrap justify-start py-5">
        {isLoading ? (
          <p>데이터 로딩 중...</p>
        ) : (
          currentItem.map(item => (
            <Card
              key={item.id}
              dday={countDate(item.end_date).toString()}
              id={item.id}
              img={item.img ?? ""}
              text={item.organizer}
              title={item.title}
              intent="neutral"
              size="sm"
            />
          ))
        )}
      </div>

      <div className="">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={() => {
            setCurrentpage(prev => Math.max(prev - 1, 1));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onNext={() => {
            setCurrentpage(prev => Math.min(prev + 1, totalPages));
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          onPageChange={p => {
            setCurrentpage(p);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          intent="primary"
          size="sm"
        />
      </div>
    </div>
  );
};

export default ContestList;
