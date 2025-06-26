// src/api/mypage.ts
import axiosInstance from "../axiosInstance";

export const getMyPosts = async () => {
  const response = await axiosInstance.get("/api/mypage/posts");
  return response.data.data;
};

export const getMyBookmarkedContests = async () => {
  const response = await axiosInstance.get("/api/mypage/bookmarked-contests");
  return response.data.data;
};

export const getMyBookmarkedCommunities = async () => {
  const response = await axiosInstance.get("/api/mypage/bookmarked-communities");
  return response.data.data;
};
