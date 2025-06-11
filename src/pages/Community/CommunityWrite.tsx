import { useState, useEffect } from "react";
import { registerCommunity, type CommunityRegisterPayload } from "@/api/community/register";
import { fetchCategory, type Category } from "@/api/common/category";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Button from "@/components/shared/Button";

const CommunityWrite = () => {
  const [selectedOption, setSelectedOption] = useState<"1" | "2" | "3">("1");
  const navigate = useNavigate();

  // 카테고리 관련 상태 추가
  const [categories, setCategories] = useState<Category[]>([]);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

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
        setCategories([]); // 에러 시 빈 배열로 설정
      }
    };

    // 공모전일 때만 카테고리 로드
    if (selectedOption === "1") {
      loadCategories();
    } else {
      // 공모전이 아닌 경우 초기화
      setCategories([]);
      setSelectedCategory(null);
      setIsCategoryDropdownOpen(false);
    }
  }, [selectedOption]);

  // option값 별 form 변경
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 카테고리 선택
  const handleCategorySelect = (category: Category) => {
    try {
      setSelectedCategory(category);
      setFormData(prev => ({ ...prev, categoryType: category.category_id.toString() }));
      setIsCategoryDropdownOpen(false);
    } catch (error) {
      console.error("카테고리 선택 오류:", error);
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
    navigate(`/community/list?communityType=${selectedOption}`);
  };

  // 저장
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

      if (!formData.recruitments.some((r) => r.role.trim())) {
        alert("모집 역할을 하나 이상 입력해주세요.");
        return;
      }

      if (formData.recruitments.some((r) => Number(r.count) <= 0)) {
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

    const clean = (val: string) => val.trim() === "" ? null : val;

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
      const result = await registerCommunity(payload);
      if (result) {
        const modal = document.getElementById("alert_modal");
        if (modal instanceof HTMLDialogElement) {
          modal.showModal();
        }
      }
    } catch (error) {
      console.error("커뮤니티 글 등록 오류" + error);
    }
  };

  return (
    <main>
      <form id="communityForm" onSubmit={handleSubmit}>
        <div className="max-w-[1400px] mx-auto pt-28">
          {/* 기본 정보 */}
          <section>
            <div className="font-bold text-xl py-2">기본 정보를 입력해주세요.</div>
            <div className="border-t-2 border-gray-200 py-4">
              <input
                type="radio"
                id="option1"
                name="option"
                value="1"
                className="w-8"
                onChange={() => setSelectedOption("1")}
                checked={selectedOption === "1"}
              />
              <label htmlFor="option1">공모전</label>
              <input
                type="radio"
                id="option2"
                name="option"
                value="2"
                className="w-8 ml-4"
                onChange={() => setSelectedOption("2")}
                checked={selectedOption === "2"}
              />
              <label htmlFor="option2">스터디</label>
              <input
                type="radio"
                id="option3"
                name="option"
                value="3"
                className="w-8 ml-4"
                onChange={() => setSelectedOption("3")}
                checked={selectedOption === "3"}
              />
              <label htmlFor="option3">자유</label>
            </div>

            {/* 분야/참여 선택 */}
            {selectedOption === "1" && (
              <div className="flex gap-20 pb-2">
                {/* 분야 - 카테고리 드롭다운으로 변경 */}
                <div className="w-full relative">
                  <div className="pb-2 font-bold text-black">분야</div>
                  <div
                    className="block max-w-[25rem] h-8 leading-8 pl-2 border border-gray-300 rounded text-sm cursor-pointer"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                    }}
                  >
                    <span className={selectedCategory ? "text-black" : "text-gray-400"}>
                      {selectedCategory ? selectedCategory.name : "공모전 분야를 선택해주세요."}
                    </span>
                  </div>
                  {isCategoryDropdownOpen && (
                    <ul className="absolute left-0 h-40 max-w-[25rem] w-full border border-gray-300 rounded p-2 z-50 overflow-y-scroll text-sm bg-white shadow-lg">
                      {categories && categories.length > 0 ? (
                        categories.map((category) => (
                          <li
                            key={category.category_id}
                            className="hover:bg-gray-100 p-1 cursor-pointer"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleCategorySelect(category);
                            }}
                          >
                            {category.name}
                          </li>
                        ))
                      ) : (
                        <li className="p-1 text-gray-500">카테고리를 불러오는 중...</li>
                      )}
                    </ul>
                  )}
                </div>

                {/* 참여 */}
                {/* TODO : 공모전 리스트 생기면 조회하여 적용 */}
                <div className="w-full relative">
                  <div className="pb-2 font-bold text-black">참여</div>
                  <div className="block max-w-[25rem] h-8 leading-8 pl-2 border border-gray-300 rounded text-sm text-gray-400 truncate">
                    참여할 공모전을 선택해주세요.
                  </div>
                  <ul className="absolute  left-0 max-w-[25rem] w-full border border-gray-300 rounded p-2 z-50 overflow-y-scroll text-sm hidden"></ul>
                </div>
              </div>
            )}

            {selectedOption !== "3" && (
              <div className="flex gap-20 pt-2">
                <div className="flex flex-col w-full">
                  <label className="pb-2 font-bold">시작일</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="pb-2 font-bold">종료일</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded"
                  />
                </div>
              </div>
            )}
          </section>

          {/* 모집 정보 */}
          {selectedOption !== "3" && (
            <section className="pt-4">
              <div className="font-bold text-xl py-4">모집정보를 입력해주세요.</div>
              <div className="flex gap-20 border-t-2 border-gray-200 pt-2 pb-4">
                <div className="flex flex-col w-full py-2">
                  <label className="pb-2 font-bold">모집 종료일</label>
                  <input
                    type="date"
                    name="recruitEndDate"
                    value={formData.recruitEndDate}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="flex flex-col w-full">
                  <label className="pb-2 font-bold">모집 연령</label>
                  <select
                    name="ageGroup"
                    value={formData.ageGroup}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded text-sm"
                  >
                    <option value="" disabled hidden>
                      모집 연령을 선택해주세요
                    </option>
                    <option value="1">대학생</option>
                    <option value="2">제한없음</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-20 mb-2">
                <div className="w-full">
                  <label className="pb-2 font-bold">모집역할</label>
                </div>
                <div className="w-full">
                  <label className="pb-2 font-bold">모집인원</label>
                </div>
              </div>
              {formData.recruitments.map((r, idx) => (
                <div key={idx} className="mb-4">
                  <div className="flex gap-20 items-start">
                    <div className="flex w-full">
                      <input
                        type="text"
                        placeholder="역할을 입력해주세요."
                        value={r.role}
                        onChange={e => handleRecruitmentChange(idx, "role", e.target.value)}
                        className="h-8 pl-2 border border-gray-300 rounded text-sm w-full max-w-[25rem]"
                      />
                    </div>
                    <div className="flex w-full">
                      <input
                        type="number"
                        placeholder="인원을 입력해주세요."
                        min={1}
                        value={r.count}
                        onChange={e => handleRecruitmentChange(idx, "count", e.target.value)}
                        className="h-8 pl-2 border border-gray-300 rounded text-sm w-full max-w-[25rem]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-2">
                    <Button
                      type="button"
                      intent="primary"
                      size="sm"
                      onClickFnc={() => handleRemoveRole(idx)}
                    >
                      삭제
                    </Button>
                    {idx === formData.recruitments.length - 1 && (
                      <Button type="button" intent="primary" size="sm" onClickFnc={handleAddRole}>
                        추가
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </section>
          )}

          {/* 제목 + 내용 */}
          <section>
            <div className="flex flex-col mb-4">
              <label className="pb-2 font-bold">제목</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleFormChange}
                placeholder="제목을 입력해주세요"
                className="h-8 pl-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-10">
              <ReactQuill
                value={formData.content}
                onChange={value => setFormData(prev => ({ ...prev, content: value }))}
                theme="snow"
                className="h-[300px]"
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="flex justify-end gap-2 py-8">
              {/* 취소 : 커뮤니티 목록 이동 처리 */}
              <Button intent="primary" size="lg" type="button" onClickFnc={() => navigate(`/community/list?communityType=${selectedOption}`)}>
                취소
              </Button>
              <Button intent="primary" size="lg" type="submit" onClickFnc={() => { }}>
                등록
              </Button>
            </div>
          </section>
        </div>
      </form>

      {/* 등록 확인 모달 */}
      <dialog id="alert_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">등록이 완료되었습니다</h3>
          <div className="modal-action">
            <button
              className="btn"
              onClick={handleModalConfirm}
            >
              확인
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default CommunityWrite;