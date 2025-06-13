import { useEffect, useState } from "react";
import { fetchCommunityList, type CommunityItem } from "@/api/community/list";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Fillter, { type FilterGroup } from "@/components/shared/Fillter";
import ListItem from "@/components/shared/ListItem";
import WriteButton from "@/components/shared/WriteButton";
import Pagination from "@/components/shared/Pagination";

interface CommunityListResponse {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  list: CommunityItem[];
}

const CommunityList = () => {
  const [posts, setPosts] = useState<CommunityItem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<CommunityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [viewMode, setViewMode] = useState<"card" | "list">("list"); // 뷰 모드 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수
  // const [totalCount, setTotalCount] = useState(0); // 총 게시글 수 - 현재 미사용
  const [postsPerPage] = useState(12); // 카드 모드 페이지당 게시글 수

  const urlParams = new URLSearchParams(window.location.search);
  const communityType = urlParams.get("communityType") || "1";

  // 카드 모드일 때 서버에서 페이징된 데이터를 가져오는 함수
  const loadPagedList = async (page: number) => {
    try {
      setLoading(true);
      const data: CommunityListResponse = await fetchCommunityList(
        `${communityType}`,
        page,
        postsPerPage
      );
      setPosts(data.list);
      setTotalPages(data.totalPages);
      // setTotalCount(data.totalCount);
      setCurrentPage(data.page);
    } catch (err) {
      console.error("커뮤니티 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 리스트 모드일 때 전체 데이터를 가져오는 함수
  const loadFullList = async () => {
    try {
      setLoading(true);
      const data: CommunityListResponse = await fetchCommunityList(`${communityType}`, 1, 100);
      setPosts(data.list);
      // setTotalCount(data.totalCount);
    } catch (err) {
      console.error("커뮤니티 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  };

  // 뷰 모드나 커뮤니티 타입이 변경될 때 데이터 로딩
  useEffect(() => {
    if (viewMode === "card") {
      loadPagedList(1); // 카드 모드는 첫 페이지부터
    } else {
      loadFullList(); // 리스트 모드는 전체 데이터
    }
  }, [communityType, viewMode]);

  // 카드 모드에서 페이지 변경 시 데이터 로딩
  useEffect(() => {
    if (viewMode === "card") {
      loadPagedList(currentPage);
    }
  }, [currentPage]);

  // 필터링 로직 (리스트 모드에서만 적용)
  useEffect(() => {
    if (loading || viewMode === "card") return;

    let result = [...posts];

    // 필터: category
    const categoryFilter = filters.category;
    if (categoryFilter?.length) {
      result = result.filter(post =>
        post.category_type && categoryFilter.includes(String(post.category_type))
      );
    }

    // 필터: age_group
    const ageFilter = filters.age;
    if (ageFilter?.length === 1) {
      const ageValue = ageFilter[0];
      if (ageValue === "2") {
        // 제한없음 → 모두 포함 (필터 적용하지 않음)
      } else {
        result = result.filter(post => post.age_group === ageValue);
      }
    }

    // 정렬: sort
    const sortFilter = filters.sort?.[0];
    if (sortFilter === "1") {
      result.sort((a, b) => new Date(b.reg_date).getTime() - new Date(a.reg_date).getTime());
    } else if (sortFilter === "2") {
      result.sort((a, b) => (b.scrap_count ?? 0) - (a.scrap_count ?? 0));
    } else if (sortFilter === "3") {
      result.sort((a, b) => {
        const aDate = a.recruit_end_date ? new Date(a.recruit_end_date).getTime() : Infinity;
        const bDate = b.recruit_end_date ? new Date(b.recruit_end_date).getTime() : Infinity;
        return aDate - bDate;
      });
    }

    setFilteredPosts(result);
  }, [filters, posts, loading, viewMode]);

  const filterGroupByContest: FilterGroup[] = [
    {
      name: "category",
      label: "분야",
      options: [
        { label: "포스터/웹툰/콘텐츠", value: "1" },
        { label: "사진/영상/UCC", value: "2" },
        { label: "아이디어/기획", value: "3" },
        { label: "IT/학술/논문", value: "4" },
        { label: "네이밍/슬로건", value: "5" },
        { label: "스포츠/음악", value: "6" },
        { label: "미술/디자인/건축", value: "7" },
        { label: "에세이/수필/문학", value: "8" },
      ],
      multiSelect: true,
    },
    {
      name: "age",
      label: "연령",
      options: [
        { label: "대학생", value: "1" },
        { label: "제한없음", value: "2" },
      ],
    },
    {
      name: "sort",
      label: "정렬",
      options: [
        { label: "최신순", value: "1" },
        { label: "스크랩순", value: "2" },
        { label: "종료임박순", value: "3" },
      ],
    },
  ];

  const filterGroupByStudy: FilterGroup[] = [
    {
      name: "age",
      label: "연령",
      options: [
        { label: "대학생", value: "1" },
        { label: "제한없음", value: "2" },
      ],
    },
    {
      name: "sort",
      label: "정렬",
      options: [
        { label: "최신순", value: "1" },
        { label: "스크랩순", value: "2" },
        { label: "종료임박순", value: "3" },
      ],
    },
  ];

  const handleFilterChange = (groupName: string, selected: string[]) => {
    setFilters(prev => ({ ...prev, [groupName]: selected }));
  };

  const handleSearchSubmit = () => {
    // 검색 로직이 필요하면 여기에 구현
  };

  // 뷰 모드 변경 핸들러
  const handleViewModeChange = (mode: "card" | "list") => {
    setViewMode(mode);
    setCurrentPage(1); // 뷰 모드 변경 시 첫 페이지로
  };

  // 페이지 변경 핸들러
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  // 현재 표시할 게시글 목록
  const currentPosts = viewMode === "card" ? posts : filteredPosts;

  return (
    <main className="bg-white pt-28">
      <div className="max-w-[1400px] mx-auto">
        {/* 필터 UI */}
        <h2 className="text-2xl font-extrabold mb-6">커뮤니티</h2>
        <section>
          {communityType === "1" && (
            <Fillter
              filters={filterGroupByContest}
              onFilterChange={handleFilterChange}
              onSearchSubmit={handleSearchSubmit}
            />
          )}

          {communityType === "2" && (
            <Fillter
              filters={filterGroupByStudy}
              onFilterChange={handleFilterChange}
              onSearchSubmit={handleSearchSubmit}
            />
          )}
        </section>

        {/* 뷰 모드 선택 버튼 */}
        <section className="mt-6 flex flex-col gap-4">
          <div className="flex justify-end gap-4 m-2">
            <TableOutlined
              style={{
                width: "1.5em",
                height: "1.5em",
                cursor: "pointer",
                color: viewMode === "card" ? "#1890ff" : "#8c8c8c"
              }}
              onClick={() => handleViewModeChange("card")}
            />
            <UnorderedListOutlined
              style={{
                width: "1.5em",
                height: "1.5em",
                cursor: "pointer",
                color: viewMode === "list" ? "#1890ff" : "#8c8c8c"
              }}
              onClick={() => handleViewModeChange("list")}
            />
          </div>

          {loading ? (
            <p>로딩 중...</p>
          ) : currentPosts.length === 0 ? (
            <p>게시글이 없습니다.</p>
          ) : (
            <>
              {/* 카드형 레이아웃 (그리드 + md 사이즈) */}
              {viewMode === "card" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {currentPosts.map(post => (
                      <ListItem
                        key={post.community_id}
                        type="community"
                        title={post.title}
                        description={post.content}
                        writer={post.nickname}
                        likes={post.scrap_count}
                        comment={post.comment_count}
                        linkSrc={`/community/content/${post.community_id}`}
                        endDate={post.recruit_end_date ?? undefined}
                        size="md" // 카드 모드에서는 md 사이즈
                        intent="primary"
                        division={post.category_type ?? 0}
                        communityType={post.community_type}
                      />
                    ))}
                  </div>

                  {/* 페이징 */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <Pagination
                        currentPage={currentPage}
                        onPrevious={handlePreviousPage}
                        onNext={handleNextPage}
                        intent="primary"
                        size="md"
                      />
                    </div>
                  )}
                </>
              )}

              {/* 리스트형 레이아웃 (기존 방식) */}
              {viewMode === "list" && (
                <>
                  {currentPosts.map(post => (
                    <ListItem
                      key={post.community_id}
                      type="community"
                      title={post.title}
                      description={post.content}
                      writer={post.nickname}
                      likes={post.scrap_count}
                      comment={post.comment_count}
                      linkSrc={`/community/content/${post.community_id}`}
                      endDate={post.recruit_end_date ?? undefined}
                      size="lg" // 리스트 모드에서는 lg 사이즈
                      intent="primary"
                      division={post.category_type ?? 0}
                      communityType={post.community_type}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </section>

        {/* 글쓰기 + Top 버튼 */}
        <div>
          <WriteButton />
        </div>
      </div>
    </main>
  );
};

export default CommunityList;