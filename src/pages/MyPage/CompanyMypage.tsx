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
import { toggleScrap } from "@/api/scrap/toggle";
import Avatar from "@/components/shared/Avatar";
import Button from "@/components/shared/Button";
import ListItem from "@/components/shared/ListItem";
import Badge from "@/components/shared/Badge";

const getContestCategoryLabel = (categoryId: number): string => {
  const categoryMap: Record<number, string> = {
    1: "포스터/웹툰/콘텐츠",
    2: "사진/영상/UCC",
    3: "아이디어/기획",
    4: "IT/학술/논문",
    5: "네이밍/슬로건",
    6: "스포츠/음악",
    7: "미술/디자인/건축",
  };
  return categoryMap[categoryId] || "기타";
};
interface Post {
  id: number;
  title: string;
  content: string;
  recruitEndDate?: string;
  categoryType?: string;
  communityType: string;
  commentCount?: number;
  likesCount?: number;
  scrapYn?: "Y" | "N";
}
interface BookmarkedCommunity extends Post {
  authorNickname: string;
}
interface BookmarkedContest {
  id: number;
  title: string;
  organizer: string;
  endDate: string;
  organizerTypeTag?: string;
  participantsTag?: string;
  categoryTag?: string;
}

interface DbContestData {
  id: number;
  title: string;
  organizer: string;
  endDate: string;
  organizer_type: string;
  participants: string;
  category_id: number;
}

type MypageData = Post | BookmarkedContest | BookmarkedCommunity;

const CompanyMypage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isLoggedIn } = useAuth();

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
          // 1. 데이터 가져오기
          const { crawledContestIds, dbContests: rawDbContests } = await getMyBookmarkedContests();
          const numericCrawledIds = crawledContestIds.map(id => Number(id));

          // 2. 크롤링 데이터 가공
          let crawledContests: BookmarkedContest[] = [];
          if (numericCrawledIds.length > 0) {
            const allCrawledData = await fetchContestPage();
            const bookmarkedCrawledData = allCrawledData.filter(contest =>
              numericCrawledIds.includes(contest.id)
            );
            crawledContests = bookmarkedCrawledData.map(item => ({
              id: item.id,
              title: item.title,
              organizer: item.organizer,
              endDate: item.end_date,
              organizerTypeTag: item.organizer_type,
              participantsTag: item.participants,
              categoryTag: item.contest_tag?.split(",")[0].trim(),
            }));
          }

          // 3. DB 데이터 가공 (category_id 매핑 추가)
          const dbContests = (rawDbContests as DbContestData[]).map(item => ({
            id: item.id,
            title: item.title,
            organizer: item.organizer,
            endDate: item.endDate,
            organizerTypeTag: item.organizer_type,
            participantsTag: item.participants,
            // category_id를 한글 라벨로 변환하여 categoryTag에 할당
            categoryTag: getContestCategoryLabel(item.category_id),
          }));

          // 4. 가공된 두 데이터 합치고 정렬
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

  const handleScrapToggle = async (postId: number) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      navigate("/login");
      return;
    }

    try {
      const response = await toggleScrap(postId);
      setData(currentData => {
        if (activeTab === "bookmarked-communities" && !response.data.isScrapped) {
          return currentData.filter(post => post.id !== postId);
        }

        return currentData.map(post => {
          if (post.id === postId) {
            if ("likesCount" in post) {
              return {
                ...post,
                scrapYn: response.data.isScrapped ? "Y" : "N",
                likesCount: response.data.newLikesCount,
              };
            }
          }
          return post;
        });
      });
    } catch (error) {
      console.error("스크랩 처리 중 오류 발생:", error);
      alert("요청 처리 중 오류가 발생했습니다.");
    }
  };

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
              endDate={item.endDate}
              organizer={item.organizer}
              organizerTypeTag={item.organizerTypeTag}
              participantsTag={item.participantsTag}
              categoryTag={item.categoryTag}
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
              comment={item.commentCount}
              likes={item.likesCount}
              scrapYn={item.scrapYn}
              onScrapClick={() => handleScrapToggle(item.id)}
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
          <div className="flex mb-8 border-b-2 border-gray-200 dark:border-gray-700">
            <button
              onClick={() => handleTabChange("bookmarked-contests")}
              className={`flex-1 text-center px-3 py-3 text-base font-medium border-b-2 transition-colors ${
                activeTab === "bookmarked-contests"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <span className="md:hidden">공모전</span>
              <span className="hidden md:inline">북마크한 공모전</span>
            </button>
            <button
              onClick={() => handleTabChange("bookmarked-communities")}
              className={`flex-1 text-center px-3 py-3 text-base font-medium border-b-2 transition-colors ${
                activeTab === "bookmarked-communities"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
            >
              <span className="md:hidden">커뮤니티</span>
              <span className="hidden md:inline">북마크한 커뮤니티</span>
            </button>
            <button
              onClick={() => handleTabChange("my-posts")}
              className={`flex-1 text-center px-3 py-3 text-base font-medium border-b-2 transition-colors ${
                activeTab === "my-posts"
                  ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
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
