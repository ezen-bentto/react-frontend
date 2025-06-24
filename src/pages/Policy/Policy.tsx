import { useEffect, useState } from "react";
import PolicyList from "./PolicyList";
import { fetchAllPolicies } from "@/features/Policy/api";
import type { PolicyType } from "@/features/Policy/types";
import Title from "@/components/shared/Title";
import { filterGroups } from "@/features/Policy/filterGroups";
import Fillter from "@/components/shared/Fillter";

export default function Policy() {
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    regionParent: [],
    regionFlat: [],
  });
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchAllPolicies().then(setPolicies);
  }, []);

  // Fillter 에서 선택된 필터 값 받기
  const handleFilterChange = (groupName: string, selected: string[]) => {
    setSelectedFilters(prev => ({
      ...prev,
      [groupName]: selected,
    }));
  };

  // 선택된 필터로 policies 필터링 및 검색
  const filteredPolicies = policies.filter(policy => {
    const categoryMatch =
      !selectedFilters.category.length || selectedFilters.category.includes(policy.category);

    const regionAll = [...(selectedFilters.regionFlat || []), ...(selectedFilters.regionParent || [])];
    const regionMatch = !regionAll.length || regionAll.includes(policy.region);

    const searchMatch =
      searchText.trim() === "" ||
      policy.title.toLowerCase().includes(searchText.toLowerCase());


    return categoryMatch && regionMatch && searchMatch;
  });

  return (
    // <div className="flex flex-col items-center justify-center gap-4 mt-20 min-w-[360px]">
    <div className="flex flex-col gap-5 mt-28">
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
      <section>
        <div>
          <PolicyList policies={filteredPolicies} />
        </div>
        {/* pagenation */}
        <div></div>
      </section>
    </div>
  );
}
