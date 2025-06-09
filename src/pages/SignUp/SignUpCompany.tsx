import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phoneNumber: string;
}

const SignUpCompany = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignUpForm>({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phoneNumber: "",
  });
  const [passwordMatch, setPasswordMatch] = useState<boolean | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // 비밀번호 확인 검사
    if (name === "confirmPassword" || name === "password") {
      const pwd = name === "password" ? value : form.password;
      const confirmPwd = name === "confirmPassword" ? value : form.confirmPassword;

      if (confirmPwd) {
        setPasswordMatch(pwd === confirmPwd);
      } else {
        setPasswordMatch(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 기업 회원가입 처리 로직
    console.log("기업 회원가입 처리:", form);
  };

  const getInputStyle = (isError = false, isSuccess = false) => {
    let borderColor =
      "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500";
    if (isError) borderColor = "border-red-500 focus:ring-red-500 focus:border-red-500";
    if (isSuccess) borderColor = "border-green-500 focus:ring-green-500 focus:border-green-500";

    return `w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${borderColor}`;
  };

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md bg-white dark:bg-gray-800 shadow-xl rounded-2xl p-8 transition-colors duration-200">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">
            기업 회원가입
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            기업 정보를 입력해주세요
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                이메일
              </label>
              <input
                type="email"
                name="email"
                className={getInputStyle()}
                placeholder="company@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                비밀번호
              </label>
              <input
                type="password"
                name="password"
                className={getInputStyle()}
                placeholder="비밀번호를 입력하세요"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                비밀번호 확인
              </label>
              <input
                type="password"
                name="confirmPassword"
                className={getInputStyle(passwordMatch === false, passwordMatch === true)}
                placeholder="비밀번호를 다시 입력하세요"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordMatch !== null && (
                <p
                  className={`text-xs mt-1 ${passwordMatch ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                >
                  {passwordMatch ? "✓ 비밀번호가 일치합니다" : "✗ 비밀번호가 일치하지 않습니다"}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                회사명
              </label>
              <input
                type="text"
                name="companyName"
                className={getInputStyle()}
                placeholder="회사명을 입력하세요"
                value={form.companyName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                휴대폰번호
              </label>
              <input
                type="tel"
                name="phoneNumber"
                className={getInputStyle()}
                placeholder="010-0000-0000"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 text-lg font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 mt-4"
            >
              회원가입
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpCompany;
