//react-frontend\src\api\contest\list.ts
import axios from "axios";

// 북마크 post
export const fetchCheckBookmark = async (target_id: number) => {
  const token = localStorage.getItem("accessToken");

  const response = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/contest/${target_id}/bookmark`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.data;
};

// 로그인 되어 있으면 북마크 했는지 유무 API
export const fetchIsBookmark = async (target_id: number) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/contest/${target_id}/bookmark`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data.data;
};

// 북마크 counter
export const fetchBookmarkCnt = async (target_id: number): Promise<number> => {
  const response = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/contest/${target_id}/bookmark/counter`
  );

  return Number(response.data.data);
};
