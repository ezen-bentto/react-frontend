import axios, { AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// 요청 인터셉터: 모든 요청에 Access Token 자동 추가
axiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// 응답 인터셉터: 401 에러 발생 시 토큰 재발급 시도
axiosInstance.interceptors.response.use(
  (response) => response, // 성공 응답은 그대로 반환
  async (error: AxiosError) => {
    const originalRequest = error.config;
    
    // 401 에러이고, 재시도한 요청이 아닐 경우에만 실행
    if (error.response?.status === 401 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true; // 무한 재시도 방지
      
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {
            refreshToken,
        });

        const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res.data.data;
        localStorage.setItem("accessToken", newAccessToken);
        localStorage.setItem("refreshToken", newRefreshToken);

        // 원래 요청의 헤더에 새로운 토큰을 설정하여 다시 시도
        if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(originalRequest);

      } catch (refreshError) {
        console.error("토큰 갱신 실패:", refreshError);
        localStorage.clear();
        alert("세션이 만료되었습니다. 다시 로그인해 주세요.");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;