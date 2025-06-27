import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDetail } from "@/features/contest/useDetail";
import type { ContestFormData } from "@/types/contestType";
import { initialContestFormData } from "./ContestForm";
import { useEditContestMutation } from "@/features/contest/useEdit";
import ContestFormTemplate from "@/components/contest/ContestFormTemplate";

const ContestUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // /contest/:id 라면 여기에 id 들어옴
  const { data, isLoading } = useDetail(Number(id));
  const contestId = Number(id);

  const [contestFormData, setContestFormData] = useState<ContestFormData>(initialContestFormData);

  const handleChange = (updated: Partial<ContestFormData>) =>
    setContestFormData(prev => ({ ...prev, ...updated }));

  // ✅ useQuery로 받아온 데이터를 ContestFormData 형식으로 변환
  useEffect(() => {
    if (!data) return;

    const transformedData: ContestFormData = {
      ...data,
      contest_tag: data.contest_tag ? data.contest_tag.split(",") : [],
    };

    setContestFormData(transformedData);
  }, [data]);

  const { mutate: editContest } = useEditContestMutation(contestId);

  const handleSubmit = () => {
    editContest(contestFormData, {
      onSuccess: () => {
        alert("성공적으로 수정되었습니다.");
        navigate(`/contest/${contestId}`, { replace: true });
      },
      onError: () => {
        alert("수정에 실패했습니다.");
      },
    });
  };

  // ✅ 로딩 중이면 에디터 렌더링 안 함
  if (isLoading) return <div>로딩 중...</div>;

  return (
    <ContestFormTemplate
      formData={contestFormData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="수정"
      isLoading={isLoading}
    />
  );
};

export default ContestUpdate;
