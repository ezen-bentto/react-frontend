import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import NotFound from "@/pages/NotFound";
import Policy from "@/pages/Policy/Policy"
import Stats from "@/pages/Stats/Stats";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/stats" element={<Stats />} />
        
        {/*
        [ 예제: 게시글 목록 및 게시글 상세 페이지 라우터 설정 ]
         ** 게시글 라우터 설정 방법 ** 
         <Route path="/posts" element={<PostList />} />

         ** 동적 라우터 설정 방법 ** 
         <Route path="/posts/:postId" element={<PostDetail />} />
        */}
       
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;