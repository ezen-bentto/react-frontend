import type { FilterGroup } from "@/components/shared/Fillter";

export const filterData: FilterGroup[] = [
  {
    name: "field",
    label: "분야",
    options: [
      { label: "포스터/웹툰/콘텐츠", value: "content" },
      { label: "사진/영상/UCC", value: "video" },
      { label: "아이디어/기획", value: "idea" },
      { label: "IT/학술/논문", value: "it" },
    ],
  },
  {
    name: "ageGroup",
    label: "연령",
    options: [
      { label: "대학생", value: "college" },
      { label: "제한없음", value: "all" },
    ],
  },
  {
    name: "sort",
    label: "정렬",
    options: [
      { label: "최신순", value: "latest" },
      { label: "인기순", value: "popular" },
      { label: "스크랩순", value: "scrap" },
    ],
  },
];
