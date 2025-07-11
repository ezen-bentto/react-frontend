import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDetail } from "@/features/contest/useDetail";
import type { ContestFormData, RequestContestData } from "@/types/contestType";
import { initialContestFormData } from "./ContestForm";
import { useEditContestMutation } from "@/features/contest/useEdit";
import ContestFormTemplate from "@/components/contest/ContestFormTemplate";
import { useAuth } from "@/context/AuthContext";
import { blobToFile } from "@/utils/blobToFile";
import { uploadImage, type imageProps } from "@/api/common/upload";
import { fileToBlob } from "@/utils/fileToBlob";
import { bufferJsonToBlob } from "@/utils/bufferJsonToBlob";

const ContestUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // /contest/:id 라면 여기에 id 들어옴
  const { data, isLoading } = useDetail(Number(id));
  const contestId = Number(id);
  const { user } = useAuth();

  const [contestFormData, setContestFormData] = useState<ContestFormData>(initialContestFormData);
  const [isImageUpdated, setIsImageUpdated] = useState(false);

  const handleChange = (updated: Partial<ContestFormData>) =>
    setContestFormData(prev => ({ ...prev, ...updated }));

  // useQuery로 받아온 데이터를 ContestFormData 형식으로 변환
  useEffect(() => {
    if (!data) return;

    const initForm = async () => {
      let file_path: File | undefined;

      if (data.file_path && data.save_name) {
        const blobFile = bufferJsonToBlob(data.file_path, "image/png");
        file_path = blobToFile(blobFile, data.save_name);
      }

      const transformedData: ContestFormData = {
        ...data,
        contest_tag: data.contest_tag ? data.contest_tag.split(",") : [],
        file_path,
      };

      setContestFormData(transformedData);
    };

    initForm();
  }, [data]);

  const { mutate: editContest } = useEditContestMutation(contestId);

  const handleSubmit = async () => {
    try {
      // 이미지가 새로 업로드 되었으면 따로 전송
      if (isImageUpdated) {
        const blobImage = await fileToBlob(contestFormData.file_path!);
        const requsetData: imageProps = {
          file: blobImage,
          fileName: contestFormData.save_name!,
          id: data!.id,
          type: "contest",
          image_id: data!.file_id,
        };
        await uploadImage(requsetData);
      }

      // 게시글 정보만 수정
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { file_path, save_name, ...restData } = contestFormData;
      const transformed: RequestContestData = {
        ...restData,
        writer_id: user!.id,
      };

      editContest(transformed, {
        onSuccess: () => {
          alert("성공적으로 수정되었습니다.");
          navigate(`/contest/${contestId}`, { replace: true });
        },
        onError: () => {
          alert("수정에 실패했습니다.");
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      console.info(e);
      alert("수정 중 오류 발생");
    }
  };

  useEffect(() => {
    if (user && data && Number(user.id) !== Number(data.writer_id)) {
      navigate(`/contest/${contestId}`);
    }
  }, [user, data, contestId, navigate]);

  return (
    <ContestFormTemplate
      formData={contestFormData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      submitLabel="수정"
      isLoading={isLoading}
      onImageChange={() => setIsImageUpdated(true)}
    />
  );
};

export default ContestUpdate;
