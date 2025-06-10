import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Button from "@/components/shared/Button";
import { registerCommunity, type CommunityRegisterPayload } from "@/api/community/register";

const CommunityWrite = () => {
  const [selectedOption, setSelectedOption] = useState<"1" | "2" | "3">("1");

  const [formData, setFormData] = useState({
    communityType: "1",
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

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async () => {
    const payload: CommunityRegisterPayload = {
      ...formData,
      communityType: selectedOption,
      contestId: formData.contestId ? Number(formData.contestId) : null,
      categoryType: formData.categoryType ? Number(formData.categoryType) : null,
      ageGroup: formData.ageGroup?.trim() || null,
      recruitments:
        selectedOption === "3"
          ? undefined
          : formData.recruitments
            .filter((r) => r.role.trim()) // 역할이 비어있는 건 제거
            .map((r) => ({
              role: r.role,
              count: Number(r.count),
            })),
    };

    try {
      const result = await registerCommunity(payload);
      alert("등록 성공!" + result);
    } catch (error) {
      alert("등록 중 오류 발생" + error);
    }
  };

  return (
    <main>
      <form id="communityForm">
        <div className="max-w-[1400px] mx-auto pt-28">
          {/* 기본 정보 */}
          <section>
            <div className="font-bold text-xl py-2">기본 정보를 입력해주세요.</div>
            <div className="border-t-2 border-gray-200 py-4">
              <input type="radio" id="option1" name="option" value="1" className="w-8"
                onChange={() => setSelectedOption("1")} checked={selectedOption === "1"} />
              <label htmlFor="option1">공모전</label>
              <input type="radio" id="option2" name="option" value="2" className="w-8 ml-4"
                onChange={() => setSelectedOption("2")} checked={selectedOption === "2"} />
              <label htmlFor="option2">스터디</label>
              <input type="radio" id="option3" name="option" value="3" className="w-8 ml-4"
                onChange={() => setSelectedOption("3")} checked={selectedOption === "3"} />
              <label htmlFor="option3">자유</label>
            </div>

            {/* 분야/참여 선택 */}
            {selectedOption === "1" && (
              <div className="flex gap-20 pb-2">
                {/* 분야 */}
                <div className="w-full relative">
                  <div className="pb-2 font-bold text-black">분야</div>
                  <div className="block max-w-[25rem] h-8 leading-8 pl-2 border border-gray-300 rounded text-sm text-gray-400 truncate">
                    공모전 분야를 선택해주세요.
                  </div>
                  <ul className="absolute  left-0 h-40 max-w-[25rem] w-full border border-gray-300 rounded p-2 z-50 overflow-y-scroll text-sm hidden">
                    <li>포스터/웹툰/콘텐츠</li>
                    <li>사진/영상/UCC</li>
                    <li>아이디어/기획</li>
                    <li>IT/학술/논문</li>
                    <li>네이밍/슬로건</li>
                    <li>스포츠/음악</li>
                    <li>미술/디자인/건축</li>
                  </ul>
                </div>

                {/* 참여 */}
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
                  <input type="date" name="startDate" value={formData.startDate}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="pb-2 font-bold">종료일</label>
                  <input type="date" name="endDate" value={formData.endDate}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded" />
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
                  <input type="date" name="recruitEndDate" value={formData.recruitEndDate}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded" />
                </div>
                <div className="flex flex-col w-full">
                  <label className="pb-2 font-bold">모집 연령</label>
                  <input type="text" name="ageGroup" value={formData.ageGroup}
                    onChange={handleFormChange}
                    className="max-w-[25rem] h-8 pl-2 border border-gray-300 rounded" />
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
                        onChange={(e) => handleRecruitmentChange(idx, "role", e.target.value)}
                        className="h-10 pl-2 border border-gray-300 rounded text-sm w-full max-w-[25rem]"
                      />
                    </div>
                    <div className="flex w-full">
                      <input
                        type="number"
                        placeholder="인원을 입력해주세요."
                        min={1}
                        value={r.count}
                        onChange={(e) => handleRecruitmentChange(idx, "count", e.target.value)}
                        className="h-10 pl-2 border border-gray-300 rounded text-sm w-full max-w-[25rem]"
                      />
                    </div>
                  </div>

                  {/* 버튼은 라벨 아래로 정렬되도록 분리 */}
                  <div className="flex justify-end gap-2 mt-2">
                    <Button type="button" intent="primary" size="lg" onClick={() => handleRemoveRole(idx)}>
                      삭제
                    </Button>
                    {idx === formData.recruitments.length - 1 && (
                      <Button type="button" intent="primary" size="lg" onClick={handleAddRole}>
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
              <input type="text" name="title" value={formData.title}
                onChange={handleFormChange}
                placeholder="제목을 입력해주세요"
                className="h-8 pl-2 border border-gray-300 rounded" />
            </div>
            <div className="mb-10">
              <ReactQuill
                value={formData.content}
                onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                theme="snow"
                className="h-[300px]"
                placeholder="내용을 입력해주세요"
              />
            </div>
            <div className="flex justify-end gap-2 py-8">
              <Button intent="primary" size="lg">취소</Button>
              <Button intent="primary" size="lg" type="button" onClick={handleSubmit}>등록</Button>
            </div>
          </section>
        </div>
      </form>
    </main>
  );
};

export default CommunityWrite;
