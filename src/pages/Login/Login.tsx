// src/pages/Login/Login.tsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // 기본 axios import로 변경
import { login, getKakaoLoginUrl, type LoginPayload } from "../../api/auth"; // 절대 경로 대신 상대 경로 사용

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"personal" | "company">("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
      const payload: LoginPayload = { email, password };
      const loginData = await login(payload);

      localStorage.setItem("accessToken", loginData.accessToken);
      if (loginData.refreshToken) {
        localStorage.setItem("refreshToken", loginData.refreshToken);
      }

      alert("로그인 성공!");
      navigate("/");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("기업 로그인 에러:", error);
        // 서버에서 반환된 에러 메시지 처리
        const errorMsg = error.response?.data?.message || "로그인에 실패했습니다.";
        setErrorMessage(errorMsg);
      } else {
        console.error("알 수 없는 에러:", error);
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    if (provider === "카카오") {
      try {
        const loginUrl = await getKakaoLoginUrl();
        window.location.href = loginUrl;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("카카오 로그인 URL 요청 에러:", error);
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
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white">
          로그인
        </h2>

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

        {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}

        {tab === "personal" && (
          <div className="flex flex-col gap-3">
            {/* [수정] 다크모드 hover시 톤 다운된 색상 적용 */}
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
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                이메일
              </label>
              <input
                type="email"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500"
                placeholder="example@company.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                비밀번호
              </label>
              <input
                type="password"
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-gray-900 placeholder-gray-500 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:ring-blue-500"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
            {/* [수정] 다크모드 버튼 색상 변경 */}
            <button
              type="submit"
              className="mt-2 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:focus:ring-offset-2 dark:bg-gray-600 dark:hover:bg-gray-700"
            >
              로그인
            </button>
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
