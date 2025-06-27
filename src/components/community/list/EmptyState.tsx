import type { EmptyStateProps } from "@/types/communityListType";

const EmptyState = ({ imgSrc }: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center mt-8">
            <img src={imgSrc} alt="게시글 없음" className="w-64 md:w-80 h-auto" />
            <p className="text-gray-500 dark:text-gray-400 mt-4">게시글이 없습니다.</p>
        </div>
    );
};

export default EmptyState;
