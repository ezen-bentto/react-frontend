import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound";
import Policy from "@/pages/Policy/Policy";
import Stats from "@/pages/Stats/Stats";
import MainLayout from "@/layouts/MainLayout";
import CommunityWrite from "@/pages/Community/CommunityWrite";
import CommunityContent from "@/pages/Community/CommunityContent";
import CommunityList from "@/pages/Community/CommunityList";


const AppRouter = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/stats" element={<Stats />} />
        <Route path="/community/write" element={<CommunityWrite />} />
        <Route path="/community/content/:communityId" element={<CommunityContent />} />
        <Route path="/community/list" element={<CommunityList />} />


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
