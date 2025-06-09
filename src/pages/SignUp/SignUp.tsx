import { useState, type FormEvent } from "react";

const SignUp = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: 유효성 검사 및 API 연동
    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">회원가입</h2>

      <label className="block mb-2 font-medium">이름</label>
      <input
        type="text"
        className="w-full border rounded px-3 py-2 mb-4"
        value={form.name}
        onChange={e => handleChange("name", e.target.value)}
      />

      <label className="block mb-2 font-medium">이메일</label>
      <input
        type="email"
        className="w-full border rounded px-3 py-2 mb-4"
        value={form.email}
        onChange={e => handleChange("email", e.target.value)}
      />

      <label className="block mb-2 font-medium">비밀번호</label>
      <input
        type="password"
        className="w-full border rounded px-3 py-2 mb-4"
        value={form.password}
        onChange={e => handleChange("password", e.target.value)}
      />

      <label className="block mb-2 font-medium">비밀번호 확인</label>
      <input
        type="password"
        className="w-full border rounded px-3 py-2 mb-6"
        value={form.confirmPassword}
        onChange={e => handleChange("confirmPassword", e.target.value)}
      />

      <button type="submit" className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700">
        회원가입
      </button>
    </form>
  );
};

export default SignUp;
