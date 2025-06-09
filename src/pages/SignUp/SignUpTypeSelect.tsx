import { useNavigate } from "react-router-dom";

const SignUpTypeSelect = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">환영합니다!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-12 text-lg">회원 유형을 선택해주세요</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-105">
              <div className="text-4xl mb-4">👤</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                개인 회원
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">소셜 로그인으로 간편하게</p>
              <button
                type="button"
                onClick={() => navigate("/signup/personal")}
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
              >
                개인 회원 가입
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl transition-all duration-200 hover:shadow-2xl hover:scale-105">
              <div className="text-4xl mb-4">🏢</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                기업 회원
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">기업 정보로 회원가입</p>
              <button
                type="button"
                onClick={() => navigate("/signup/company")}
                className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500"
              >
                기업 회원 가입
              </button>
            </div>
          </div>
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              이미 계정이 있으신가요? 로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpTypeSelect;
