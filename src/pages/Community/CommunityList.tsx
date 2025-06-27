import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useCommunityList } from "@/features/community/useCommunityList";
import { useResponsive } from "@/features/community/useResponsive";
import FilterSection from "@/components/community/list/FilterSection";
import CommunityGrid from "@/components/community/list/CommunityGrid";
import EmptyState from "@/components/community/list/EmptyState";
import Pagination from "@/components/shared/Pagination";
import WriteButton from "@/components/shared/WriteButton";

const CommunityList = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const communityType = new URLSearchParams(window.location.search).get("communityType") || "1";

  const {
    currentPosts,
    viewMode,
    totalPages,
    currentPage,
    setCurrentPage,
    setFilters,
    setSearchText,
    setViewMode,
    handleScrapToggle
  } = useCommunityList(communityType);

  const { isMobile, imgSrc } = useResponsive();

  const handleFilterChange = (name: string, selected: string[]) => {
    setFilters(prev => ({
      ...prev,
      [name]: selected,
    }));
  };

  return (
    <main className="pt-28">
      <div className="max-w-[1400px] mx-auto relative">
        <h2 className="text-2xl font-extrabold mb-6">커뮤니티</h2>

        <FilterSection
          communityType={communityType}
          onFilterChange={handleFilterChange}
          onSearchSubmit={setSearchText}
        />

        <section className="mt-6 flex flex-col gap-4">
          {!isMobile && (
            <div className="flex justify-end gap-4 m-2">
              <button className="cursor-pointer" onClick={() => setViewMode("card")}>📦</button>
              <button className="cursor-pointer" onClick={() => setViewMode("list")}>📃</button>
            </div>
          )}

          {currentPosts.length === 0 ? (
            <EmptyState imgSrc={imgSrc} />
          ) : (
            <>
              <CommunityGrid
                posts={currentPosts}
                viewMode={viewMode}
                onScrapClick={handleScrapToggle}
              />
              {viewMode === "card" && (
                <div className="flex justify-center mt-8">
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPrevious={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    onNext={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    onPageChange={setCurrentPage}
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
