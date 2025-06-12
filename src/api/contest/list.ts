import type { ContestItem } from "@/components/home/ContestSlider";
import axios from "axios";

export const featchContestlist = async () => {
  const response = await axios.get<{ data: ContestItem[] }>(
    "http://localhost:4000/api/contest/getList"
  );
  return response.data.data;
};
