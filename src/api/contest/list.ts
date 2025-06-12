import type { Contest } from "@/types/contestType";
import axios from "axios";

export const featchContestlist = async () => {
  const response = await axios.get<{ data: Contest[] }>(
    "http://localhost:4000/api/contest/getList"
  );
  return response.data.data;
};
