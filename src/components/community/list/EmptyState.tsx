import type { EmptyStateProps } from "@/types/communityListType";

const EmptyState = ({ imgSrc }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center mt-8">
      <img src={imgSrc} alt="게시글 없음" className="w-64 md:w-80 h-auto" />
    </div>
  );
};

export default EmptyState;
