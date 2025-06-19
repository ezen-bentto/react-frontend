// src/components/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"personal" | "company">("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const API_BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refresh = params.get("refresh");
    const error = params.get("error");

    if (token && refresh) {
      localStorage.setItem("accessToken", token);
      localStorage.setItem("refreshToken", refresh);
      alert("로그인 성공!");
      navigate("/");
    } else if (error) {
      setErrorMessage(
        error === "kakao_login_failed" ? "카카오 로그인에 실패했습니다." : "로그인에 실패했습니다."
      );
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    // 유효성 검사
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!emailRegex.test(email)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!passwordRegex.test(password)) {
      setErrorMessage("비밀번호는 8자 이상이며 숫자와 특수문자를 포함해야 합니다.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login/company`, {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("accessToken", response.data.data.accessToken);
        localStorage.setItem("refreshToken", response.data.data.refreshToken);
        alert("로그인 성공!");
        navigate("/");
      } else {
        setErrorMessage(response.data.message || "로그인 실패");
      }
    } catch (error: unknown) {
      // error: unknown으로 변경 후 instanceof AxiosError로 체크
      if (axios.isAxiosError(error)) {
        console.error("기업 로그인 에러:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || "로그인 중 오류가 발생했습니다.");
      } else {
        console.error("알 수 없는 에러:", error);
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "카카오") {
      try {
        const response = await axios.get(`${API_BASE_URL}/auth/kakao/login-url`);
        if (response.data.success && response.data.data.loginUrl) {
          window.location.href = response.data.data.loginUrl;
        } else {
          setErrorMessage("카카오 로그인 URL을 가져오지 못했습니다.");
        }
      } catch (error: unknown) {
        // error: unknown으로 변경 후 instanceof AxiosError로 체크
        if (axios.isAxiosError(error)) {
          console.error("카카오 로그인 URL 요청 에러:", error.response?.data || error.message);
          setErrorMessage("카카오 로그인 연동 중 오류가 발생했습니다.");
        } else {
          console.error("알 수 없는 에러:", error);
          setErrorMessage("알 수 없는 오류가 발생했습니다.");
        }
      }
    } else {
      alert(`${provider} 소셜 로그인은 아직 구현 중입니다.`);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            로그인
          </h2>

          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 mb-6 transition-colors duration-200">
            <button
              type="button"
              onClick={() => setTab("personal")}
              className={`w-1/2 py-2 text-center font-medium rounded-md transition-all duration-200 ${
                tab === "personal"
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              개인회원
            </button>
            <button
              type="button"
              onClick={() => setTab("company")}
              className={`w-1/2 py-2 text-center font-medium rounded-md transition-all duration-200 ${
                tab === "company"
                  ? "bg-white dark:bg-gray-600 text-blue-600 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              }`}
            >
              기업회원
            </button>
          </div>

          {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

          {tab === "personal" && (
            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => handleSocialLogin("카카오")}
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 focus:ring-yellow-500"
              >
                🎨 카카오로 로그인
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("네이버")}
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
              >
                🌐 네이버로 로그인
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("구글")}
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
              >
                🔍 구글로 로그인
              </button>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                계정이 없으신가요?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup/personal")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  회원가입
                </button>
              </p>
            </div>
          )}

          {tab === "company" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="example@company.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  비밀번호
                </label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 mt-2"
              >
                로그인
              </button>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                계정이 없으신가요?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup/company")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  회원가입
                </button>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
