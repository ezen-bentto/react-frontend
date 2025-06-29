// src/pages/MyPage/CompanyMypage.tsx

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
  getMyPosts,
  getMyBookmarkedContests,
  getMyBookmarkedCommunities,
} from "../../api/mypage/mypage";
import { fetchContestPage } from "@/api/contest/contestApi";
import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import ListItem from "@/components/shared/ListItem";
import Badge from "@/components/shared/Badge";

interface Post {
  id: number;
  title: string;
  content: string;
  recruitEndDate?: string;
  categoryType?: string;
  communityType: string;
}
interface BookmarkedCommunity extends Post {
  authorNickname: string;
}
interface BookmarkedContest {
  id: number;
  title: string;
  organizer: string;
  endDate: string;
}
type MypageData = Post | BookmarkedContest | BookmarkedCommunity;

const CompanyMypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "bookmarked-contests";

  const [activeTab, setActiveTab] = useState(initialTab);
  const [data, setData] = useState<MypageData[]>([]);
  const [loading, setLoading] = useState(true);

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
    navigate(`/mypage?tab=${tabName}`, { replace: true });
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (activeTab === "bookmarked-contests") {
          // 1. 백엔드에서 데이터를 가져옵니다.
          //    이 시점의 crawledContestIds는 실제로는 ["3"] 같은 문자열 배열입니다.
          const { crawledContestIds, dbContests } = await getMyBookmarkedContests();

          // 2. API에서 받은 문자열 배열을 숫자 배열로 변환합니다.
          //    이제 numericCrawledIds는 [3] 과 같은 숫자 배열이 되어 타입스크립트와 일치합니다.
          const numericCrawledIds = crawledContestIds.map(id => Number(id));

          let crawledContests: BookmarkedContest[] = [];

          if (numericCrawledIds && numericCrawledIds.length > 0) {
            const allCrawledData = await fetchContestPage();

            // 3. 이제 숫자 배열을 사용하여 숫자 ID를 직접 비교합니다.
            const bookmarkedCrawledData = allCrawledData.filter(contest => {
              // contest.id (숫자)와 numericCrawledIds (숫자 배열)를 비교합니다.
              // 이제 타입이 일치하므로 에러가 발생하지 않습니다.
              return numericCrawledIds.includes(contest.id);
            });

            crawledContests = bookmarkedCrawledData.map(item => ({
              id: item.id, // 이미 숫자이므로 Number()로 감쌀 필요 없음
              title: item.title,
              organizer: item.organizer,
              endDate: item.end_date,
            }));
          }

          const allBookmarkedIds = [...numericCrawledIds, ...dbContests.map(c => c.id)];
          const combinedData = [...crawledContests, ...dbContests];

          const sortedData = allBookmarkedIds
            .map(id => combinedData.find(item => item.id === id))
            .filter((item): item is BookmarkedContest => !!item);

          setData(sortedData);
        } else {
          // '북마크한 커뮤니티' 또는 '내가 쓴 글' 탭 처리
          let response;
          if (activeTab === "bookmarked-communities") {
            response = await getMyBookmarkedCommunities();
          } else if (activeTab === "my-posts") {
            response = await getMyPosts();
          }
          setData(response || []);
        }
      } catch (error) {
        console.error(`${activeTab} 데이터 로드 실패:`, error);
        setData([]); // 에러 발생 시 데이터 초기화
        alert("데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [activeTab]);

  const renderList = () => {
    if (loading) return <p className="text-center py-8 dark:text-white">로딩 중...</p>;
    if (data.length === 0)
      return <p className="text-center py-8 text-gray-500">데이터가 없습니다.</p>;

    if (activeTab === "bookmarked-contests") {
      return (
        <ul className="flex flex-col gap-4">
          {(data as BookmarkedContest[]).map(item => (
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
    } else {
      // '내가 쓴 글' 또는 '북마크한 커뮤니티'
      return (
        <ul className="flex flex-col gap-4">
          {(data as (Post | BookmarkedCommunity)[]).map(item => (
            <ListItem
              key={item.id}
              type="community"
              linkSrc={`/community/content/${item.id}`}
              title={item.title}
              description={item.content}
              endDate={item.recruitEndDate}
              writer={
                activeTab === "bookmarked-communities"
                  ? (item as BookmarkedCommunity).authorNickname
                  : undefined
              }
              communityType={item.communityType}
              categoryType={item.categoryType}
            />
          ))}
        </ul>
      );
    }
  };

  return (
    <main className="min-h-screen">
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
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                    {user?.nickname}
                  </h2>
                  {user?.userType && (
                    <div className="relative top-[2px]">
                      <Badge intent="primary" size="sm">
                        {user.userType}
                      </Badge>
                    </div>
                  )}
                </div>
                <p className="text-lg text-gray-600 dark:text-gray-400">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button type="button" onClickFnc={() => navigate("/contest/new")} intent="sky">
                글쓰기
              </Button>
              <Button type="button" onClickFnc={() => navigate("/mypage/edit")} intent="primary">
                프로필 수정
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-[1400px] mx-auto">
          {/* 탭 버튼에 activeTab 상태에 따른 조건부 스타일링 적용 */}
          <div className="flex mb-8 overflow-x-auto border-b-2 border-gray-200 dark:border-gray-700 scrollbar-hide">
            <button
              onClick={() => handleTabChange("bookmarked-contests")}
              className={`px-6 py-3 text-base font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "bookmarked-contests" ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400" : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}
            >
              북마크한 공모전
            </button>
            <button
              onClick={() => handleTabChange("bookmarked-communities")}
              className={`px-6 py-3 text-base font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "bookmarked-communities" ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:border-blue-400" : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}
            >
              북마크한 커뮤니티
            </button>
            <button
              onClick={() => handleTabChange("my-posts")}
              className={`px-6 py-3 text-base font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === "my-posts" ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:border-blue-400" : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"}`}
            >
              내가 쓴 글
            </button>
          </div>
          <div className="min-h-[300px]">{renderList()}</div>
        </div>
      </section>
    </main>
  );
};

export default CompanyMypage;
