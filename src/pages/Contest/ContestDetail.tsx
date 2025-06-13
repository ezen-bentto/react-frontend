import { fetchContestPage } from "@/api/contest/list";
import DetailContent from "@/components/contest/DetailContent";
import DetailInfo from "@/components/contest/DetailInfo";
import ListItem from "@/components/shared/ListItem";
import Title from "@/components/shared/Title";
import type { Contest } from "@/types/contestType";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ContestDetail = () => {
  const { contestId } = useParams();
  const [id, setId] = useState(0);
  const [data, setData] = useState<Contest>();
  const [dataFile, setDataFile] = useState<Contest[]>([]);

  const fetchData = async (targetId: number) => {
    const res = await fetchContestPage();
    if (res) {
      setDataFile(res);
      const targetData = res.find(item => item.id === targetId);
      setData(targetData);
    }
  };

  useEffect(() => {
    if (!contestId) return;

    const parsedId = parseInt(contestId);
    setId(parsedId);

    if (parsedId < 241) {
      fetchData(parsedId);
    } else {
      // DB 값 가져오기
    }
  }, [contestId]);

  console.info(id, data, dataFile);

  return (
    <div className="flex flex-col gap-5 mt-28">
      <Title titleText="상세페이지" linkSrc="" />
      {/* 상세정보 */}
      <div>
        <DetailInfo data={data}/>
      </div>

      {/* 상세내용 */}
      <div>
        <DetailContent html={data?.article ?? ""}/>
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
