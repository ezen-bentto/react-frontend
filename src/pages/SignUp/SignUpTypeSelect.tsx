// src/pages/SignUp/SignUpTypeSelect.tsx
import { useNavigate } from "react-router-dom";

const SignUpTypeSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">환영합니다!</h1>
        <p className="mb-12 text-lg text-gray-600 dark:text-gray-300">회원 유형을 선택해주세요</p>
        <div className="flex flex-col justify-center gap-6 sm:flex-row">
          {/* [수정] 개인 회원 카드: 배경색 제거, 테두리 추가 */}
          <div className="rounded-2xl border border-gray-200 p-8 shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl dark:border-gray-700">
            <div className="mb-4 text-4xl">👤</div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">개인 회원</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">소셜 로그인으로 간편하게</p>
            <button
              type="button"
              onClick={() => navigate("/signup/personal")}
              className="w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              개인 회원 가입
            </button>
          </div>
          {/* [수정] 기업 회원 카드: 배경색 제거, 테두리 추가 */}
          <div className="rounded-2xl border border-gray-200 p-8 shadow-xl transition-all duration-200 hover:scale-105 hover:shadow-2xl dark:border-gray-700">
            <div className="mb-4 text-4xl">🏢</div>
            <h3 className="mb-4 text-xl font-semibold text-gray-900 dark:text-white">기업 회원</h3>
            <p className="mb-6 text-gray-600 dark:text-gray-400">기업 정보로 회원가입</p>
            <button
              type="button"
              onClick={() => navigate("/signup/company")}
              className="w-full rounded-lg bg-gray-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              기업 회원 가입
            </button>
          </div>
        </div>
        <div className="mt-8">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            이미 계정이 있으신가요? 로그인
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpTypeSelect;
