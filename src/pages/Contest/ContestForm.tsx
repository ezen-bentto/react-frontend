import { fetchContestWrite } from "@/api/contest/content";
import { useNavigate } from "react-router-dom";
import type { ContestFormData } from "@/types/contestType";
import { useState } from "react";
import ContestFormTemplate from "@/components/contest/ContestFormTemplate";
import { fileToBlob } from "@/utils/fileToBlob";
import { useAuth } from "@/context/AuthContext";
import { uploadImage, type imageProps } from "@/api/common/upload";

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
  file_path: new File([], ""),
  save_name: "",
};

const ContestForm = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) {
    navigate("/");
    return;
  }

  const [contestFormData, setContestFormData] = useState<ContestFormData>(initialContestFormData);

  const handleSubmit = async () => {
    try {
      let uploadedImageUrl = "";

      const { file_path, save_name, ...restData } = contestFormData;

      // 게시글 데이터
      const transformedData = {
        ...restData,
        writer_id: user.id,
        contest_tag: contestFormData.contest_tag.join(","),
        image_url: uploadedImageUrl, // imageFile 대신 image_url 로 전송
      };
      // contest_id 값 받음
      const response = await fetchContestWrite(transformedData);

      // 이미지 업로드
      if (file_path && file_path.size > 0 && save_name) {
        const blobImage = await fileToBlob(file_path);
        const requsetData: imageProps = {
          file: blobImage,
          fileName: save_name,
          id: response.data,
          type: "contest",
        };
        uploadedImageUrl = await uploadImage(requsetData);
      }

      alert("성공적으로 등록되었습니다.");
      navigate(`/contest/${response.data}`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert("등록에 실패했습니다.");
    }
  };

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
