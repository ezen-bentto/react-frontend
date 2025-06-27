import { useState, useEffect } from "react";
import { fetchCategory, type Category } from "@/api/common/category";
import { fetchContestsByCategory, type Contest } from "@/api/contest/listByCategory";

export const useCommunityHandlers = (selectedOption: "1" | "2" | "3") => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  const [contests, setContests] = useState<Contest[]>([]);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [isContestDropdownOpen, setIsContestDropdownOpen] = useState(false);
  const [isLoadingContests, setIsLoadingContests] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetchCategory();
        if (res?.data?.list) {
          setCategories(res.data.list);
        }
      } catch (error) {
        console.error("분야 데이터 불러오기 실패:", error);
      }
    };

    loadCategories();
  }, []);

  const handleCategorySelect = async (category: Category | null) => {
    setSelectedCategory(category);

    if (selectedOption === "1" && category) {
      setIsLoadingContests(true);
      const res = await fetchContestsByCategory(category.category_id);
      if (Array.isArray(res.data)) {
        setContests(res.data);
      } else {
        setContests([]);
      }
      setIsLoadingContests(false);
    }
  };

  const handleContestSelect = async (contest: Contest) => {
    try {
      const detail = await fetchContestsByCategory(contest.contest_id);
      if (Array.isArray(detail.data) && detail.data.length > 0) {
        setSelectedContest(detail.data[0]);
      } else {
        setSelectedContest(contest); // fallback
      }
    } catch (error) {
      console.error("분야별 공모전 목록 조회 실패:", error);
      setSelectedContest(contest); // fallback
    }
    setIsContestDropdownOpen(false);
  };

  return {
    // 카테고리
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    handleCategorySelect,

    // 공모전
    contests,
    setContests,
    selectedContest,
    setSelectedContest,
    isContestDropdownOpen,
    setIsContestDropdownOpen,
    isLoadingContests,
    setIsLoadingContests,
    handleContestSelect,
  };
};
