// src/api/mypage.ts
import axios from "axios";

// 토큰을 가져와 헤더를 만드는 부분을 함수로 분리하면 편리합니다.
const getAuthHeaders = () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    // 토큰이 없는 경우, 에러를 발생시켜 각 함수에서 처리하도록 합니다.
    throw new Error("로그인 토큰을 찾을 수 없습니다.");
  }
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const getMyPosts = async () => {
  try {
    const config = getAuthHeaders();
    const response = await axios.get("/api/mypage/posts", config);
    return response.data.data;
  } catch (error) {
    console.error("내가 쓴 글 조회 API 에러:", error);
    throw error; // 에러를 다시 던져서 호출한 컴포넌트에서 처리하도록 함
  }
};

export const getMyBookmarks = async () => {
  try {
    // const config = getAuthHeaders();
    // const response = await axios.get('/api/mypage/bookmarks', config);
    // return response.data.data;
    // console.log("북마크 API 호출 (백엔드 기능은 아직 없음)");
    return []; // 임시로 빈 배열 반환
  } catch (error) {
    console.error("북마크 조회 API 에러:", error);
    throw error;
  }
};
