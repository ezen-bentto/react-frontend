import type { Contest } from "./contestType";

export interface CommunityListItem {
  id: string;
  author_id: string;
  title: string;
  content: string;
  recruit_end_date: string;
}

export interface ContestWithCommunity extends Contest {
  communityList: CommunityListItem[];
}