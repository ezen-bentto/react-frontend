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
  const response = await axios.post<{ data: Contest }>(
    `${import.meta.env.VITE_API_URL}/api/contest/${id}/modify`,
    contestData
  );
  return response.data;
};

export const uploadContestImage = async (file: Blob, fileName: string, id: number) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("article", fileName);
  formData.append("contest_id", id.toString());

  const response = await axios.post<{ fileUrl: string }>(
    `${import.meta.env.VITE_API_URL}/api/file/image`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data.fileUrl; // 또는 fileName
};

export const uploadContestImageForEdit = async (id: number, formData: FormData) => {
  return await axios.patch(
    `${import.meta.env.VITE_API_URL}/api/file/image/contest/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
