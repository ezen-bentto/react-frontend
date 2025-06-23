import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signUpCompany, type CompanySignUpPayload } from "../../api/auth";

// form의 상태를 위한 타입 정의
interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phoneNumber: string; // 여기는 하이픈 없는 숫자만 저장됩니다.
}

// [추가] 휴대폰 번호 표시를 위한 헬퍼 함수
const formatPhoneNumber = (digits: string) => {
  if (!digits) return "";
  const length = digits.length;
  if (length < 4) return digits;
  if (length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

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
  const [passwordValid, setPasswordValid] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 휴대폰 번호 입력 처리
    if (name === "phoneNumber") {
      const digits = value.replace(/\D/g, ""); // 숫자 이외의 문자 모두 제거
      setForm({ ...form, phoneNumber: digits.slice(0, 11) }); // 11자로 제한하여 숫자만 저장
    } else {
      setForm({ ...form, [name]: value });
    }

    // 비밀번호, 비밀번호 확인 일치 여부 및 유효성 검사
    if (name === "password" || name === "confirmPassword") {
      const pwd = name === "password" ? value : form.password;
      const confirmPwd = name === "confirmPassword" ? value : form.confirmPassword;

      if (confirmPwd) {
        setPasswordMatch(pwd === confirmPwd);
      } else {
        setPasswordMatch(null);
      }

      if (pwd) {
        setPasswordValid(passwordRegex.test(pwd));
      } else {
        setPasswordValid(null);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!emailRegex.test(form.email)) {
      setErrorMessage("유효한 이메일 주소를 입력해주세요.");
      return;
    }

    if (!passwordRegex.test(form.password)) {
      setErrorMessage("비밀번호는 8자 이상이며 숫자와 특수문자를 포함해야 합니다.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const payload: CompanySignUpPayload = {
        email: form.email,
        password: form.password,
        companyName: form.companyName,
        phoneNumber: form.phoneNumber, // state에는 숫자만 저장되어 있음
      };

      const response = await signUpCompany(payload);

      if (response.success) {
        setSuccessMessage(response.message || "회원가입이 완료되었습니다.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setErrorMessage(response.message || "회원가입 실패");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("기업 회원가입 에러:", error.response?.data || error.message);
        setErrorMessage(error.response?.data?.message || "회원가입 중 오류가 발생했습니다.");
      } else {
        console.error("알 수 없는 에러:", error);
        setErrorMessage("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  const getInputStyle = (isError = false, isSuccess = false) => {
    let borderColor =
      "border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500";
    if (isError) borderColor = "border-red-500 focus:ring-red-500 focus:border-red-500";
    if (isSuccess) borderColor = "border-green-500 focus:ring-green-500 focus:border-green-500";

    return `w-full px-3 py-2 border rounded-lg bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${borderColor}`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 pt-20">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <h2 className="mb-2 text-center text-3xl font-bold text-gray-900 dark:text-white">
          기업 회원가입
        </h2>
        <p className="mb-8 text-center text-gray-600 dark:text-gray-400">
          기업 정보를 입력해주세요
        </p>

        {errorMessage && <p className="mb-4 text-center text-red-500">{errorMessage}</p>}
        {successMessage && <p className="mb-4 text-center text-green-600">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              비밀번호
            </label>
            <input
              type="password"
              name="password"
              className={getInputStyle(passwordValid === false, passwordValid === true)}
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={handleChange}
              required
            />
            {passwordValid !== null && (
              <p
                className={`mt-1 text-xs ${
                  passwordValid
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {passwordValid
                  ? "✓ 비밀번호 형식이 올바릅니다"
                  : "✗ 비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다"}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                className={`mt-1 text-xs ${
                  passwordMatch
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {passwordMatch ? "✓ 비밀번호가 일치합니다" : "✗ 비밀번호가 일치하지 않습니다"}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
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
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              휴대폰번호
            </label>
            <input
              type="tel"
              name="phoneNumber"
              className={getInputStyle()}
              placeholder="010-0000-0000"
              value={formatPhoneNumber(form.phoneNumber)}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-lg bg-blue-600 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-600 dark:hover:bg-gray-700"
          >
            회원가입
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
        </form>
      </div>
    </div>
  );
};

export default SignUpCompany;
