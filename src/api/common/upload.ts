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
 *
 */

export interface imageResponse {
  url: string;
}

export const fetchUpload = async (data: FormData) => {
  const response = await axios.post<imageResponse>(
    `${import.meta.env.VITE_API_URL}/api/upload/image`,
    data,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response;
};
