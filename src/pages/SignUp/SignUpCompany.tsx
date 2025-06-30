import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signUpCompany, type CompanySignUpPayload } from "../../api/auth";
import Title from "@/components/shared/Title";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Badge from "@/components/shared/Badge";
import AlertModal from "@/components/shared/AlertModal";

// form의 상태를 위한 타입 정의
interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  companyName: string;
  phoneNumber: string; // 하이픈 없는 숫자만 저장
}

// 휴대폰 번호 표시를 위한 헬퍼 함수
const formatPhoneNumber = (digits: string) => {
  if (!digits) return "";
  const length = digits.length;
  if (length < 4) return digits;
  if (length < 8) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
};

const SignUpCompany = () => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDialogElement>(null);
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
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  useEffect(() => {
    if (errorMessage || successMessage) {
      const timer = setTimeout(() => {
        setErrorMessage("");
        setSuccessMessage("");
      }, 4000); // 4초
      return () => clearTimeout(timer);
    }
  }, [errorMessage, successMessage]);

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

    if (!agreedToTerms) {
      setErrorMessage("이용약관에 동의해야 회원가입을 진행할 수 있습니다.");
      return;
    }

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

  const handleTermsAreaClick = () => {
    if (agreedToTerms) {
      // 이미 동의한 상태이면, 클릭 시 동의를 해제합니다.
      setAgreedToTerms(false);
    } else {
      // 동의하지 않은 상태이면, 클릭 시 모달을 엽니다.
      modalRef.current?.showModal();
    }
  };

  const handleAgreeInModal = () => {
    setAgreedToTerms(true);
    modalRef.current?.close();
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 pt-28">
      <div className="w-full max-w-md rounded-2xl border border-gray-200 p-8 shadow-xl dark:border-gray-700">
        <Title titleText="기업 회원가입" className="mb-6 text-center text-3xl font-bold" />

        <div className="flex h-4 items-center justify-center ">
          {errorMessage && (
            <Badge intent="orange" size="sm">
              {errorMessage}
            </Badge>
          )}
          {successMessage && (
            <Badge intent="default" size="sm">
              {successMessage}
            </Badge>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Input
              legendText="이메일"
              type="email"
              name="email"
              placeholder="company@example.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              legendText="비밀번호"
              type="password"
              name="password"
              placeholder="8자 이상, 숫자, 특수문자 포함"
              status={passwordValid === null ? "normal" : passwordValid ? "success" : "error"}
              value={form.password}
              onChange={handleChange}
              required
            />
            {passwordValid === false && (
              <div className="mt-1">
                <Badge intent={"default"} size="sm">
                  비밀번호는 8자 이상, 숫자와 특수문자를 포함해야 합니다
                </Badge>
              </div>
            )}
          </div>

          <div>
            <Input
              legendText="비밀번호 확인"
              type="password"
              name="confirmPassword"
              placeholder="비밀번호를 다시 입력하세요"
              status={passwordMatch === null ? "normal" : passwordMatch ? "success" : "error"}
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            {passwordMatch === false && (
              <div className="mt-1">
                <Badge intent={"default"} size="sm">
                  비밀번호가 일치하지 않습니다
                </Badge>
              </div>
            )}
          </div>

          <div>
            <Input
              legendText="회사명"
              type="text"
              name="companyName"
              placeholder="회사명을 입력하세요 (닉네임으로 사용됩니다)"
              value={form.companyName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Input
              legendText="휴대폰번호"
              type="tel"
              name="phoneNumber"
              placeholder="010-0000-0000"
              value={formatPhoneNumber(form.phoneNumber)}
              onChange={handleChange}
              required
            />
          </div>

          <div
            className="flex items-center gap-2 mt-2 cursor-pointer"
            onClick={handleTermsAreaClick}
          >
            <input
              type="checkbox"
              id="terms-checkbox"
              checked={agreedToTerms}
              readOnly
              className="size-4 rounded border-gray-300 bg-gray-100 accent-blue-600 pointer-events-none"
            />
            <label className="text-sm text-gray-700 dark:text-gray-300">
              이용약관에 동의합니다 (필수)
            </label>
          </div>

          <div className="mt-4">
            <Button type="submit" intent="sky" size="lg" className="w-full">
              회원가입
            </Button>
          </div>

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
      <AlertModal
        ref={modalRef}
        modalId="terms_modal"
        title="이용약관"
        actions={
          <>
            <button type="button" className="btn" onClick={() => modalRef.current?.close()}>
              닫기
            </button>
            <button type="button" className="btn btn-primary" onClick={handleAgreeInModal}>
              동의
            </button>
          </>
        }
      >
        <div className="prose max-w-none dark:prose-invert">
          <p>제1조 (목적) 이 약관은 ...</p>
          <p>제2조 (정의) ...</p>
          <p>이용약관의 전체 내용을 확인하였으며, 이에 동의합니다.</p>
        </div>
      </AlertModal>
    </div>
  );
};

export default SignUpCompany;
