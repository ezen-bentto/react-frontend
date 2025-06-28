import { buildFormData } from "@/utils/buildFormData";
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
    let url = `${import.meta.env.VITE_API_URL}/api/file/${props.type}/image`;

    // 이미지 수정 url
    if (props.image_id) url += `/${props.image_id}`;

    const response = await axios.post<{ fileUrl: string }>(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.fileUrl;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    throw error; // 혹은 return ""; 처리도 가능
  }
};
