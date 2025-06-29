//react-frontend\src\types\contestType.ts
import type { CommunityListItem } from "./contestDetailType";

export interface FileJson {
  type: "Buffer";
  data: [];
}

export type Contest = {
  id: number;
  writer_id: number;
  title: string;
  img: string | null;
  organizer: string;
  organizer_type: string;
  participants: string;
  prize: string;
  start_date: string;
  end_date: string;
  homepage: string;
  benefits: string;
  contest_tag: string;
  article: string;
  views: number;
  reg_date: string;
  file_path?: FileJson;
  file_id?: number;
};

export type ContestFormData = {
  id?: number;
  writer_id: number;
  title: string;
  img?: string | null;
  organizer: string;
  organizer_type: string;
  participants: string;
  prize: string;
  benefits: string;
  contest_tag: string[];
  start_date: string;
  end_date: string;
  homepage: string;
  article: string;
  file_path?: File;
  save_name?: string;
};

export interface ResponseContestData extends Omit<ContestFormData, "file_path"> {
  file_path?: Blob | null;
}

export type RequestContestData = Omit<ContestFormData, "file_path" | "save_name" | "img">;

export interface transformedData extends Omit<ContestFormData, "contest_tag" | "imageFile"> {
  contest_tag: string; // string 타입으로 변경
  imageFile?: Blob | null;
}
export interface bookmark {
  isBookmarked: boolean;
  bookmarkCount: number;
}

export interface ContestStore {
  contests: Contest[];
  popularContests: Contest[];
  latestContests: Contest[];

  // eslint-disable-next-line no-unused-vars
  fetchContest: () => void;
}

export interface ContestDetail extends Contest {
  save_name?: string;
  communityList: CommunityListItem[];
}
