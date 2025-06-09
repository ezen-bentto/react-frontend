import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"personal" | "company">("personal");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직
    console.log("로그인 처리:", { email, password, type: tab });
  };

  const handleSocialLogin = (provider: string) => {
    // 소셜 로그인 처리 로직
    console.log(`${provider} 소셜 로그인 처리`);
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            로그인
          </h2>

          {/* 탭 */}
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

          {/* 개인회원 로그인 (소셜 로그인) */}
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
                  onClick={() => navigate("/signup")}
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  회원가입
                </button>
              </p>
            </div>
          )}

          {/* 기업회원 로그인 */}
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
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 mt-2"
              >
                로그인
              </button>
              <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-4">
                계정이 없으신가요?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/signup")}
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
