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
  const response = await axios.post<{ data: Contest }>(
    `${import.meta.env.VITE_API_URL}/api/contest/register`,
    contestData
  );
  return response.data;
};

export const fetchContestEdit = async (id: number, contestData: transformedData) => {
  const response = await axios.post<{ data: Contest }>(
    `${import.meta.env.VITE_API_URL}/api/contest/${id}/modify`,
    contestData
  );
  return response.data;
};

export const uploadContestImage = async (file: Blob, fileName: string) => {
  const formData = new FormData();
  const token = localStorage.getItem("accessToken");
  formData.append("file", file);
  formData.append("article", fileName);

  const response = await axios.post<{ fileUrl: string }>(
    `${import.meta.env.VITE_API_URL}/api/file/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.fileUrl; // 또는 fileName
};

export const uploadContestImageForEdit = async (id: number, formData: FormData) => {
  const token = localStorage.getItem("accessToken");
  return await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/file/image/contest/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
