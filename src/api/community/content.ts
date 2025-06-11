import axios from "axios";

export interface RecruitmentDetail {
    recruitment_detail_id: number;
    role: string;
    count: number;
}

export interface CommunityDetail {
    community_id: number;
    community_type: string;
    category_type: number;
    contest_id: number;
    start_date: string;
    end_date: string;
    recruit_end_date: string;
    age_group: string;
    nickname: string;
    title: string;
    content: string;
    author_id: number;
    reg_date: string;
    recruitment_detail_list: RecruitmentDetail[];
}

export const fetchCommunityDetail = async (
    communityId: number
): Promise<CommunityDetail> => {
    const response = await axios.get<{ data: CommunityDetail }>(
        `${import.meta.env.VITE_API_URL}/api/community/getDetail?communityId=${communityId}`
    );
    return response.data.data;
};
