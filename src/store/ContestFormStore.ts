import { create } from "zustand";
import type { ContestFormData, ContestStore } from "@/types/contestType";

const initialContestFormData: ContestFormData = {
  writer_id: "1",
  title: "",
  organizer: "",
  organizer_type: "",
  participants: "",
  prize: "",
  start_date: "",
  end_date: "",
  homepage: "",
  benefits: "",
  contest_tag: [],
  article: "",
};

export const useContestStore = create<ContestStore>(set => ({
  // 상태: 폼 데이터
  contests: [],
  popularContests: [],
  latestContests: [],

  contestFormData: initialContestFormData,

  // 폼 데이터 업데이트
  updateContestFormData: data => {
    set(state => ({
      contestFormData: {
        ...state.contestFormData,
        ...data,
      },
    }));
  },
}));
