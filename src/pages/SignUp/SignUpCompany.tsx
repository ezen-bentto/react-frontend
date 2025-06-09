import React, { useState } from "react";
import axios from "axios";

const SignUpCompany = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    companyName: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + "/signup/company",
        form,
        { withCredentials: true }
      );
      if (res.status === 201) {
        setMessage("회원가입 성공!");
      } else {
        setMessage("회원가입 실패");
      }
    } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      setMessage(error.response?.data?.message || "서버 에러가 발생했습니다.");
    } else {
      setMessage("알 수 없는 에러가 발생했습니다.");
    }
  }
  };

  return (
  <div className="flex flex-col items-center justify-center min-h-screen px-4">
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-sm bg-white p-6 rounded shadow"
    >
      <input
        name="email"
        type="email"
        placeholder="아이디"
        value={form.email}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        name="companyName"
        type="text"
        placeholder="기업명"
        value={form.companyName}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <input
        name="phoneNumber"
        type="tel"
        placeholder="전화번호"
        value={form.phoneNumber}
        onChange={handleChange}
        required
        className="border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        회원가입
      </button>
      <p className="text-center text-red-500">{message}</p>
    </form>
  </div>
);

};

export default SignUpCompany;
