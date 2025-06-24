import type { FilterGroup } from "@/components/shared/Fillter";
import { koreaRegions, seoulRegions } from "./filters";

export const filterGroups: FilterGroup[] = [
  {
    name: "category",
    label: "카테고리",
    options: [
      { label: "일자리", value: "일자리" },
      { label: "주거", value: "주거" },
      { label: "복지.문화", value: "복지.문화" },
      { label: "참여.권리", value: "참여.권리" },
      { label: "교육", value: "교육" },
      { label: "분류없음", value: "분류없음" },
    ],
    multiSelect: false, // 단일 선택
  },
  {
    name: "regionFlat",
    label: "지역",
    options: [
      { label: "전국", value: "전국" },
      {
        label: "지역구",
        value: "지역구",
        children: koreaRegions.map(r => ({ label: r, value: r })),
      },
      { label: "서울시", value: "서울" },
      {
        label: "서울구",
        value: "서울구",
        children: seoulRegions.map(r => ({ label: r, value: r })),
      },
    ],
    multiSelect: false,
  },
];