//react-frontend\src\api\auth\signup.ts
import axios from "axios";

// 기업 회원가입 요청 타입
export interface CompanySignUpPayload {
  email: string;
  password: string;
  companyName: string;
  phoneNumber: string;
}

// 회원가입 응답 타입
export interface SignUpResponse {
  success: boolean;
  message: string;
  data?: unknown;
}

// 카카오 로그인 URL 응답 타입
export interface KakaoUrlResponse {
  success: boolean;
  data: {
    loginUrl: string;
  };
}

// 기업 회원가입

export const signUpCompany = async (payload: CompanySignUpPayload): Promise<SignUpResponse> => {
  const response = await axios.post<SignUpResponse>(
    `${import.meta.env.VITE_API_URL}/api/auth/signup/company`,
    payload
  );
  return response.data;
};

// 카카오 회원가입/로그인 URL 조회

export const getKakaoSignUpUrl = async (): Promise<string> => {
  const response = await axios.get<KakaoUrlResponse>(
    `${import.meta.env.VITE_API_URL}/api/auth/kakao/login-url`
  );

  if (response.data.success && response.data.data.loginUrl) {
    return response.data.data.loginUrl;
  } else {
    throw new Error("카카오 회원가입 URL을 가져오지 못했습니다.");
  }
};
