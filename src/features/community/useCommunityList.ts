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
