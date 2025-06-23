// src/pages/MyPage/PersonalMypage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getMyPosts, getMyBookmarks } from "../../api/mypage/mypage";

import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import ListItem from "@/components/shared/ListItem";

interface MyPost {
  id: number;
  title: string;
  content: string;
  // ... 백엔드에서 오는 다른 속성들
}

const PersonalMypage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // 로그아웃 함수

  const [activeTab, setActiveTab] = useState("my-posts");
  const [myPosts, setMyPosts] = useState<MyPost[]>([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postData = await getMyPosts();
        setMyPosts(postData || []);

        // 북마크 기능도 동일하게 호출 가능
        // const bookmarkData = await getMyBookmarks();
        // setBookmarks(bookmarkData || []);
      } catch (error) {
        console.error("마이페이지 데이터 로드 실패:", error);
        alert("데이터를 불러오는 중 오류가 발생했습니다. 다시 로그인해주세요.");
        logout(); // 에러 발생 시(주로 토큰 만료) 자동 로그아웃
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, logout]);

  return (
    <main className="dark:bg-gray-900 min-h-screen">
      <section className="pt-24 pb-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <Avatar
                src={user?.profileImage || "/images/default-avatar.png"}
                shape="circle"
                size="xl"
              />
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {user?.nickname}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" onClick={() => navigate("/community/write")} intent="primary">
                글쓰기
              </Button>
              <Button type="button" onClick={() => navigate("/mypage/edit")} intent="secondary">
                프로필 수정
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex border-b-2 border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("my-posts")}
              className={`px-8 py-4 text-base font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === "my-posts"
                  ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 border-transparent"
              }`}
            >
              내가 쓴 글
            </button>
            <button
              onClick={() => setActiveTab("bookmarks")}
              className={`px-8 py-4 text-base font-medium border-b-2 transition-all duration-300 whitespace-nowrap ${
                activeTab === "bookmarks"
                  ? "text-blue-600 border-blue-600 dark:text-blue-400 dark:border-blue-400"
                  : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 border-transparent"
              }`}
            >
              북마크
            </button>
          </div>

          <div className="min-h-[300px]">
            {loading ? (
              <p className="text-center py-8 dark:text-white">로딩 중...</p>
            ) : (
              <>
                {activeTab === "my-posts" &&
                  (myPosts.length === 0 ? (
                    <p className="text-center py-8 text-gray-500">작성한 글이 없습니다.</p>
                  ) : (
                    <ul className="flex flex-col gap-4">
                      {myPosts.map(post => (
                        <ListItem
                          key={post.id}
                          type="community"
                          linkSrc={`/community/content/${post.id}`}
                          title={post.title}
                          description={post.content}
                          writer={user?.nickname}
                        />
                      ))}
                    </ul>
                  ))}
                {activeTab === "bookmarks" && (
                  <p className="text-center py-8 text-gray-500">북마크 기능은 준비 중입니다.</p>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default PersonalMypage;
