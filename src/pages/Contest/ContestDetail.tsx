import DetailContent from "@/components/contest/DetailContent";
import DetailInfo from "@/components/contest/DetailInfo";
import ListItem from "@/components/shared/ListItem";
import Title from "@/components/shared/Title";

const ContestDetail = () => {
  return (
    <div className="flex flex-col gap-5 mt-28">
      <Title titleText="상세페이지" linkSrc="" />
      {/* 상세정보 */}
      <div>
        <DetailInfo />
      </div>

      {/* 상세내용 */}
      <div>
        <DetailContent />
      </div>

      <Title titleText="팀원 모집" linkSrc="" />
      {/* 팀원모집 */}
      <section className="main-community w-full flex justify-start flex-col gap-4">
        <ListItem
          type="community"
          linkSrc="/"
          comment={2}
          description="테스트"
          likes={123}
          title="테스트 제목"
          writer="작성자"
          intent={"default"}
          size={"lg"}
          endDate={"2025-06-30"}
          region=""
          communityType="1"
        />
      </section>
    </div>
  );
};

export default ContestDetail;
