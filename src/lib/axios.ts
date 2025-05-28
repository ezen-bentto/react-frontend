// import axios from "axios";

// export const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true,
// });

import { getToken, removeNickName, removeToken, setToken } from "@/features/Auth/token";
import axios, { type AxiosRequestConfig } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
      "content-type": "application/json",
    },
    withCredentials: true,
    ...config,
  });

  // 요청 인터셉터
  axiosInstance.interceptors.request.use(
    config => {
      const accessToken = getToken();
      if (accessToken) {
        config.headers.authorization = `Bearer ${accessToken}`;
      } else {
        delete config.headers.authorization;
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    }
  );

  // 응답 인터셉터
  axiosInstance.interceptors.response.use(
    res => {
      const newAccessToken = res.headers.authorization;
      if (newAccessToken) {
        const token = newAccessToken.split(" ")[1];
        setToken(token);
      }
      return res;
    },
    err => {
      if (err.response.status === 401) {
        removeToken();
        removeNickName();
        // 인증 자격이 없음
        // 확인창 띄우고 로그인으로 보내던가 메인으로 보내던가
        //   () => (window.location.href = "/login"),
        //   () => (window.location.href = "/")
        //
        return;
      } else if (err.response.status === 403) {
        // 권한 없음
        // 경고창 띄우고 보내
        //   () => (window.location.href = "/")
        // );
        return;
      } else if (err.response.status === 400) {
        // 그냥 잘못된 요청
        console.error(err);
        return;
      } else if (err.response.status >= 500) {
        //  서버 문제
        console.error(err);
        return;
      }
      return Promise.reject(err);
    }
  );
  return axiosInstance;
};

export const api = createClient();
