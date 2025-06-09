const SignUpPersonal = () => {

const kakaoUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/kakao`;
const naverUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/naver`;
const googleUrl = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;

    
  return (
    <div className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h2 className="text-2xl font-bold mb-4">개인 회원 소셜 로그인</h2>
      <a href={kakaoUrl} className="btn-kakao">
        카카오로 시작하기
      </a>
      <a href={naverUrl} className="btn-naver">
        네이버로 시작하기
      </a>
      <a href={googleUrl} className="btn-google">
        구글로 시작하기
      </a>
    </div>
  );
};

export default SignUpPersonal;
