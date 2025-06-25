import axios from "@/api/axiosInstance";

// 카테고리 반환 타입(row)
export interface Category {
  category_id: number;
  name: string;
  reg_date: string;
  mod_date: string;
  del_yn: string;
}

// 카테고리 반환 타입(배열)
export interface CategoryResult {
  list: Category[];
  message?: string;
  success?: boolean;
}

// 컨트롤러에서 { data: ... }로 감싸므로
export interface CategoryAPIResponse {
  data: CategoryResult;
}

/**
 *
 * 카테고리 조회
 *
 * @function fetchCategory
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           김혜미               신규작성
 *
 */
export const fetchCategory = async (): Promise<CategoryAPIResponse> => {
  const response = await axios.get<CategoryAPIResponse>(
    "/api/common/getCategory"
  );
  return response.data;
};
