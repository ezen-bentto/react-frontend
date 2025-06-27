import type { CommunityGridProps } from "@/types/communityListType";
import ListItem from "@/components/shared/ListItem";

const CommunityGrid = ({ posts, viewMode, onScrapClick }: CommunityGridProps) => {
    return (
        <div
            className={
                viewMode === "card"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-4"
            }
        >
            {posts.map(post => (
                <ListItem
                    key={post.community_id}
                    type="community"
                    title={post.title}
                    description={post.content}
                    writer={post.nickname}
                    likes={post.scrap_count}
                    comment={post.comment_count}
                    linkSrc={`/community/content/${post.community_id}`}
                    endDate={post.recruit_end_date ?? undefined}
                    size={viewMode === "card" ? "md" : "lg"}
                    intent="primary"
                    division={post.category_type ?? 0}
                    communityType={post.community_type}
                    scrapYn={post.scrap_yn as "Y" | "N"}
                    onScrapClick={() => onScrapClick(post.community_id)}
                />
            ))}
        </div>
    );
};

export default CommunityGrid;
