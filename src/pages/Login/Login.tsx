// src/pages/Login/Login.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  login as loginApi,
  getKakaoLoginUrl,
  getNaverLoginUrl,
  getGoogleLoginUrl,
  type LoginPayload,
} from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import Title from "@/components/shared/Title";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Badge from "@/components/shared/Badge";

type Provider = "카카오" | "네이버" | "구글";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [tab, setTab] = useState<"personal" | "company">("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // 소셜 로그인 후 리다이렉트 처리
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const refresh = params.get("refresh");
    const error = params.get("error");

    if (token && refresh) {
      login(token, refresh); // context의 login 함수로 로그인 상태 업데이트
      navigate("/");
    } else if (error) {
      setErrorMessage("소셜 로그인에 실패했습니다. 다시 시도해 주세요.");
    }
  }, [navigate, login]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    try {
      const payload: LoginPayload = { email, password };
      const loginData = await loginApi(payload); // 백엔드에 로그인 요청

      // [수정] localStorage 대신 context의 login 함수를 호출하여 전역 상태를 업데이트
      if (loginData.accessToken && loginData.refreshToken) {
        login(loginData.accessToken, loginData.refreshToken);
        navigate("/");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMsg = error.response?.data?.message || "로그인에 실패했습니다.";
        setErrorMessage(errorMsg);
      } else {
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleSocialLogin = async (provider: Provider) => {
    try {
      setErrorMessage("");
      let loginUrl = "";
      if (provider === "카카오") {
        loginUrl = await getKakaoLoginUrl();
      } else if (provider === "네이버") {
        loginUrl = await getNaverLoginUrl();
      } else if (provider === "구글") {
        loginUrl = await getGoogleLoginUrl();
      } else {
        alert(`${provider} 알 수 없는 오류가 발생했습니다.`);
        return;
      }
      window.location.href = loginUrl;
    } catch (error) {
      setErrorMessage(`${provider} 로그인 연동 중 오류가 발생했습니다.`);
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <Title titleText="로그인" className="mb-8 text-center text-3xl font-bold" />

        <div className="mb-6 flex rounded-lg border border-gray-200 p-1 dark:border-gray-700">
          <button
            type="button"
            onClick={() => setTab("personal")}
            className={`w-1/2 rounded-md py-2 text-center font-medium transition-all duration-200 ${
              tab === "personal"
                ? "bg-gray-100 text-blue-600 shadow-sm dark:bg-gray-900/50 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            개인회원
          </button>
          <button
            type="button"
            onClick={() => setTab("company")}
            className={`w-1/2 rounded-md py-2 text-center font-medium transition-all duration-200 ${
              tab === "company"
                ? "bg-gray-100 text-blue-600 shadow-sm dark:bg-gray-900/50 dark:text-blue-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            기업회원
          </button>
        </div>

        <div className="flex items-center justify-center mb-4">
          {errorMessage && (
            <Badge intent="orange" size="sm">
              {errorMessage}
            </Badge>
          )}
        </div>

        {tab === "personal" && (
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleSocialLogin("카카오")}
              className="w-full rounded-lg border border-yellow-400 bg-transparent px-6 py-3 text-lg font-semibold text-yellow-400 transition-all duration-200 hover:bg-yellow-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 dark:hover:bg-yellow-700 dark:hover:text-white"
            >
              🎨 카카오로 로그인
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("네이버")}
              className="w-full rounded-lg border border-green-500 bg-transparent px-6 py-3 text-lg font-semibold text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:hover:bg-green-700"
            >
              🌐 네이버로 로그인
            </button>
            <button
              type="button"
              onClick={() => handleSocialLogin("구글")}
              className="w-full rounded-lg border border-gray-400 bg-transparent px-6 py-3 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:bg-red-700"
            >
              🔍 구글로 로그인
            </button>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup/personal")}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                회원가입
              </button>
            </p>
          </div>
        )}

        {tab === "company" && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              legendText="이메일"
              type="email"
              name="email"
              placeholder="example@company.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <Input
              legendText="비밀번호"
              type="password"
              name="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <Button type="submit" intent="sky" className="mt-4 w-full">
              로그인
            </Button>
            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
              계정이 없으신가요?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup/company")}
                className="font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                회원가입
              </button>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
