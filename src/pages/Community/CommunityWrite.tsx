import { useState, useEffect } from "react";
import { registerCommunity, type CommunityRegisterPayload } from "@/api/community/register";
import { fetchCommunityDetail } from "@/api/community/content";
import { modifyCommunity } from "@/api/community/modify";
import { fetchCategory, type Category } from "@/api/common/category";
import { fetchContestsByCategory, type Contest } from "@/api/contest/listByCategory"; // 새로 추가된 API
import { useNavigate, useSearchParams } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const CommunityWrite = () => {
  const [selectedOption, setSelectedOption] = useState<"1" | "2" | "3">("1");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // 수정 모드 관련 상태
  const isEditMode = searchParams.get("mode") === "edit";
  const editId = searchParams.get("id");
  const [isLoading, setIsLoading] = useState(false);

  // 카테고리 관련 상태
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // 공모전 관련 상태 추가
  const [contests, setContests] = useState<Contest[]>([]);
  const [isContestDropdownOpen, setIsContestDropdownOpen] = useState(false);
  const [selectedContest, setSelectedContest] = useState<Contest | null>(null);
  const [isLoadingContests, setIsLoadingContests] = useState(false);

  const [formData, setFormData] = useState({
    communityType: "",
    contestId: "",
    startDate: "",
    endDate: "",
    recruitEndDate: "",
    categoryType: "",
    ageGroup: "",
    title: "",
    content: "",
    recruitments: [{ role: "", count: "" }],
  });

  // 수정 모드일 때 기존 데이터 로드
  useEffect(() => {
    if (isEditMode && editId) {
      loadCommunityData(Number(editId));
    }
  }, [isEditMode, editId]);

  const loadCommunityData = async (communityId: number) => {
    setIsLoading(true);
    try {
      const data = await fetchCommunityDetail(communityId);

      // 날짜 형식 변환 (ISO 형식을 YYYY-MM-DD로 변환)
      const formatDate = (dateString: string) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
      };

      // 폼 데이터 설정
      setFormData({
        communityType: data.community_type || "",
        contestId: data.contest_id?.toString() || "",
        startDate: formatDate(data.start_date || ""),
        endDate: formatDate(data.end_date || ""),
        recruitEndDate: formatDate(data.recruit_end_date || ""),
        categoryType: data.category_type?.toString() || "",
        ageGroup: data.age_group || "",
        title: data.title || "",
        content: data.content || "",
        recruitments:
          data.recruitment_detail_list?.length > 0
            ? data.recruitment_detail_list.map(detail => ({
                role: detail.role,
                count: detail.count.toString(),
              }))
            : [{ role: "", count: "" }],
      });

      // 선택된 옵션 설정
      setSelectedOption(data.community_type as "1" | "2" | "3");

      // 카테고리 및 공모전 설정 (공모전인 경우)
      if (data.community_type === "1" && data.category_type) {
        // 카테고리 로드 후 선택된 카테고리 설정
        const result = await fetchCategory();
        if (result && result.data.list) {
          const categoriesList = result.data.list;
          setCategories(categoriesList);
          const category = categoriesList.find(cat => cat.category_id === data.category_type);
          if (category) {
            setSelectedCategory(category);

            // 선택된 카테고리에 따른 공모전 목록 로드
            await loadContestsByCategory(data.category_type);

            // 선택된 공모전 설정
            if (data.contest_id) {
              const contestsResult = await fetchContestsByCategory(data.category_type);
              if (contestsResult.success) {
                const contest = contestsResult.data.find(c => c.contest_id === data.contest_id);
                if (contest) {
                  setSelectedContest(contest);
                }
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("커뮤니티 데이터 로드 실패:", error);
      alert("데이터를 불러오는데 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  // 카테고리별 공모전 목록 로드
  const loadContestsByCategory = async (categoryId: number) => {
    setIsLoadingContests(true);
    try {
      const result = await fetchContestsByCategory(categoryId);
      if (result.success) {
        setContests(result.data);
      } else {
        setContests([]);
      }
    } catch (error) {
      console.error("공모전 목록 로드 실패:", error);
      setContests([]);
    } finally {
      setIsLoadingContests(false);
    }
  };

  // 카테고리 데이터 로드
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await fetchCategory();

        if (result && result.data.list) {
          setCategories(result.data.list);
        } else if (Array.isArray(result)) {
          setCategories(result);
        } else {
          setCategories([]);
        }
      } catch (error) {
        console.error("카테고리 로드 오류:", error);
        setCategories([]);
      }
    };

    // 공모전일 때만 카테고리 로드 (수정 모드가 아닌 경우에만)
    if (selectedOption === "1" && !isEditMode) {
      loadCategories();
    } else if (selectedOption !== "1") {
      // 공모전이 아닌 경우 초기화
      setCategories([]);
      setSelectedCategory(null);
      setIsCategoryDropdownOpen(false);
      setContests([]);
      setSelectedContest(null);
      setIsContestDropdownOpen(false);
    }
  }, [selectedOption, isEditMode]);

  // option값 별 form 변경
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 카테고리 선택
  const handleCategorySelect = async (category: Category) => {
    try {
      setSelectedCategory(category);
      setFormData(prev => ({ ...prev, categoryType: category.category_id.toString() }));
      setIsCategoryDropdownOpen(false);

      // 공모전 관련 상태 초기화
      setSelectedContest(null);
      setFormData(prev => ({ ...prev, contestId: "" }));

      // 선택된 카테고리에 따른 공모전 목록 로드
      await loadContestsByCategory(category.category_id);
    } catch (error) {
      console.error("카테고리 선택 오류:", error);
    }
  };

  // 공모전 선택
  const handleContestSelect = (contest: Contest) => {
    try {
      setSelectedContest(contest);
      setFormData(prev => ({ ...prev, contestId: contest.contest_id.toString() }));
      setIsContestDropdownOpen(false);
    } catch (error) {
      console.error("공모전 선택 오류:", error);
    }
  };

  // 모집 상세 추가/삭제
  const handleRecruitmentChange = (index: number, field: "role" | "count", value: string) => {
    const updated = [...formData.recruitments];
    updated[index][field] = value;
    setFormData(prev => ({ ...prev, recruitments: updated }));
  };

  const handleAddRole = () => {
    setFormData(prev => ({
      ...prev,
      recruitments: [...prev.recruitments, { role: "", count: "" }],
    }));
  };

  const handleRemoveRole = (index: number) => {
    if (formData.recruitments.length > 1) {
      const updated = formData.recruitments.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, recruitments: updated }));
    }
  };

  // 모달 : 확인 -> 페이지 이동
  const handleModalConfirm = () => {
    const modal = document.getElementById("alert_modal");
    if (modal instanceof HTMLDialogElement) {
      modal.close();
    }

    if (isEditMode) {
      // 수정 모드인 경우 상세 페이지로 이동
      navigate(`/community/content/${editId}`);
    } else {
      // 등록 모드인 경우 목록 페이지로 이동
      navigate(`/community/list?communityType=${selectedOption}`);
    }
  };

  // 취소 버튼 처리
  const handleCancel = () => {
    if (isEditMode) {
      // 수정 모드인 경우 상세 페이지로 이동
      navigate(`/community/content/${editId}`);
    } else {
      // 등록 모드인 경우 목록 페이지로 이동
      navigate(`/community/list?communityType=${selectedOption}`);
    }
  };

  // 저장/수정
  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // 공모전, 스터디 공통 검증
    if (selectedOption !== "3") {
      if (!formData.startDate) {
        alert("시작일을 입력해주세요.");
        return;
      }

      if (!formData.endDate) {
        alert("종료일을 입력해주세요.");
        return;
      }

      if (!formData.recruitEndDate) {
        alert("모집 종료일을 입력해주세요.");
        return;
      }

      if (!formData.ageGroup) {
        alert("모집 연령을 선택해주세요.");
        return;
      }

      if (!formData.recruitments.some(r => r.role.trim())) {
        alert("모집 역할을 하나 이상 입력해주세요.");
        return;
      }

      if (formData.recruitments.some(r => Number(r.count) <= 0)) {
        alert("모집 인원은 1명 이상이어야 합니다.");
        return;
      }
    }

    // 공모전 전용 검증
    if (selectedOption === "1" && !formData.categoryType) {
      alert("분야를 선택해주세요.");
      return;
    }

    // 공통: 제목, 내용
    if (!formData.title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if (!formData.content.trim() || formData.content === "<p><br></p>") {
      alert("내용을 입력해주세요.");
      return;
    }

    const clean = (val: string) => (val.trim() === "" ? null : val);

    const payload: CommunityRegisterPayload = {
      ...formData,
      communityType: selectedOption,
      contestId: clean(formData.contestId) ? Number(formData.contestId) : null,
      categoryType: clean(formData.categoryType) ? Number(formData.categoryType) : null,
      ageGroup: clean(formData.ageGroup),
      startDate: clean(formData.startDate),
      endDate: clean(formData.endDate),
      recruitEndDate: clean(formData.recruitEndDate),
      title: formData.title,
      content: formData.content,
      recruitments:
        selectedOption === "3"
          ? undefined
          : formData.recruitments
              .filter(r => r.role.trim())
              .map(r => ({
                role: r.role.trim(),
                count: Number(r.count),
              })),
    };

    try {
      let result;
      if (isEditMode && editId) {
        // 수정 API 호출
        const modifyData = {
          communityId: Number(editId),
          communityType: formData.communityType,
          contestId: clean(formData.contestId) ? Number(formData.contestId) : null,
          categoryType: clean(formData.categoryType) ? Number(formData.categoryType) : null,
          ageGroup: clean(formData.ageGroup),
          startDate: clean(formData.startDate),
          endDate: clean(formData.endDate),
          recruitEndDate: clean(formData.recruitEndDate),
          title: formData.title,
          content: formData.content,
          recruitments:
            selectedOption === "3"
              ? undefined
              : formData.recruitments
                  .filter(r => r.role.trim())
                  .map(r => ({
                    role: r.role.trim(),
                    count: Number(r.count),
                  })),
        };
        result = await modifyCommunity(modifyData);
        // eslint-disable-next-line no-console
        console.log("modifyData" + modifyData);
      } else {
        // 등록 API 호출
        result = await registerCommunity(payload);
      }

      if (result) {
        const modal = document.getElementById("alert_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.showModal();
        }
      }
    } catch (error) {
      console.error(`커뮤니티 글 ${isEditMode ? "수정" : "등록"} 오류:`, error);
      alert(`글 ${isEditMode ? "수정" : "등록"} 중 오류가 발생했습니다.`);
    }
  };

  if (isLoading) {
    return (
      <main className="community-write min-h-screen transition-colors duration-300">
        <div className="max-w-6xl mx-auto pt-28 px-4">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <div className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                데이터를 불러오는 중...
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen transition-colors duration-300">
      <form id="communityForm" onSubmit={handleSubmit}>
        <div className="max-w-6xl mx-auto pt-28 px-4 pb-12">
          {/* 헤더 섹션 */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4 transition-colors duration-300">
              {isEditMode ? "게시글 수정" : "새 게시글 작성"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg transition-colors duration-300">
              {isEditMode
                ? "게시글 내용을 수정해보세요"
                : "커뮤니티에 새로운 이야기를 공유해보세요"}
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* 기본 정보 카드 */}
          <div className="card-animation border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                기본 정보를 입력해주세요
              </h2>
            </div>

            {/* 라디오 버튼 섹션 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  value: "1",
                  label: "공모전",
                  icon: "🏆",
                  color: "from-yellow-400 to-orange-500",
                },
                {
                  value: "2",
                  label: "스터디",
                  icon: "📚",
                  color: "from-green-400 to-blue-500",
                },
                {
                  value: "3",
                  label: "자유",
                  icon: "💬",
                  color: "from-purple-400 to-pink-500",
                },
              ].map(option => (
                <label
                  key={option.value}
                  className={`relative flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all duration-300 hover:scale-105
        ${selectedOption === option.value ? "border-blue-500 shadow-lg" : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500"}
        ${isEditMode ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <input
                    type="radio"
                    name="communityType"
                    value={option.value}
                    onChange={() => setSelectedOption(option.value as "1" | "2" | "3")}
                    checked={selectedOption === option.value}
                    disabled={isEditMode}
                    className="sr-only"
                  />
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${option.color} rounded-xl flex items-center justify-center text-2xl mr-4`}
                  >
                    {option.icon}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800 dark:text-gray-200 text-lg transition-colors duration-300">
                      {option.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-500 transition-colors duration-300">
                      {option.value === "1" && "공모전 팀원을 모집해보세요"}
                      {option.value === "2" && "함께 공부할 팀원을 찾아보세요"}
                      {option.value === "3" && "자유롭게 이야기를 나눠보세요"}
                    </div>
                  </div>
                  {selectedOption === option.value && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">✓</span>
                    </div>
                  )}
                </label>
              ))}

              {/* 👇 수정 모드일 때 숨겨진 input으로 값 전달 */}
              {isEditMode && <input type="hidden" name="communityType" value={selectedOption} />}
            </div>

            {/* 분야/참여 선택 */}
            {selectedOption === "1" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                {/* 분야 드롭다운 */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    🎯 분야
                  </label>
                  <div className="relative">
                    <div
                      className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-transparent cursor-pointer flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-500 focus-within:border-blue-500 transition-colors duration-200"
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                      }}
                    >
                      <span
                        className={
                          selectedCategory
                            ? "text-gray-800 dark:text-gray-200 font-medium"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      >
                        {selectedCategory ? selectedCategory.name : "공모전 분야를 선택해주세요"}
                      </span>
                      <span
                        className={`transition-transform duration-200 text-gray-600 dark:text-gray-400 ${isCategoryDropdownOpen ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </div>
                    {isCategoryDropdownOpen && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2B2B2B] border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                        {categories && categories.length > 0 ? (
                          categories.map((category, index) => (
                            <div
                              key={category.category_id}
                              className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 ${
                                index !== categories.length - 1
                                  ? "border-b border-gray-100 dark:border-gray-600"
                                  : ""
                              } ${index === 0 ? "rounded-t-xl" : ""} ${
                                index === categories.length - 1 ? "rounded-b-xl" : ""
                              }`}
                              onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleCategorySelect(category);
                              }}
                            >
                              <span className="text-gray-800 dark:text-white font-medium">
                                {category.name}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                            카테고리를 불러오는 중...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* 공모전 참여 드롭다운 */}
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">
                    🎪 참여 공모전
                  </label>
                  <div className="relative">
                    <div
                      className={`w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-transparent cursor-pointer flex items-center justify-between hover:border-blue-300 dark:hover:border-blue-500 focus-within:border-blue-500 transition-colors duration-200 ${!selectedCategory ? "opacity-50 cursor-not-allowed" : ""}`}
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (selectedCategory && contests.length > 0) {
                          setIsContestDropdownOpen(!isContestDropdownOpen);
                        }
                      }}
                    >
                      <span
                        className={
                          selectedContest
                            ? "text-gray-800 dark:text-gray-200 font-medium"
                            : "text-gray-400 dark:text-gray-500"
                        }
                      >
                        {isLoadingContests
                          ? "공모전을 불러오는 중..."
                          : selectedContest
                            ? selectedContest.title
                            : selectedCategory
                              ? contests.length > 0
                                ? "참여할 공모전을 선택해주세요"
                                : "진행중인 공모전이 없습니다"
                              : "먼저 분야를 선택해주세요"}
                      </span>
                      <span
                        className={`transition-transform duration-200 text-gray-600 dark:text-gray-400 ${isContestDropdownOpen ? "rotate-180" : ""}`}
                      >
                        ▼
                      </span>
                    </div>
                    {isContestDropdownOpen && selectedCategory && contests.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#2B2B2B] border-2 border-gray-200 dark:border-gray-600 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto">
                        {contests.map((contest, index) => (
                          <div
                            key={contest.contest_id}
                            className={`px-4 py-3 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-150 ${
                              index !== contests.length - 1
                                ? "border-b border-gray-100 dark:border-gray-600"
                                : ""
                            } ${index === 0 ? "rounded-t-xl" : ""} ${
                              index === contests.length - 1 ? "rounded-b-xl" : ""
                            }`}
                            onClick={e => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleContestSelect(contest);
                            }}
                          >
                            <div className="space-y-1">
                              <span className="text-gray-800 dark:text-white font-medium block">
                                {contest.title}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 시작일/종료일 */}
            {selectedOption !== "3" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    📅 시작일
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    📅 종료일
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleFormChange}
                    className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 모집 정보 카드 */}
          {selectedOption !== "3" && (
            <div className="card-animation border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 mb-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mr-4">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                  모집정보를 입력해주세요
                </h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    ⏰ 모집 종료일
                  </label>
                  <input
                    type="date"
                    name="recruitEndDate"
                    value={formData.recruitEndDate}
                    onChange={handleFormChange}
                    className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                  />
                </div>
                <div className="space-y-3">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                    👥 모집 연령
                  </label>
                  <select
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleFormChange}
                    className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-[#2B2B2B] text-gray-800 dark:text-white focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                  >
                    <option value="" disabled hidden>
                      모집 연령을 선택해주세요
                    </option>
                    <option value="1">대학생</option>
                    <option value="2">직장인/일반인</option>
                    <option value="3">제한없음</option>
                  </select>
                </div>
              </div>

              {/* 모집 역할 섹션 */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-300">
                    모집 역할 및 인원
                  </h3>
                  <button
                    type="button"
                    onClick={handleAddRole}
                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:bg-transparent dark:border dark:border-gray-600 text-white dark:text-gray-300 rounded-lg hover:from-blue-600 hover:to-purple-600 dark:hover:bg-gray-800 dark:hover:border-gray-500 transition-all duration-200 flex items-center space-x-2 shadow-md hover:shadow-lg dark:shadow-none"
                  >
                    <span>+</span>
                    <span>역할 추가</span>
                  </button>
                </div>

                {formData.recruitments.map((r, idx) => (
                  <div
                    key={idx}
                    className="border border-gray-200 dark:border-gray-600 rounded-xl p-6 transition-colors duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                          💼 역할 {idx + 1}
                        </label>
                        <input
                          type="text"
                          placeholder="예: 프론트엔드 개발자"
                          value={r.role}
                          onChange={e => handleRecruitmentChange(idx, "role", e.target.value)}
                          className="w-full h-10 px-3 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">
                          👤 모집 인원
                        </label>
                        <input
                          type="number"
                          placeholder="1"
                          min={1}
                          value={r.count}
                          onChange={e => handleRecruitmentChange(idx, "count", e.target.value)}
                          className="w-full h-10 px-3 border border-gray-300 dark:border-gray-500 rounded-lg text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200"
                        />
                      </div>
                    </div>

                    {formData.recruitments.length > 1 && (
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => handleRemoveRole(idx)}
                          className="px-3 py-1 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors duration-200 text-sm"
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 제목 + 내용 카드 */}
          <div className="card-animation border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                내용을 작성해주세요
              </h2>
            </div>

            <div className="space-y-6 mb-8">
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  📝 제목
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleFormChange}
                  placeholder="매력적인 제목을 입력해주세요"
                  className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200 text-lg placeholder-gray-400 dark:placeholder-gray-500"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
                  ✍️ 내용
                </label>
                <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors duration-200">
                  <ReactQuill
                    value={formData.content}
                    onChange={value => setFormData(prev => ({ ...prev, content: value }))}
                    theme="snow"
                    className="h-80 dark-quill"
                    placeholder="상세한 내용을 입력해주세요..."
                  />
                </div>
              </div>
            </div>

            {/* 버튼 섹션 */}
            <div className="flex justify-center space-x-4 pt-8 border-t border-gray-200 dark:border-gray-600 transition-colors duration-300">
              <button
                type="button"
                onClick={handleCancel}
                className="hover-lift px-8 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-xl hover:border-gray-400 dark:hover:border-gray-500 transition-all duration-200 font-medium text-lg min-w-[120px]"
              >
                취소
              </button>
              <button
                type="submit"
                className="hover-lift px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium text-lg min-w-[120px] shadow-lg hover:shadow-xl"
              >
                {isEditMode ? "수정" : "등록"}
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* 등록/수정 확인 모달 */}
      <dialog id="alert_modal" className="modal backdrop:bg-black backdrop:bg-opacity-50">
        <div className="modal-box border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl p-8 max-w-md">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">✓</span>
            </div>
            <h3 className="font-bold text-xl text-gray-800 dark:text-gray-200 mb-2 transition-colors duration-300">
              {isEditMode ? "수정이 완료되었습니다!" : "등록이 완료되었습니다!"}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 transition-colors duration-300">
              {isEditMode
                ? "게시글이 성공적으로 수정되었습니다."
                : "새로운 게시글이 성공적으로 등록되었습니다."}
            </p>
            <button
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </dialog>

      {/* 커스텀 스타일을 위한 CSS 클래스들 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          /* ReactQuill 커스텀 스타일 */
          .community-write .ql-editor {
            font-size: 16px;
            line-height: 1.6;
            min-height: 300px;
            padding: 20px !important;
            background-color: transparent;
            color: inherit;
          }
          
          .community-write .ql-toolbar {
            border-top: none !important;
            border-left: none !important;
            border-right: none !important;
            border-bottom: 1px solid #e5e7eb !important;
            padding: 12px 20px !important;
            background-color: transparent;
          }
          
          .community-write .ql-container {
            border: none !important;
          }
          
          /* 다크모드 ReactQuill 스타일 */
          .dark .community-write .ql-toolbar {
            border-bottom: 1px solid #4b5563 !important;
          }
          
          .dark .community-write .ql-toolbar .ql-stroke {
            stroke: #d1d5db;
          }
          
          .dark .community-write .ql-toolbar .ql-fill {
            fill: #d1d5db;
          }
          
          .dark .community-write .ql-toolbar button:hover .ql-stroke {
            stroke: #3b82f6;
          }
          
          .dark .community-write .ql-toolbar button:hover .ql-fill {
            fill: #3b82f6;
          }
          
          .dark .community-write .ql-editor.ql-blank::before {
            color: #9ca3af;
          }
          
          .dark .community-write .ql-editor {
            color: #e5e7eb;
          }
          
          /* 스크롤바 스타일링 */
          .community-write ::-webkit-scrollbar {
            width: 6px;
          }
          
          .community-write ::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 3px;
          }
          
          .dark .community-write ::-webkit-scrollbar-track {
            background: #374151;
          }
          
          .community-write ::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }
          
          .dark .community-write ::-webkit-scrollbar-thumb {
            background: #6b7280;
          }
          
          .community-write ::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }
          
          .dark .community-write ::-webkit-scrollbar-thumb:hover {
            background: #9ca3af;
          }
          
          /* 입력 필드 배경 투명화 (드롭다운과 셀렉트 제외) */
          .community-write input[type="text"],
          .community-write input[type="date"],
          .community-write input[type="number"],
          .community-write textarea {
            background-color: transparent !important;
          }
          
          /* 드롭다운과 셀렉트는 배경색 유지 */
          .community-write select {
            background-color: white;
          }
          
          .dark .community-write select {
            background-color: #2B2B2B;
          }
          
          /* 드롭다운 옵션 스타일 */
          .community-write select option {
            background-color: white;
            color: #1f2937;
          }
          
          .dark .community-write select option {
            background-color: #2B2B2B;
            color: #f9fafb;
          }
          
          /* 애니메이션 */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .community-write .card-animation {
            animation: fadeInUp 0.6s ease-out;
          }
          
          /* 포커스 시 박스 섀도우 제거 */
          .community-write input:focus,
          .community-write select:focus,
          .community-write textarea:focus {
            outline: none;
            box-shadow: none;
          }
          
          /* 버튼 호버 효과 */
          .community-write .hover-lift:hover {
            transform: translateY(-1px);
          }
          
          /* 모달 애니메이션 */
          .community-write .modal {
            animation: fadeIn 0.3s ease-out;
          }
          
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          
          /* 다크모드 전환 애니메이션 */
          * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
          }
        `,
        }}
      />
    </main>
  );
};

export default CommunityWrite;
