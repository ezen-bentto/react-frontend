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
    <div className="flex min-h-screen items-center justify-center px-4">
      {/* [수정] 카드 배경색 제거, 테두리 추가 */}
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
          개인 회원가입
        </h2>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
          소셜 계정으로 간편하게 가입하세요
        </p>

        <div className="flex flex-col gap-4">
          {/* [수정] 소셜 버튼들 다크모드 스타일 통일 */}
          <button
            type="button"
            onClick={() => handleSocialSignup("카카오")}
            className="w-full rounded-lg border border-yellow-400 bg-transparent px-6 py-3 text-lg font-semibold text-yellow-400 transition-all duration-200 hover:bg-yellow-400 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
          >
            🎨 카카오로 회원가입
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignup("네이버")}
            className="w-full rounded-lg border border-green-500 bg-transparent px-6 py-3 text-lg font-semibold text-green-500 transition-all duration-200 hover:bg-green-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            🌐 네이버로 회원가입
          </button>
          <button
            type="button"
            onClick={() => handleSocialSignup("구글")}
            className="w-full rounded-lg border border-gray-400 bg-transparent px-6 py-3 text-lg font-semibold text-gray-600 transition-all duration-200 hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:text-gray-400"
          >
            🔍 구글로 회원가입
          </button>
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            이미 계정이 있으신가요?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              로그인
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPersonal;
