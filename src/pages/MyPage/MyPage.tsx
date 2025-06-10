const MyPage = () => {
  // TODO: 로그인 상태에서 사용자 정보를 불러와서 보여주기
  const user = {
    name: "홍길동",
    email: "hong@example.com",
  };

  return (
    <div className="max-w-lg mx-auto mt-20 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">마이페이지</h2>

      <div className="mb-4">
        <span className="font-semibold">이름: </span>
        <span>{user.name}</span>
      </div>

      <div className="mb-4">
        <span className="font-semibold">이메일: </span>
        <span>{user.email}</span>
      </div>

      <button className="mt-6 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
        로그아웃
      </button>
    </div>
  );
};

export default MyPage;
