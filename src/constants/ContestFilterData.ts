import type { FilterGroup } from "@/components/shared/Fillter";

export const contestFilterData: FilterGroup[] = [
  {
    name: "field",
    label: "분야",
    options: [
      { label: "포스터/웹툰/콘텐츠", value: "포스터/웹툰/콘텐츠" },
      { label: "사진/영상/UCC", value: "사진/영상/UCC" },
      { label: "아이디어/기획", value: "기획/아이디어" },
      { label: "IT/학술/논문", value: "IT/학술/논문" },
      { label: "네이밍/슬로건", value: "네이밍/슬로건" },
      { label: "스포츠/음악", value: "스포츠/음악" },
      { label: "미술/디자인/건축", value: "디자인/순수미술/공예" },
    ],
    multiSelect: true,
  },
  {
    name: "ageGroup",
    label: "연령",
    options: [
      { label: "대학생", value: "대학생" },
      { label: "직장인/일반인", value: "직장인/일반인" },
      { label: "제한없음", value: "대상 제한 없음" },
    ],
  },
  {
    name: "organizerType",
    label: "기업",
    options: [
      { label: "대기업", value: "대기업" },
      { label: "중견/중소기업", value: "중소기업" },
      { label: "공공기관/공기업", value: "공공기관/공기업" },
      { label: "비영리단체/협회/재단", value: "영리단체/협회/재단" },
    ],
    multiSelect: true,
  },
  {
    name: "benefits",
    label: "혜택",
    options: [
      { label: "입상시 가산점", value: "입상시 가산점" },
      { label: "장학금", value: "장학금" },
      { label: "인턴십", value: "인턴십" },
      { label: "취업연계", value: "취업연계" },
      { label: "해외연수", value: "해외연수" },
      { label: "기타", value: "기타" },
    ],
  },
  {
    name: "award",
    label: "시상내역",
    options: [
      { label: "1000만원 미만", value: "1000만원 미만" },
      { label: "1000만원 이상 ~ 3000만원 미만", value: "1000만원 이상 ~ 3000만원 미만" },
      { label: "3000만원 이상 ~ 5000만원 미만", value: "3000만원 이상 ~ 5000만원 미만" },
      { label: "5000만원 이상", value: "5000만원 이상" },
    ],
  },
];
