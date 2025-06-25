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

export type ContestFormData = {
  id?: number;
  writer_id: string;
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
};

export interface ContestStore {
  contests: Contest[];
  popularContests: Contest[];
  latestContests: Contest[];
  contestFormData: ContestFormData;
  // eslint-disable-next-line no-unused-vars
  updateContestFormData: (data: Partial<ContestFormData>) => void;
}
