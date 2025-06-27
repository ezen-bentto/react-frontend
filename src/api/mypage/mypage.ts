// src/api/mypage.ts
import axiosInstance from "../axiosInstance";

interface BookmarkedContest {
  id: number;
  title: string;
  organizer: string;
  endDate: string;
}

export interface BookmarkedContestsResponse {
  crawledContestIds: number[];
  dbContests: BookmarkedContest[];
}

export const getMyPosts = async () => {
  const url = `/api/mypage/posts?timestamp=${new Date().getTime()}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const getMyBookmarkedContests = async (): Promise<BookmarkedContestsResponse> => {
  const url = `/api/mypage/bookmarked-contests?timestamp=${new Date().getTime()}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};

export const getMyBookmarkedCommunities = async () => {
  const url = `/api/mypage/bookmarked-communities?timestamp=${new Date().getTime()}`;
  const response = await axiosInstance.get(url);
  return response.data.data;
};
