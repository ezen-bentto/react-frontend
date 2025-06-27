import { useEffect, useState } from "react";
import BaseInfoSection from "@/components/community/write/BaseInfoSection";
import RequirementInfoSection from "@/components/community/write/RequirementInfoSection";
import TitleContentInput from "@/components/community/write/TitleContentInput";
import SubmitModal from "@/components/community/modal/SubmitModal";
import { useCommunityHandlers } from "@/hooks/community/useCommunityHandlers";
import { registerCommunity } from "@/api/community/register";
import { fetchCommunityDetail } from "@/api/community/content";
import { useSearchParams, useNavigate } from "react-router-dom";
import { modifyCommunity } from "@/api/community/modify";
import type { ModifyPayload, RecruitmentDetail, SubmitPayload } from "@/types/communityWriteType";

const CommunityWrite = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const communityIdParam = searchParams.get("id");
  const communityId = communityIdParam !== null ? Number(communityIdParam) : undefined;
  const isEditMode = communityId !== undefined;

  const [selectedOption, setSelectedOption] = useState<"1" | "2" | "3">("1");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    startDate: "",
    endDate: "",
    recruitEndDate: "",
    ageGroup: "",
    recruitments: [{ role: "", count: "" }],
  });

  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    handleCategorySelect,
    contests,
    selectedContest,
    setSelectedContest,
    isContestDropdownOpen,
    setIsContestDropdownOpen,
    isLoadingContests,
    handleContestSelect,
  } = useCommunityHandlers(selectedOption);

  const [pendingCategoryId, setPendingCategoryId] = useState<number | null>(null);
  const [pendingContestId, setPendingContestId] = useState<number | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      if (!communityId) return;
      try {
        const detail = await fetchCommunityDetail(communityId);
        setSelectedOption(detail.community_type as "1" | "2" | "3");
        setFormData({
          title: detail.title,
          content: detail.content,
          startDate: detail.start_date?.slice(0, 10) ?? "",
          endDate: detail.end_date?.slice(0, 10) ?? "",
          recruitEndDate: detail.recruit_end_date?.slice(0, 10) ?? "",
          ageGroup: detail.age_group,
          recruitments: detail.recruitment_detail_list.map((r: RecruitmentDetail) => ({
            role: r.role,
            count: r.count.toString(),
          })),
        });
        setPendingCategoryId(detail.category_type);
        setPendingContestId(detail.contest_id);
      } catch (err) {
        console.error("게시글 상세 불러오기 실패", err);
        throw new Error("게시글을 불러오던 중 오류가 발생했습니다.");
      }
    };
    loadDetail();
  }, [communityId]);

  // 카테고리 설정
  useEffect(() => {
    if (pendingCategoryId && categories.length > 0) {
      const found = categories.find((cat) => cat.category_id === pendingCategoryId);
      if (found) {
        setSelectedCategory(found);
        // 카테고리 선택 후 공모전 목록을 로드하기 위해 handleCategorySelect 호출
        handleCategorySelect(found);
        setPendingCategoryId(null);
      }
    }
  }, [categories, pendingCategoryId, handleCategorySelect, setSelectedCategory]);

  // 공모전 설정 (카테고리가 변경되고 공모전 목록이 로드된 후 실행)
  useEffect(() => {
    if (pendingContestId && contests.length > 0 && !isLoadingContests) {
      const found = contests.find((con) => con.contest_id === pendingContestId);
      if (found) {
        setSelectedContest(found);
        setPendingContestId(null);
      }
    }
  }, [contests, pendingContestId, isLoadingContests, setSelectedContest]);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRecruitmentChange = (index: number, field: "role" | "count", value: string) => {
    const updated = [...formData.recruitments];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, recruitments: updated }));
  };

  const handleAddRole = () => {
    setFormData((prev) => ({
      ...prev,
      recruitments: [...prev.recruitments, { role: "", count: "" }],
    }));
  };

  const handleRemoveRole = (index: number) => {
    if (formData.recruitments.length > 1) {
      const updated = formData.recruitments.filter((_, i) => i !== index);
      setFormData((prev) => ({ ...prev, recruitments: updated }));
    }
  };

  const handleCancel = () => {
    if (confirm("정말 작성을 취소하시겠습니까?")) {
      window.history.back();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const basePayload: SubmitPayload = {
      communityType: selectedOption,
      categoryType: selectedCategory?.category_id ?? null,
      contestId: selectedContest?.contest_id ?? null,
      title: formData.title,
      content: formData.content,
      startDate: formData.startDate,
      endDate: formData.endDate,
      recruitEndDate: formData.recruitEndDate,
      ageGroup: formData.ageGroup,
      recruitments: formData.recruitments.map((r) => ({
        role: r.role,
        count: Number(r.count),
      })),
    };

    try {
      if (isEditMode && communityId) {
        const modifyPayload: ModifyPayload = {
          ...basePayload,
          communityId: communityId,
        };
        await modifyCommunity(modifyPayload);
      } else {
        await registerCommunity(basePayload);
      }
      setIsSubmitModalOpen(true);
    } catch (err) {
      console.error("처리 실패", err);
      alert("에러가 발생했습니다.");
    }
  };

  const handleModalConfirm = () => {
    setIsSubmitModalOpen(false);
    if (isEditMode) {
      // 수정 성공 시 상세 페이지로 이동
      navigate(`/community/content/${communityId}`);
    } else {
      // 등록 성공 시 목록 페이지로 이동
      navigate(`/community/list?communityType=${selectedOption}`);
    }
  };

  return (
    <main className="community-write min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto pt-28 px-4 pb-12">
        <form onSubmit={handleSubmit}>
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

          <BaseInfoSection
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            isEditMode={isEditMode}
            categories={categories}
            selectedCategory={selectedCategory}
            isCategoryDropdownOpen={isCategoryDropdownOpen}
            setIsCategoryDropdownOpen={setIsCategoryDropdownOpen}
            handleCategorySelect={async (category) => {
              setSelectedContest(null);
              await handleCategorySelect(category);
              setIsCategoryDropdownOpen(false);
            }}
            contests={contests}
            selectedContest={selectedContest}
            isContestDropdownOpen={isContestDropdownOpen}
            isLoadingContests={isLoadingContests}
            setIsContestDropdownOpen={setIsContestDropdownOpen}
            handleContestSelect={handleContestSelect}
            formData={{ startDate: formData.startDate, endDate: formData.endDate }}
            handleFormChange={handleFormChange}
          />

          {selectedOption !== "3" && (
            <RequirementInfoSection
              formData={formData}
              handleFormChange={handleFormChange}
              handleRecruitmentChange={handleRecruitmentChange}
              handleAddRole={handleAddRole}
              handleRemoveRole={handleRemoveRole}
            />
          )}

          <TitleContentInput
            title={formData.title}
            content={formData.content}
            onTitleChange={handleFormChange}
            onContentChange={(value) => setFormData((prev) => ({ ...prev, content: value }))}
          />

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
        </form>
      </div>

      {isSubmitModalOpen && (
        <SubmitModal
          isEditMode={isEditMode}
          onConfirm={handleModalConfirm}
        />
      )}
    </main>
  );
};

export default CommunityWrite;
