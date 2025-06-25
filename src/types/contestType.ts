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
};

export interface bookmark {
  isBookmarked: boolean;
  bookmarkCount: number;
}

export interface ContestStore {
  contests: Contest[];
  popularContests: Contest[];
  latestContests: Contest[];

  fetchContest: () => void;
}
