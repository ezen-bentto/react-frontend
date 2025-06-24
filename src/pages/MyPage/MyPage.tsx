// src/pages/MyPage/MyPage.tsx

import { useAuth } from "../../context/AuthContext";
import PersonalMypage from "./PersonalMypage";
import CompanyMypage from "./CompanyMypage";
import AdminDashboard from "./AdminDashboard";

const MyPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="pt-24 text-center">로딩 중...</div>;
  }

  switch (user.userType) {
    case "개인":
      return <PersonalMypage />;
    case "기업":
      return <CompanyMypage />;
    case "관리자":
      return <AdminDashboard />;
    default:
      return <div className="pt-24 text-center">알 수 없는 사용자 유형입니다.</div>;
  }
};

export default MyPage;
