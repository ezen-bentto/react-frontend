//react-frontend\src\api\contest\contestApi.ts
import type { ContestWithCommunity } from "@/types/contestDetailType";
import type { Contest, ContestDetail, transformedData } from "@/types/contestType";
import axios from "axios";

export const fetchContestList = async () => {
  const response = await axios.get<{ data: Contest[] }>(
    `${import.meta.env.VITE_API_URL}/api/contest/getList`
  );
  return response.data.data;
};

export const fetchContestDetail = async (id: number) => {
  const response = await axios.get<{ data: ContestWithCommunity }>(
    `${import.meta.env.VITE_API_URL}/api/contest/getDetail?id=${id}`
  );
  return response.data.data;
};

export const fetchContestPage = async () => {
  const response = await axios.get<ContestDetail[]>("/data/contest.json");
  return response.data;
};

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
