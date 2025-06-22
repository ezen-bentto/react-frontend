import { fetchContestDetail, fetchContestPage } from "@/api/contest/contestApi";
import DetailContent from "@/components/contest/DetailContent";
import DetailInfo from "@/components/contest/DetailInfo";
import ListItem from "@/components/shared/ListItem";
import Title from "@/components/shared/Title";
import type { CommunityListItem } from "@/types/contestDetailType";
import type { Contest } from "@/types/contestType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ContestDetail = () => {
  const { contestId } = useParams();
  const [data, setData] = useState<Contest>();
  const [communityList, setCommunityList] = useState<CommunityListItem[]>([]);

  const fetchData = async (targetId: number) => {
    const res = await fetchContestPage();
    if (res) {
      const targetData = res.find(item => item.id === targetId);
      setData(targetData);
    }
  };

  const fetchDetailData = async (targetId: number) => {
    const res = await fetchContestDetail(targetId);
    if (res) {
      setData(res);
      setCommunityList(res.communityList || []);
    }
  };

  useEffect(() => {
    if (!contestId) return;

    const parsedId = parseInt(contestId);

    if (parsedId < 241) {
      fetchData(parsedId);
    } else {
      fetchDetailData(parsedId);
    }
  }, [contestId]);

  return (
    <div className="flex flex-col gap-5 mt-28">
      <Title titleText="상세페이지" linkSrc="" />
      {/* 상세정보 */}
      <div>
        <DetailInfo data={data} />
      </div>

      {/* 상세내용 */}
      <div className="min-h-50">
        <DetailContent html={data?.article ?? ""} />
      </div>

      <Title titleText="팀원 모집" linkSrc="" />
      {/* 팀원모집 */}
      <section className="main-community w-full flex justify-start flex-col gap-4">
        {communityList.map(post => (
          <ListItem
            key={post.id}
            type="community"
            linkSrc={`/community/${post.id}`}
            description={post.content}
            title={post.title}
            writer={`작성자 ${post.author_id}`}
            intent="default"
            size="lg"
            endDate={post.recruit_end_date}
            region=""
            communityType="팀원모집"
          />
        ))}

        {communityList.length === 0 && (
          <p className="text-gray-500 text-center py-8">아직 등록된 팀원 모집 글이 없습니다.</p>
        )}
      </section>
    </div>
  );
};

export default ContestDetail;
