import { useEffect, useMemo, useState } from "react";
import PolicyList from "./PolicyList";
import { fetchAllPolicies } from "@/features/Policy/api";
import type { PolicyType } from "@/features/Policy/types";
import Title from "@/components/shared/Title";
import { filterGroups } from "@/features/Policy/filterGroups";
import Fillter from "@/components/shared/Fillter";
import Pagination from "@/components/shared/Pagination";

export default function Policy() {
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    regionParent: [],
    regionFlat: [],
  });
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 24;

  // 데이터 fetch
  useEffect(() => {
    fetchAllPolicies().then(setPolicies);
  }, []);

  // 선택된 필터로 policies 필터링 및 검색
  const filteredPolicies = useMemo(() => {
    return policies.filter(policy => {
      const categoryMatch =
        !selectedFilters.category.length || selectedFilters.category.includes(policy.category);

      const regionAll = [
        ...(selectedFilters.regionFlat || []),
        ...(selectedFilters.regionParent || []),
      ];
      const regionMatch = !regionAll.length || regionAll.includes(policy.region);

      const searchMatch =
        searchText.trim() === "" ||
        policy.title.toLowerCase().includes(searchText.toLowerCase());

      return categoryMatch && regionMatch && searchMatch;
    });
  }, [policies, selectedFilters, searchText]);

  // 페이지네이션
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPolicies.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);

  // 페이지 초기화 시 페이지네이션 초기화
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPolicies]);

  // Fillter 에서 선택된 필터 값 받기
  const handleFilterChange = (groupName: string, selected: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [groupName]: selected,
    }));
  };

  return (
    <div className="flex flex-col justify-center gap-5 mt-28">
      <Title titleText="청년정책" linkSrc="" />
      <section className="w-full py-5">
        <Fillter
          filters={filterGroups}
          onFilterChange={handleFilterChange}
          onSearchSubmit={setSearchText}
          onResetFilters={() => {
            setSelectedFilters({
              category: [],
              regionParent: [],
              regionFlat: [],
            });
            setSearchText(""); // 검색어 초기화
          }}
        />
      </section>
      <section className="py-5 ">
          <PolicyList policies={currentItems} />
      </section>
      <div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPrevious={() => {
              setCurrentPage(prev => Math.max(prev - 1, 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNext={() => {
              setCurrentPage(prev => Math.min(prev + 1, totalPages));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onPageChange={page => {
              setCurrentPage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            intent="primary"
            size="sm" 
          />
        )}
        </div>
    </div>
  );
}
