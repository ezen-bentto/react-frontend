//react-frontend\src\api\mypage\profileApi.ts
import axiosInstance from "../axiosInstance";

// 프로필 정보 업데이트를 위한 데이터 타입
export interface UpdateProfilePayload {
  nickname: string;
  email: string;
  profileImage?: string; // 이미지 URL 또는 파일명
}

/**
 * 사용자 프로필 정보(닉네임, 이메일, 프로필 이미지)를 업데이트합니다.
 * @param payload - 변경할 닉네임,이메일, 이미지 URL 정보
 */
export const updateProfile = async (payload: UpdateProfilePayload) => {
  const response = await axiosInstance.put("/api/user/profile", payload);
  return response.data;
};

/**
 * 프로필 이미지를 서버에 업로드합니다.
 * @param imageFile - 업로드할 이미지 파일
 * @returns { success: boolean, data: { imageUrl: string } } 형태의 응답을 가정
 */
