import { useCommunityPage } from "@/features/community/useGetList";
import ListItem from "../shared/ListItem";

const CommunityList = () => {
  const { data, isLoading } = useCommunityPage();
  if (isLoading) return <p></p>;

  return (
    <div className="main-community w-full flex justify-start flex-col gap-4">
      {data &&
        data.map(item => (
          <ListItem
            key={item.community_id}
            type="community"
            title={item.title}
            description={item.content}
            linkSrc={`/community/content/${item.community_id}`}
            size="md"
            intent="primary"
            division={item.category_type ?? 0}
            communityType={item.community_type}
          />
        ))}
    </div>
  );
};

export default CommunityList;
