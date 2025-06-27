import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, // 필요시 true (cookie 로그인일 경우)
});

// 선택적 Authorization 헤더 자동 주입
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers?.set?.("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default axiosInstance;
