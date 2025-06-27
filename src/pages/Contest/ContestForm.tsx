import { fetchContestWrite } from "@/api/contest/contestApi";
import { useNavigate } from "react-router-dom";
import type { ContestFormData } from "@/types/contestType";
import { useEffect, useState } from "react";
import ContestFormTemplate from "@/components/contest/ContestFormTemplate";

export const initialContestFormData: ContestFormData = {
  writer_id: 1,
  title: "",
  organizer: "",
  organizer_type: "",
  participants: "",
  prize: "",
  start_date: "",
  end_date: "",
  homepage: "",
  benefits: "",
  contest_tag: [],
  article: "",
};

const ContestForm = () => {
  const navigate = useNavigate();

  const [contestFormData, setContestFormData] = useState<ContestFormData>(initialContestFormData);

  const handleSubmit = async () => {
    // console.info("등록 전 데이터 확인:", contestFormData);
    let response;
    const transformedData = {
      ...contestFormData,
      contest_tag: contestFormData.contest_tag.join(","),
    };

    // console.info(transformedData.contest_tag, "@@@@@@@@");
    try {
      response = await fetchContestWrite(transformedData);
      console.info("등록", response.data);
      alert("성공적으로 등록되었습니다.");

      navigate(`/contest/${response.data}`);
    } catch (error) {
      console.info("실패", error);
      alert("등록에 실패했습니다.");
    }
  };

  useEffect(() => {
    console.info(contestFormData.article, "@@@@");
  }, [contestFormData]);

  const handleChange = (updated: Partial<ContestFormData>) =>
    setContestFormData(prev => ({ ...prev, ...updated }));

  return (
    <ContestFormTemplate
      formData={contestFormData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="등록"
    />
  );
};

export default ContestForm;
