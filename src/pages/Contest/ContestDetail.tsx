import { Link, useParams } from "react-router-dom";
import DetailContent from "@/components/contest/DetailContent";
import DetailInfo from "@/components/contest/DetailInfo";
import ListItem from "@/components/shared/ListItem";
import Title from "@/components/shared/Title";
import type { CommunityListItem } from "@/types/contestDetailType";
import { useDetail } from "@/features/contest/useDetail";
import { useAuth } from "@/context/AuthContext";
import { useContestDelete } from "@/features/contest/useDelete";

const ContestDetail = () => {
  const { id } = useParams();
  const parsedId = id ? parseInt(id) : undefined;
  const { user } = useAuth();
  const { mutate: contestDelete } = useContestDelete(parsedId!);

  const { data, isLoading, isError } = useDetail(parsedId);

  const communityList: CommunityListItem[] = data?.communityList ?? [];

  if (isLoading) return <p>로딩 중...</p>;
  if (isError || !data) return <p>데이터를 불러오지 못했습니다.</p>;

  return (
    <div className="flex flex-col gap-5 mt-28">
      <div className="flex-default">
        <Title titleText="상세페이지" linkSrc="" />
        {Number(user?.id) === Number(data.writer_id) && (
          <div className="text-sm text-gray-500 space-x-2">
            <span>
              <Link to={`/contest/${id}/edit`}>수정 |</Link>
            </span>
            <span
              className="cursor-pointer"
              onClick={() => {
                contestDelete();
              }}
            >
              삭제
            </span>
          </div>
        )}
      </div>
      {/* 상세정보 */}
      <div>{data ? <DetailInfo data={data} /> : <div>불러오는 중...</div>}</div>
      {/* 상세내용 */}

      <div className="min-h-50">
        <DetailContent html={data.article ?? ""} />
      </div>

      <Title titleText="팀원 모집" linkSrc="" />
      <section className="main-community w-full flex justify-start flex-col gap-4">
        {communityList.map(post => (
          <ListItem
            key={post.id}
            type="community"
            linkSrc={`/community/content/${post.id}`}
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
