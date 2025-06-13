import type { Contest } from "@/types/contestType";
import axios from "axios";

export const fetchContestList = async () => {
  const response = await axios.get<{ data: Contest[] }>(
    "http://localhost:4000/api/contest/getList"
  );
  return response.data.data;
};

export const fetchContestPage = async (page: number = 1) => {
  const response = await axios.get<Contest[]>(`/data/contest/contest_${page}.json`);
  return response.data;
};

// 필터 타입 정의
export interface ContestFilterParams {
  field?: string[]; // 분야
  ageGroup?: string; // 연령
  organizerType?: string[]; // 기업 형태
}

// 🔹 필터 기반으로 GET 요청
export const fetchContestListTmp = async (filters: ContestFilterParams) => {
  const params = new URLSearchParams();

  if (filters.field) {
    filters.field.forEach(f => params.append("field", f));
  }

  if (filters.organizerType) {
    filters.organizerType.forEach(o => params.append("organizerType", o));
  }

  if (filters.ageGroup) {
    params.append("ageGroup", filters.ageGroup);
  }

  const response = await axios.get<{ data: Contest[] }>(
    `http://localhost:4000/api/contest/getList?${params.toString()}`
  );

  return response.data.data;
};
