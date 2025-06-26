// src/pages/MyPage/CompanyMypage.tsx

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getMyPosts,
  getMyBookmarkedContests,
  getMyBookmarkedCommunities,
} from "../../api/mypage/mypage";
import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import ListItem from "@/components/shared/ListItem";

interface Post {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  communityType: string;
}
interface Contest {
  id: number;
  title: string;
  organizer: string;
  endDate: string;
}
interface Community {
  id: number;
  title: string;
  content: string;
  createdDate: string;
  communityType: string;
}
type MypageData = Post | Contest | Community;

const PersonalMypage = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState("bookmarked-contests");
  const [data, setData] = useState<MypageData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        let response;
        if (activeTab === "bookmarked-contests") {
          response = await getMyBookmarkedContests();
        } else if (activeTab === "bookmarked-communities") {
          response = await getMyBookmarkedCommunities();
        } else if (activeTab === "my-posts") {
          response = await getMyPosts();
        }
        setData(response || []);
      } catch (error) {
        console.error(`${activeTab} 데이터 로드 실패:`, error);
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab, navigate, logout]);

  const renderList = () => {
    if (loading) return <p className="text-center py-8 dark:text-white">로딩 중...</p>;
    if (data.length === 0)
      return <p className="text-center py-8 text-gray-500">데이터가 없습니다.</p>;

    if (activeTab === "bookmarked-contests") {
      return (
        <ul className="flex flex-col gap-4">
          {(data as Contest[]).map(item => (
            <ListItem
              key={item.id}
              type="contest"
              linkSrc={`/contest/${item.id}`}
              title={item.title}
              description={item.organizer}
              endDate={item.endDate}
              organizer={item.organizer}
            />
          ))}
        </ul>
      );
    }

    if (activeTab === "bookmarked-communities" || activeTab === "my-posts") {
      return (
        <ul className="flex flex-col gap-4">
          {(data as Post[]).map(
            (
              item // '내가 쓴 글'과 '북마크한 커뮤니티'는 Post 타입으로 간주
            ) => (
              <ListItem
                key={item.id}
                type="community"
                linkSrc={`/community/content/${item.id}`}
                title={item.title}
                description={item.content}
                writer={user?.nickname}
                communityType={item.communityType}
              />
            )
          )}
        </ul>
      );
    }

    return null;
  };

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
              <Button type="button" onClickFnc={() => navigate("/contest/new")} intent="primary">
                글쓰기
              </Button>
              <Button type="button" onClickFnc={() => navigate("/mypage/edit")} intent="sky">
                프로필 수정
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex border-b-2 border-gray-200 dark:border-gray-700 mb-8 overflow-x-auto scrollbar-hide">
            <button onClick={() => setActiveTab("bookmarked-contests")} className={"px-6 py-3 ..."}>
              북마크한 공모전
            </button>
            <button
              onClick={() => setActiveTab("bookmarked-communities")}
              className={"px-6 py-3 ..."}
            >
              북마크한 커뮤니티
            </button>
            <button onClick={() => setActiveTab("my-posts")} className={"px-6 py-3 ..."}>
              내가 쓴 글
            </button>
          </div>
          <div className="min-h-[300px]">{renderList()}</div>
        </div>
      </section>
    </main>
  );
};

export default PersonalMypage;
