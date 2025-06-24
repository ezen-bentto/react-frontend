import type { FilterGroup } from "@/components/shared/Fillter";
export const CATEGORY_LIST = ["일자리", "주거", "복지.문화", "참여.권리", "교육", "분류없음"];
export const koreaRegions = ["서울", "경기", "부산", "인천", "제주", "대구", "울산", "강원", "세종", "대전", "광주", "전남", "충남", "충북", "경남", "경북", "전북"];
export const seoulRegions = [
  "강남구", "강동구", "강북구", "강서구", "관악구", "광진구",
  "구로구", "금천구", "노원구", "도봉구", "동대문구", "동작구",
  "마포구", "서대문구", "서초구", "성동구", "성북구", "송파구",
  "양천구", "영등포구", "용산구", "은평구", "종로구", "중구", "중랑구"
];

export const CATEGORY_FILTER = {
  name: "category",
  label: "카테고리",
  options: [
    ...CATEGORY_LIST.map(label => ({ label, value: label })),
    { label: "분류없음", value: "분류없음" },
  ],
  multiSelect: false,
};

export const REGION_TREE_FILTER: FilterGroup[] = [
  {
    name: "regionParent",
    label: "지역 선택",
    options: [
      {
        label: "서울구",
        value: "서울구",
        children: seoulRegions.map(r => ({ label: r, value: r })),
      },
      {
        label: "지역구",
        value: "지역구",
        children: koreaRegions.map(r => ({ label: r, value: r })),
      },
    ],
  },
  {
    name: "regionFlat",
    label: "기타 지역",
    options: [
      { label: "전국", value: "전국" },
      { label: "서울시", value: "서울" },
    ],
    multiSelect: false,
  },
];


export const FILTERS = [CATEGORY_FILTER, REGION_TREE_FILTER];
