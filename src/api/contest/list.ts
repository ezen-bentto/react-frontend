import type { Contest } from "@/types/contestType";
import axios from "axios";

export const fetchContestList = async () => {
  const response = await axios.get<{ data: Contest[] }>(
    "http://localhost:4000/api/contest/getList"
  );
  return response.data.data;
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
  let query = "http://localhost:4000/api/contest/getList";

  if (filters.field) {
    filters.field.forEach(f => params.append("field", f));
  }

  if (filters.organizerType) {
    filters.organizerType.forEach(o => params.append("organizerType", o));
  }

  if (filters.ageGroup) {
    params.append("ageGroup", filters.ageGroup);
  }

  if (params) query += `?${params.toString()}`;

  const response = await axios.get<{ data: Contest[] }>(query);

  return response.data.data;
};
