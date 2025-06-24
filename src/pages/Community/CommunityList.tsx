import { useEffect, useState, useMemo } from "react";
import { fetchCommunityList, type CommunityItem } from "@/api/community/list";
import { fetchCategory, type Category } from "@/api/common/category";
import { TableOutlined, UnorderedListOutlined } from "@ant-design/icons";
import Fillter, { type FilterGroup } from "@/components/shared/Fillter";
import ListItem from "@/components/shared/ListItem";
import WriteButton from "@/components/shared/WriteButton";
import Pagination from "@/components/shared/Pagination";
import { useSearchParams, useNavigate } from "react-router-dom";
import { DARK_NOT_ITEM, LiGHT_NOT_ITEM } from "@/constants/ImageSrc";
import { useAuth } from "@/context/AuthContext";

const CommunityList = () => {
  const [posts, setPosts] = useState<CommunityItem[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);
  const [categories, setCategories] = useState<Category[]>([]);
  const [imgSrc, setImgSrc] = useState(LiGHT_NOT_ITEM);
  const [isMobile, setIsMobile] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const communityType = urlParams.get("communityType") || "1";
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // 다크모드 감지
  useEffect(() => {
    const root = document.documentElement;
    const updateThemeImage = () => {
      setImgSrc(root.classList.contains("dark") ? DARK_NOT_ITEM : LiGHT_NOT_ITEM);
    };
    updateThemeImage();
    const observer = new MutationObserver(updateThemeImage);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // 카테고리 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategory();
        setCategories(res.data.list);
      } catch (err) {
        console.error("카테고리 불러오기 실패:", err);
      }
    };
    loadCategories();
  }, []);

  // 데이터 로드
  useEffect(() => {
    const loadList = async () => {
      try {
        if (viewMode === "card") {
          const urlPage = parseInt(searchParams.get("page") || "1", 10);
          const data = await fetchCommunityList(communityType, urlPage, postsPerPage);
          setPosts(data.list);
          setCurrentPage(data.page);
        } else {
          const data = await fetchCommunityList(communityType, 1, 100);
          setPosts(data.list);
        }
      } catch (err) {
        console.error("커뮤니티 목록 조회 실패:", err);
      }
    };
    loadList();
  }, [communityType, viewMode, searchParams]);

  useEffect(() => {
    if (isMobile) setViewMode("card");
  }, [isMobile]);

  // 필터 + 검색 + 정렬
  const processedPosts = useMemo(() => {
    let result = [...posts];

    if (filters.category?.length) {
      result = result.filter(post =>
        post.category_type && filters.category.includes(String(post.category_type))
      );
    }

    if (filters.age?.length === 1) {
      const age = filters.age[0];
      if (age !== "3") {
        result = result.filter(post => post.age_group === age);
      }
    }

    if (searchText.trim()) {
      const search = searchText.toLowerCase();
      result = result.filter(post =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)
      );
    }

    const sort = filters.sort?.[0];
    if (sort === "1") {
      result.sort((a, b) => new Date(b.reg_date).getTime() - new Date(a.reg_date).getTime());
    } else if (sort === "2") {
      result.sort((a, b) => (b.scrap_count ?? 0) - (a.scrap_count ?? 0));
    } else if (sort === "3") {
      result.sort((a, b) => {
        const aDate = a.recruit_end_date ? new Date(a.recruit_end_date).getTime() : Infinity;
        const bDate = b.recruit_end_date ? new Date(b.recruit_end_date).getTime() : Infinity;
        return aDate - bDate;
      });
    }

    return result;
  }, [posts, filters, searchText]);

  // 페이지
  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = viewMode === "card"
    ? posts
    : processedPosts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.max(1, Math.ceil(processedPosts.length / postsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [processedPosts]);

  const handleFilterChange = (name: string, selected: string[]) => {
    setFilters(prev => ({ ...prev, [name]: selected }));
  };

  const handleViewModeChange = (mode: "card" | "list") => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // filter group
  const filterGroupByContest: FilterGroup[] = [
    {
      name: "category",
      label: "분야",
      options: categories.map(cat => ({
        label: cat.name,
        value: String(cat.category_id),
      })),
      multiSelect: true,
    },
    {
      name: "age",
      label: "연령",
      options: [
        { label: "대학생", value: "1" },
        { label: "직장인/일반인", value: "2" },
        { label: "제한없음", value: "3" },
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
        { label: "직장인/일반인", value: "2" },
        { label: "제한없음", value: "3" },
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

  const filterGroupByFree: FilterGroup[] = [
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

  return (
    <main className="pt-28">
      <div className="max-w-[1400px] mx-auto relative">
        <h2 className="text-2xl font-extrabold mb-6">커뮤니티</h2>
        <section>
          {communityType === "1" && categories.length > 0 && (
            <Fillter
              filters={filterGroupByContest}
              onFilterChange={handleFilterChange}
              onSearchSubmit={setSearchText}
            />
          )}
          {communityType === "2" && (
            <Fillter
              filters={filterGroupByStudy}
              onFilterChange={handleFilterChange}
              onSearchSubmit={setSearchText}
            />
          )}
          {communityType === "3" && (
            <Fillter
              filters={filterGroupByFree}
              onFilterChange={handleFilterChange}
              onSearchSubmit={setSearchText}
            />
          )}
        </section>

        <section className="mt-6 flex flex-col gap-4">
          {!isMobile && (
            <div className="flex justify-end gap-4 m-2">
              <TableOutlined
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  cursor: "pointer",
                  color: viewMode === "card" ? "#1890ff" : "#8c8c8c",
                }}
                onClick={() => handleViewModeChange("card")}
              />
              <UnorderedListOutlined
                style={{
                  width: "1.5em",
                  height: "1.5em",
                  cursor: "pointer",
                  color: viewMode === "list" ? "#1890ff" : "#8c8c8c",
                }}
                onClick={() => handleViewModeChange("list")}
              />
            </div>
          )}

          {currentPosts.length === 0 ? (
            <div className="flex flex-col items-center mt-8">
              <img src={imgSrc} alt="게시글 없음" className="w-64 md:w-80 h-auto" />
              <p className="mt-4">게시글이 없습니다.</p>
            </div>
          ) : (
            <>
              <div
                className={
                  viewMode === "card"
                    ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                    : "flex flex-col gap-4"
                }
              >
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
                    size={viewMode === "card" ? "md" : "lg"}
                    intent="primary"
                    division={post.category_type ?? 0}
                    communityType={post.community_type}
                  />
                ))}
              </div>

              {viewMode === "list" && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevious={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    onNext={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    onPageChange={page => setCurrentPage(page)}
                    intent="primary"
                    size="md"
                  />
                </div>
              )}
            </>
          )}
        </section>

        <div className="fixed bottom-4 right-4 z-50" onClick={() => {
          if (!isLoggedIn) {
            alert("글쓰기는 로그인 후 이용 가능합니다.");
            navigate("/login");
          } else {
            navigate("/community/write");
          }
        }}>
          <WriteButton />
        </div>
      </div>
    </main>
  );
};

export default CommunityList;
