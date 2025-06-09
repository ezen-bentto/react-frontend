import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound";
import Policy from "@/pages/Policy/Policy";
import Stats from "@/pages/Stats/Stats";
import MainLayout from "@/layouts/MainLayout";
import CommunityWrite from "@/pages/Community/CommunityWrite";
import CommunityDetail from "@/pages/Community/CommunityDetail";
import Login from "@/pages/Login/Login";
import SignUp from "@/pages/SignUp/Signup";
import MyPage from "@/pages/MyPage/MyPage";

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/detail" element={<CommunityDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/myPage" element={<MyPage />} />

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
