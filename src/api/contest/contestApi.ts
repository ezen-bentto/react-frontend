import type { ContestWithCommunity } from "@/types/contestDetailType";
import type { Contest, ContestFormData } from "@/types/contestType";
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
  const response = await axios.get<Contest[]>("/data/contest.json");
  return response.data;
};

export const fetchContestWrite = async (contestData: ContestFormData) => {
  const response = await axios.post<{ data: Contest }>(
    `${import.meta.env.VITE_API_URL}/api/contest/register`,
    contestData
  );
  return response.data;
};

export const fetchContestEdit = async (contestData: ContestFormData) => {
  const response = await axios.post<{ data: Contest }>(
    `${import.meta.env.VITE_API_URL}/api/contest/modify`,
    contestData
  );
  return response.data;
};
