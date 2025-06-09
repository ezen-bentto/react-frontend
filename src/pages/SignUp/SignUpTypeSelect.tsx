import { useNavigate } from "react-router-dom";

const SignUpTypeSelect = () => {
  const navigate = useNavigate();

  const handleSelect = (type: "personal" | "company") => {
    if (type === "personal") {
      navigate("/signup/personal");
    } else {
      navigate("/signup/company");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-8">회원 유형을 선택하세요</h1>
      <div className="flex gap-4">
        <button
          onClick={() => handleSelect("personal")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg"
        >
          개인 회원
        </button>
        <button
          onClick={() => handleSelect("company")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg"
        >
          기업 회원
        </button>
      </div>
    </div>
  );
};

export default SignUpTypeSelect;
