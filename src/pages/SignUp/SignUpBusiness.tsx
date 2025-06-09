const SignUpBusiness = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">기업 회원가입</h1>
      <form className="flex flex-col gap-4 w-80">
        <input type="text" placeholder="회사명" className="border p-2 rounded" />
        <input type="email" placeholder="이메일" className="border p-2 rounded" />
        <input type="password" placeholder="비밀번호" className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white py-2 rounded">
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpBusiness;
