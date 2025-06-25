import type { ContestWithCommunity } from "@/types/contestDetailType";
import type { Contest } from "@/types/contestType";
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

// 북마크 post
export const fetchCheckBookmark = async (target_id: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/contest/${target_id}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

// 로그인 되어 있으면 북마크 했는지 유무 API
export const fetchIsBookmark = async (target_id: number) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/contest/${target_id}/bookmark`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

// 북마크 counter
export const fetchBookmarkCnt = async (target_id: number) => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/contest/${target_id}/bookmark/counter`
  );

  return response.data.data;
};
