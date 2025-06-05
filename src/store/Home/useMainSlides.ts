// components/home/useMainSlides.ts
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface SlideItemType {
  id: string;
  image: string;
  bgColor: string;
  duration: string;
  title: string;
  summary: string;
}

const fetchSlides = async (): Promise<SlideItemType[]> => {
  const res = await axios.get("/api/slides"); // 실제 API 경로로 교체
  if (!res.status) throw new Error("슬라이드 로드 실패");

  const data = await res.data;
  return data.map((item: Omit<SlideItemType, "id">) => ({
    ...item,
    id: uuidv4(),
  }));
};

export const useMainSlides = () =>
  useQuery({
    queryKey: ["mainSlides"],
    queryFn: fetchSlides,
    staleTime: 1000 * 60 * 5, 
    gcTime :  1000 * 60 * 20, // 20q분?
  });
