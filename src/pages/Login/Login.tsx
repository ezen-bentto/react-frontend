import { useState, type FormEvent } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleLogin} className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">로그인</h2>

      <label className="block mb-2 font-medium">이메일</label>
      <input
        type="email"
        className="w-full border rounded px-3 py-2 mb-4"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="example@email.com"
      />

      <label className="block mb-2 font-medium">비밀번호</label>
      <input
        type="password"
        className="w-full border rounded px-3 py-2 mb-6"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="••••••"
      />

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        로그인
      </button>
    </form>
  );
};

export default LoginPage;
