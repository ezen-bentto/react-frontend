import { useEffect, useState } from "react";
import PolicyList from "./PolicyList";
import { fetchAllPolicies } from "@/features/Policy/api";
import type { PolicyType } from "@/features/Policy/types";
import  Fillter, {type FilterGroup } from "@/components/shared/Fillter";
import { koreaRegions, seoulRegions } from "@/features/Policy/filters";


// ✅ Filter JSON 선언
const filterGroups: FilterGroup[] = [
  {
    name: "category",
    label: "카테고리",
    options: [
      { label: "일자리", value: "일자리" },
      { label: "주거", value: "주거" },
      { label: "복지.문화", value: "복지.문화" },
      { label: "참여.권리", value: "참여.권리" },
      { label: "교육", value: "교육" },
    ],
    multiSelect: false, // 단일 선택
  },
  {
    name: "region",
    label: "지역",
    options: [
      {
        label: "서울구",
        value: "서울구",
        children: seoulRegions.map(r => ({ label: r, value: r })),
      },
      {
        label: "서울시",
        value: "서울시",
      },
      {
        label: "지역구",
        value: "지역구",
        children: koreaRegions.map(r => ({ label: r, value: r })),
      },
      {
        label: "전국",
        value: "전국",
      },
      
    ],
  },
];

export default function Policy() {
  const [policies, setPolicies] = useState<PolicyType[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    category: [],
    regionParent: [],
    regionFlat: [],
  });

  useEffect(() => {
    fetchAllPolicies().then(setPolicies);
  }, []);

  // Fillter 에서 선택된 필터 값 받기
  const handleFilterChange = (groupName: string, selected: string[]) => {
    console.log("✅ Filter change:", groupName, selected);
    setSelectedFilters(prev => ({
      ...prev,
      [groupName]: selected,
    }));
  };

  // 선택된 필터로 policies 필터링
  const filteredPolicies = policies.filter(policy => {
    const categoryMatch =
      !selectedFilters.category.length || selectedFilters.category.includes(policy.category);

    const regionAll = [...(selectedFilters.regionParent || []), ...(selectedFilters.regionFlat || [])];
    const regionMatch =
      !regionAll.length || regionAll.includes(policy.region);

    return categoryMatch && regionMatch;
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4 mt-20 min-w-[360px]">
      <section className="w-full">
        <Fillter
          filters={filterGroups}
          onFilterChange={handleFilterChange}
          onSearchSubmit={() => {}}
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
