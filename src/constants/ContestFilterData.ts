import type { FilterGroup } from "@/components/shared/Fillter";

export const contestFilterData: FilterGroup[] = [
  {
    name: "field",
    label: "분야",
    options: [
      { label: "포스터/웹툰/콘텐츠", value: "content" },
      { label: "사진/영상/UCC", value: "video" },
      { label: "아이디어/기획", value: "idea" },
      { label: "IT/학술/논문", value: "it" },
      { label: "네이밍/슬로건", value: "naming" },
      { label: "스포츠/음악", value: "sport" },
      { label: "미술/디자인/건축", value: "art" },
    ],
    multiSelect: true
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
    name: "organizerType",
    label: "기업",
    options: [
      { label: "대기업", value: "big" },
      { label: "중견/중소기업", value: "small" },
      { label: "공공기관/공기업업", value: "public" },
      { label: "비영리단체/협회/재단", value: "society" },
    ],
    multiSelect: true
  },
];
