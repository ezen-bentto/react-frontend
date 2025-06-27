// api ------------------------------------------------
// 커뮤니티 아이템 
export interface CommunityItem {
    community_id: number;
    community_type: string;
    category_type: number | null;
    contest_id: number | null;
    start_date: string | null;
    end_date: string | null;
    recruit_end_date: string | null;
    age_group: string | null;
    title: string;
    content: string;
    nickname: string;
    author_id: number;
    reg_date: string;
    mod_date: string;
    scrap_count: number;
    comment_count: number;
    scrap_yn: "Y" | "N";
}

// 커뮤니티 리스트 반환
export interface CommunityListResponse {
    page: number;
    size: number;
    totalCount: number;
    totalPages: number;
    list: CommunityItem[];
}
// api ------------------------------------------------

// 필터 props 
export interface FilterSectionProps {
    communityType: string;
    onFilterChange: (_name: string, selected: string[]) => void;
    onSearchSubmit: (_search: string) => void;
}

// 렌더링 props
export interface CommunityGridProps {
    posts: CommunityItem[];
    viewMode: "card" | "list";
    onScrapClick: (_postId: number) => void;
}

// 빈화면 props
export interface EmptyStateProps {
    imgSrc: string;
}