import { useState, useEffect } from "react";
import { CommentOutlined } from "@ant-design/icons";

// 임시 데이터 타입 정의
interface BookmarkItem {
  id: string;
  title: string;
  description: string;
  organizer: string;
  endDate: string;
  division: number;
  scrapCount: number;
  commentCount: number;
}

interface ApplicationItem {
  id: string;
  title: string;
  description: string;
  status: "application" | "progress" | "completed";
  appliedDate: string;
  division: number;
}

interface MyPostItem {
  id: string;
  title: string;
  content: string;
  writer: string;
  createdDate: string;
  scrapCount: number;
  commentCount: number;
  communityType: string;
}

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("bookmarks");
  const [loading, setLoading] = useState(false);

  // 상태 관리
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [applications, setApplications] = useState<ApplicationItem[]>([]);
  const [myPosts, setMyPosts] = useState<MyPostItem[]>([]);

  // 사용자 정보 (실제로는 API에서 가져와야 함)
  const [userInfo] = useState({
    name: "사용자 이름",
    email: "user@example.com",
    location: "지역",
    company: "기업명",
    profileImage: "/public/images/profile/profile.png",
  });

  // 탭 변경 핸들러
  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  // 글쓰기 페이지 이동
  const goToWritePage = () => {
    // navigate("/community/write");
  };

  // 프로필 수정 페이지 이동
  const goToProfileEdit = () => {
    // navigate("/mypage/profile-edit");
  };

  // 더보기 핸들러들
  const loadMoreBookmarks = () => {
    // 북마크 더 불러오기 로직
  };

  const loadMoreApplications = () => {
    // 신청현황 더 불러오기 로직
  };

  const loadMorePosts = () => {
    // 내 글 더 불러오기 로직
  };

  // 초기 데이터 로드
  useEffect(() => {
    const loadInitialData = async () => {
      setLoading(true);
      try {
        // 실제로는 API 호출
        // const bookmarkData = await fetchBookmarks();
        // const applicationData = await fetchApplications();
        // const postData = await fetchMyPosts();

        // 임시 데이터
        setBookmarks([
          {
            id: "1",
            title: "2024 디자인 공모전",
            description: "창의적인 디자인으로 세상을 바꿔보세요",
            organizer: "주최기관",
            endDate: "2024-12-31",
            division: 7,
            scrapCount: 15,
            commentCount: 8,
          },
        ]);

        setApplications([
          {
            id: "1",
            title: "2024 IT 아이디어 공모전",
            description: "혁신적인 IT 아이디어를 찾습니다",
            status: "progress",
            appliedDate: "2024-11-01",
            division: 4,
          },
        ]);

        setMyPosts([
          {
            id: "1",
            title: "스터디 모집합니다",
            content: "React 스터디 함께 하실 분 모집합니다",
            writer: userInfo.name,
            createdDate: "2024-11-15",
            scrapCount: 5,
            commentCount: 3,
            communityType: "2",
          },
        ]);
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();
  }, [userInfo.name]);

  // 상태별 스타일 반환
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "application":
        return "bg-green-500 text-white";
      case "progress":
        return "bg-blue-500 text-white";
      case "completed":
        return "bg-gray-500 text-white";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // 상태별 텍스트 반환
  const getStatusText = (status: string) => {
    switch (status) {
      case "application":
        return "신청완료";
      case "progress":
        return "진행중";
      case "completed":
        return "완료";
      default:
        return "알 수 없음";
    }
  };

  return (
    <main>
      {/* 프로필 섹션 */}
      <section className="pt-24 pb-8">
        <div className="max-w-[1400px] mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-0">
            {/* 프로필 정보 */}
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="w-30 h-30 rounded-full overflow-hidden border-2 border-gray-200">
                <img
                  src={userInfo.profileImage}
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 text-center lg:text-left">
                <h2 className="text-3xl font-bold text-gray-900">{userInfo.name}</h2>
                <p className="text-lg text-gray-600">{userInfo.email}</p>
                <div className="flex gap-4 text-base text-gray-600">
                  <span>{userInfo.location}</span>
                  <span>{userInfo.company}</span>
                </div>
              </div>
            </div>

            {/* 프로필 편집 버튼 */}
            <div className="flex gap-2">
              <button
                onClick={goToWritePage}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
              >
                글쓰기
              </button>
              <button
                onClick={goToProfileEdit}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
              >
                프로필 수정
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 마이페이지 콘텐츠 */}
      <section className="py-8 px-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col">
            {/* 탭 헤더 */}
            <div className="flex border-b-2 border-gray-200 mb-8 overflow-x-auto scrollbar-hide">
              {[
                { key: "bookmarks", label: "북마크한 공모전" },
                { key: "applications", label: "공모전 신청 현황" },
                { key: "my-posts", label: "내가 쓴 글" },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => handleTabChange(tab.key)}
                  className={`px-8 py-4 text-base font-medium border-b-3 border-transparent transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.key
                      ? "text-orange-500 border-orange-500 font-bold"
                      : "text-gray-600 hover:text-orange-500"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* 탭 콘텐츠 */}
            <div className="min-h-[300px]">
              {/* 북마크한 공모전 탭 */}
              {activeTab === "bookmarks" && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                    {loading ? (
                      <p className="text-center py-8">로딩 중...</p>
                    ) : bookmarks.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">북마크한 공모전이 없습니다.</p>
                    ) : (
                      <ul className="flex flex-col gap-4">
                        {bookmarks.map(bookmark => (
                          <li
                            key={bookmark.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-5">
                                <h3 className="text-xl font-bold cursor-pointer hover:text-orange-500">
                                  {bookmark.title}
                                </h3>
                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                  {bookmark.division === 7 ? "미술/디자인/건축" : "기타"}
                                </span>
                              </div>
                              <div className="flex gap-5">
                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                  공모전
                                </span>
                                <span className="text-sm bg-orange-500 text-white px-3 py-1 rounded-full">
                                  D-30
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {bookmark.description}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex gap-5 text-gray-500">
                                <span>{bookmark.organizer}</span>
                                <span>{bookmark.endDate}</span>
                              </div>
                              <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-1">
                                  <CommentOutlined />
                                  <span>{bookmark.commentCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                  </svg>
                                  <span>{bookmark.scrapCount}</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {bookmarks.length > 0 && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={loadMoreBookmarks}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        더 보기
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 공모전 신청 현황 탭 */}
              {activeTab === "applications" && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                    {loading ? (
                      <p className="text-center py-8">로딩 중...</p>
                    ) : applications.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">신청한 공모전이 없습니다.</p>
                    ) : (
                      <ul className="flex flex-col gap-4">
                        {applications.map(application => (
                          <li
                            key={application.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-5">
                                <h3 className="text-xl font-bold cursor-pointer hover:text-orange-500">
                                  {application.title}
                                </h3>
                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                  {application.division === 4 ? "IT/학술/논문" : "기타"}
                                </span>
                              </div>
                              <div className="flex gap-5">
                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                  공모전
                                </span>
                                <span
                                  className={`text-sm px-3 py-1 rounded-full ${getStatusStyle(application.status)}`}
                                >
                                  {getStatusText(application.status)}
                                </span>
                              </div>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {application.description}
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-500">
                              <span>신청일: {application.appliedDate}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {applications.length > 0 && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={loadMoreApplications}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        더 보기
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* 내가 쓴 글 탭 */}
              {activeTab === "my-posts" && (
                <div className="flex flex-col">
                  <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto">
                    {loading ? (
                      <p className="text-center py-8">로딩 중...</p>
                    ) : myPosts.length === 0 ? (
                      <p className="text-center py-8 text-gray-500">작성한 글이 없습니다.</p>
                    ) : (
                      <ul className="flex flex-col gap-4">
                        {myPosts.map(post => (
                          <li
                            key={post.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex gap-5">
                                <h3 className="text-xl font-bold cursor-pointer hover:text-orange-500">
                                  {post.title}
                                </h3>
                                <span className="text-sm bg-gray-200 px-3 py-1 rounded-full">
                                  {post.communityType === "2" ? "스터디" : "기타"}
                                </span>
                              </div>
                            </div>
                            <p
                              className="text-gray-600 mb-3 line-clamp-2"
                              dangerouslySetInnerHTML={{ __html: post.content }}
                            ></p>
                            <div className="flex justify-between items-center text-sm">
                              <div className="flex gap-5 text-gray-500">
                                <span>{post.writer}</span>
                                <span>{post.createdDate}</span>
                              </div>
                              <div className="flex gap-4 items-center">
                                <div className="flex items-center gap-1">
                                  <CommentOutlined />
                                  <span>{post.commentCount}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                                  </svg>
                                  <span>{post.scrapCount}</span>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  {myPosts.length > 0 && (
                    <div className="flex justify-center mt-6">
                      <button
                        onClick={loadMorePosts}
                        className="px-6 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        더 보기
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default MyPage;
