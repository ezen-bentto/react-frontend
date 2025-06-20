//react-frontend\src\api\auth\auth.ts
import axios from "axios";

// 로그인 요청 타입
export interface LoginPayload {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  accessToken: string;
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    name?: string;
  };
}

/**
 * 기업 로그인
 * @param payload 로그인 정보 (email, password)
 * @returns Promise<LoginResponse>
 */
export const login = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axios.post<{ data: LoginResponse }>(
    `${import.meta.env.VITE_API_URL}/api/auth/login/company`,
    payload
  );
  return response.data.data;
};

/**
 * 카카오 로그인 URL 조회
 * @returns Promise<string> 카카오 로그인 URL
 */
export const getKakaoLoginUrl = async (): Promise<string> => {
  const response = await axios.get<{ data: { loginUrl: string } }>(
    `${import.meta.env.VITE_API_URL}/api/auth/kakao/login-url`
  );
  return response.data.data.loginUrl;
};