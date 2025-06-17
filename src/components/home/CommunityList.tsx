import { useCommunityPage } from "@/features/community/useGetList";
import ListItem from "../shared/ListItem";
import Title from "../shared/Title";

const CommunityList = () => {
  const { data, isLoading } = useCommunityPage();
  if (isLoading) return <p></p>;

  return (
    <div className="main-community w-full flex justify-start flex-col gap-4">
      <Title linkSrc="/community/list?communityType=1" titleText="지원 할 수 있는 정책" />
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
