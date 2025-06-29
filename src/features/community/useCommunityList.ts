// src/components/community/list/useCommunityList.ts
import { useState, useEffect, useMemo } from "react";
import { fetchCommunityList } from "@/api/community/list";
import { toggleScrap } from "@/api/scrap/toggle";
import type { CommunityItem } from "@/types/communityListType";

export const useCommunityList = (communityType: string) => {
  const [posts, setPosts] = useState<CommunityItem[]>([]);
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [searchText, setSearchText] = useState("");
  const [viewMode, setViewMode] = useState<"card" | "list">("list");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  useEffect(() => {
    const loadList = async () => {
      try {
        const data = await fetchCommunityList(communityType, 1, 100);
        setPosts(data.list);
      } catch (err) {
        console.error("커뮤니티 목록 조회 실패:", err);
      }
    };
    loadList();
  }, [communityType]);

  const processedPosts = useMemo(() => {
    let result = [...posts];

    if (filters.category?.length) {
      result = result.filter(
        post => post.category_type && filters.category.includes(String(post.category_type))
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
      result = result.filter(
        post =>
          post.title.toLowerCase().includes(search) || post.content.toLowerCase().includes(search)
      );
    }

    const sort = filters.sort?.[0];
    if (sort === "1") {
      // 최신순
      result.sort((a, b) => new Date(b.reg_date).getTime() - new Date(a.reg_date).getTime());
    } else if (sort === "2") {
      // 스크랩순
      result.sort((a, b) => (b.scrap_count ?? 0) - (a.scrap_count ?? 0));
    } else if (sort === "3") {
      // 종료임박순 - 마감된 항목 제외하고 23:59:59 기준으로 계산
      const now = new Date();

      // 마감되지 않은 항목만 필터링
      result = result.filter(post => {
        if (!post.recruit_end_date) return false;

        const endDate = new Date(post.recruit_end_date);
        endDate.setHours(23, 59, 59, 999);

        return endDate.getTime() > now.getTime();
      });

      // 종료임박순으로 정렬
      result.sort((a, b) => {
        const aDate = new Date(a.recruit_end_date!);
        const bDate = new Date(b.recruit_end_date!);

        // 마감일을 23:59:59로 설정
        aDate.setHours(23, 59, 59, 999);
        bDate.setHours(23, 59, 59, 999);

        return aDate.getTime() - bDate.getTime();
      });
    }

    return result;
  }, [posts, filters, searchText]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts =
    viewMode === "card" ? processedPosts.slice(indexOfFirst, indexOfLast) : processedPosts;

  const totalPages = Math.max(1, Math.ceil(processedPosts.length / postsPerPage));

  useEffect(() => {
    setCurrentPage(1);
  }, [processedPosts]);

  const handleScrapToggle = async (postId: number) => {
    try {
      const res = await toggleScrap(postId);
      setPosts(prev =>
        prev.map(p =>
          p.community_id === postId
            ? {
                ...p,
                scrap_yn: res.data.scrapped ? "Y" : "N",
                scrap_count: res.data.scrapped
                  ? (p.scrap_count ?? 0) + 1
                  : Math.max((p.scrap_count ?? 1) - 1, 0),
              }
            : p
        )
      );
    } catch (err) {
      console.error("스크랩 토글 실패", err);
      alert("스크랩 처리 중 오류가 발생했습니다.");
    }
  };

  return {
    posts: processedPosts,
    currentPosts,
    viewMode,
    setViewMode,
    currentPage,
    setCurrentPage,
    totalPages,
    setFilters,
    setSearchText,
    handleScrapToggle,
  };
};
