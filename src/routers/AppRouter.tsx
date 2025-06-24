import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound";
import Policy from "@/pages/Policy/Policy";
import Stats from "@/pages/Stats/Stats";
import MainLayout from "@/layouts/MainLayout";
import CommunityWrite from "@/pages/Community/CommunityWrite";
import CommunityContent from "@/pages/Community/CommunityContent";
import CommunityList from "@/pages/Community/CommunityList";
import Login from "@/pages/Login/Login";
import MyPage from "@/pages/MyPage/MyPage";
import PersonalMypage from "@/pages/MyPage/PersonalMypage";
import CompanyMypage from "@/pages/MyPage/CompanyMypage";
import AdminDashboard from "@/pages/MyPage/AdminDashboard";
import ProfileEdit from "@/pages/MyPage/ProfileEdit";
import SignUpTypeSelect from "@/pages/SignUp/SignUpTypeSelect";
import SignUpPersonal from "@/pages/SignUp/SignUpPersonal";
import SignUpCompany from "@/pages/SignUp/SignUpCompany";
import ContestList from "@/pages/Contest/ContestList";
import ContestDetail from "@/pages/Contest/ContestDetail";
import { ProtectedRoute } from "@/routers/ProtectedRoute";
import { PublicRoute } from "@/routers/PublicRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        {/* --- 누구나 접근 가능한 페이지 --- */}
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/community/content/:communityId" element={<CommunityContent />} />
        <Route path="/community/list" element={<CommunityList />} />
        <Route path="/contest" element={<ContestList />} />
        <Route path="/contest/:contestId" element={<ContestDetail />} />

        {/* --- 로그인 한 사람만 접근 가능한 페이지 --- */}
        <Route
          path="/mypage"
          element={
            <ProtectedRoute>
              <MyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/personal"
          element={
            <ProtectedRoute>
              <PersonalMypage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/company"
          element={
            <ProtectedRoute>
              <CompanyMypage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/mypage/edit"
          element={
            <ProtectedRoute>
              <ProfileEdit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/community/write"
          element={
            <ProtectedRoute>
              <CommunityWrite />
            </ProtectedRoute>
          }
        />

        {/* --- 로그인 안 한 사람만 접근 가능한 페이지 --- */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/login/callback"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignUpTypeSelect />
            </PublicRoute>
          }
        />
        <Route
          path="/signup/personal"
          element={
            <PublicRoute>
              <SignUpPersonal />
            </PublicRoute>
          }
        />
        <Route
          path="/signup/company"
          element={
            <PublicRoute>
              <SignUpCompany />
            </PublicRoute>
          }
        />

        {/*
        [ 예제: 게시글 목록 및 게시글 상세 페이지 라우터 설정 ]
         ** 게시글 라우터 설정 방법 ** 
         <Route path="/posts" element={<PostList />} />

         ** 동적 라우터 설정 방법 ** 
         <Route path="/posts/:postId" element={<PostDetail />} />
        */}
      </Route>
    </Routes>
  );
};

export default AppRouter;
