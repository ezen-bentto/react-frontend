import type { ContestWithCommunity } from "@/types/contestDetailType";
import type { Contest } from "@/types/contestType";
import axios from "axios";

export const fetchContestList = async () => {
  const response = await axios.get<{ data: Contest[] }>(
    "http://localhost:4000/api/contest/getList"
  );
  return response.data.data;
};

export const fetchContestDetail = async (id: number) => {
  const response = await axios.get<{ data: ContestWithCommunity }>(
    `http://localhost:4000/api/contest/getDetail?id=${id}`
  );
  return response.data.data;
};

export const fetchContestPage = async () => {
  const response = await axios.get<Contest[]>("/data/contest.json");
  return response.data;
};
