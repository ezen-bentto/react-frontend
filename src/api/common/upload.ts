//react-frontend\src\api\common\upload.ts
import { buildFormData } from "@/utils/buildFormData";
import axiosInstance from "../axiosInstance";
import axios from "axios";

/**
 *
 * 카테고리 조회
 *
 * @function fetchUpload
 * @date 2025/06/23
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/23           이철욱               신규작성
 *        2025/06/28           이철욱               file 업로드, update api 수정
 *        2025/06/29           김혜미               reference_id 업데이트 API 추가
 *        2025/06/30           홍수연               인증을 위해 헤더에 토큰 담아 보내도록 수정
 */

export type UploadCategory = "contest" | "community" | "profile";

export interface imageProps {
  file: Blob;
  fileName: string;
  id: number;
  type: UploadCategory;
  image_id?: number;
}

export const uploadImage = async (props: imageProps): Promise<string> => {
  const formData = buildFormData(props.file, props.fileName, props.id);

  try {
    let url = `/api/file/${props.type}/image`;
    if (props.image_id) url += `/${props.image_id}`;

    const response = await axiosInstance.post(url, formData, {
      headers: {},
    });

    return response.data.data;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error;
  }
};

/**
 * 이미지 reference_id 업데이트 API
 *
 * @function updateImageReference
 * @date 2025/06/29
 * @param fileName - 업데이트할 파일명
 * @param newReferenceId - 새로운 reference_id (커뮤니티 ID)
 * @returns Promise<void>
 */
export const updateImageReference = async (
  fileName: string,
  newReferenceId: number
): Promise<void> => {
  try {
    const response = await axiosInstance.post("/api/file/update-reference", {
      fileName,
      newReferenceId,
    });
    return response.data;
  } catch (error: unknown) {
    console.error("reference_id 업데이트 실패:", fileName, error);

    // 에러 상세 정보 출력
    if (axios.isAxiosError(error)) {
      console.error("에러 응답:", error.response?.data);
      console.error("에러 상태:", error.response?.status);
    }
    throw error;
  }
};
