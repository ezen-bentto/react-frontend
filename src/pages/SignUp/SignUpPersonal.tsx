//react-frontend\src\pages\SignUp\SignUpPersonal.tsx
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getKakaoSignUpUrl } from "../../api/auth";

const SignUpPersonal = () => {
  const navigate = useNavigate();

  const handleSocialSignup = async (provider: string) => {
    if (provider === "카카오") {
      try {
        const loginUrl = await getKakaoSignUpUrl();
        window.location.href = loginUrl; // 카카오 로그인 페이지로 리다이렉트
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          console.error("카카오 회원가입 URL 요청 에러:", error.response?.data || error.message);
          alert("카카오 회원가입 연동 중 오류가 발생했습니다.");
        } else if (error instanceof Error) {
          console.error("카카오 회원가입 에러:", error.message);
          alert(error.message);
        } else {
          console.error("알 수 없는 에러:", error);
          alert("알 수 없는 오류가 발생했습니다.");
        }
      }
    } else {
      alert(`${provider} 소셜 회원가입은 아직 구현 중입니다.`);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            개인 회원가입
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            소셜 계정으로 간편하게 가입하세요
          </p>

          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={() => handleSocialSignup("카카오")}
              className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 focus:ring-yellow-500"
            >
              🎨 카카오로 회원가입
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup("네이버")}
              className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-green-500 hover:bg-green-600 text-white focus:ring-green-500"
            >
              🌐 네이버로 회원가입
            </button>
            <button
              type="button"
              onClick={() => handleSocialSignup("구글")}
              className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-500 hover:bg-red-600 text-white focus:ring-red-500"
            >
              🔍 구글로 회원가입
            </button>
            <p className="text-sm text-center text-gray-600 dark:text-gray-400 mt-6">
              이미 계정이 있으신가요?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
              >
                로그인
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPersonal;
