//react-frontend\src\api\contest\contestApi.ts
import type { ContestWithCommunity } from "@/types/contestDetailType";
import type { Contest, ContestDetail, transformedData } from "@/types/contestType";
import axios from "axios";

// 전체 공모전 리스트
export const fetchContestList = async () => {
  const response = await axios.get<{ data: Contest[] }>(
    `${import.meta.env.VITE_API_URL}/api/contest/getList`
  );
  return response.data.data;
};

// 공모전 상세
export const fetchContestDetail = async (id: number) => {
  const response = await axios.get<{ data: ContestWithCommunity }>(
    `${import.meta.env.VITE_API_URL}/api/contest/getDetail?id=${id}`
  );
  return response.data.data;
};

// 크롤링 공모전 상세
export const fetchDataDetail = async () => {
  const response = await axios.get<ContestDetail[]>("/data/contest.json");
  return response.data;
};

// 공모전 작성
export const fetchContestWrite = async (contestData: transformedData) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post<{ data: number }>(
    `${import.meta.env.VITE_API_URL}/api/contest/register`,
    contestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 공모전 수정
export const fetchContestEdit = async (id: number, contestData: transformedData) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post<{ data: Contest }>(
    `${import.meta.env.VITE_API_URL}/api/contest/${id}/modify`,
    contestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

// 공모전 삭제
export const fetchContestDelete = async (id: number) => {
  const token = localStorage.getItem("accessToken");
  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/contest/${id}/delete`,
    "",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
