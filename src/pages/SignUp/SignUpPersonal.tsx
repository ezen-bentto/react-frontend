const SignUpPersonal = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">소셜 로그인으로 가입</h1>
      <div className="flex flex-col gap-4">
        <button className="bg-yellow-400 px-6 py-3 rounded-lg w-64">카카오 로그인</button>
        <button className="bg-green-400 px-6 py-3 rounded-lg w-64">네이버 로그인</button>
        <button className="bg-red-500 px-6 py-3 text-white rounded-lg w-64">구글 로그인</button>
      </div>
    </div>
  );
};

export default SignUpPersonal;
