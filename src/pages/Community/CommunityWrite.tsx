import { useState, useMemo, type FormEvent } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { registerCommunity, type CommunityRegisterPayload } from "@/api/CommunityWrite";

// interface CommunityFormData {
//     communityType: "1" | "2" | "3";
//     contestId?: number | null;
//     startDate?: string | null;
//     endDate?: string | null;
//     recruitEndDate?: string | null;
//     categoryType?: number | null;
//     ageGroup?: string | null;
//     title?: string;
//     content: string;
//     recruitments?: {
//         role: string;
//         count: string;
//     }[];
// }

const CommunityWrite = () => {
  const [content, setContent] = useState("");
  //const [category, setCategory] = useState("1");
  const [formData, setFormData] = useState({
    communityType: "1",
    contestId: "",
    startDate: "",
    endDate: "",
    recruitEndDate: "",
    categoryType: "",
    ageGroup: "",
    title: "",
    recruitments: [
      {
        role: "",
        count: "",
      },
    ],
  });

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ align: [] }],
        ["link", "image"],
        ["clean"],
      ],
    }),
    []
  );

  const handleChange = <K extends keyof CommunityRegisterPayload>(
    field: K,
    value: CommunityRegisterPayload[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        content,
        categoryType: formData.categoryType ? parseInt(formData.categoryType) : null,
        contestId: formData.contestId ? parseInt(formData.contestId) : null,
        recruitments: formData.communityType === "3" ? undefined : formData.recruitments,
      };

      await registerCommunity(payload);
      alert("등록 완료");
    } catch (err) {
      console.error(err);
      alert("등록 실패");
    }
  };

  return (
    <form className="max-w-[900px] mx-auto p-8 bg-white rounded-xl shadow" onSubmit={handleSubmit}>
      {/* 카테고리 선택 */}
      <fieldset className="mb-6">
        <legend className="font-semibold mb-2">기본 정보를 입력해주세요.</legend>
        <div className="flex gap-6 mb-4">
          {["1", "2", "3"].map(val => (
            <label key={val} className="flex items-center gap-1">
              <input
                type="radio"
                name="category"
                value={val}
                checked={formData.communityType === val}
                onChange={() => handleChange("communityType", val)}
              />
              {val === "1" ? "공모전" : val === "2" ? "스터디" : "자유"}
            </label>
          ))}
        </div>

        {formData.communityType === "1" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">분야</label>
              <input
                type="text"
                placeholder="공모전 분야를 선택해주세요."
                className="w-full border rounded px-3 py-2"
                value={formData.categoryType}
                onChange={e => handleChange("categoryType", e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">참여</label>
              <input
                type="text"
                placeholder="참여할 공모전을 선택해주세요."
                className="w-full border rounded px-3 py-2"
                value={formData.contestId}
                onChange={e => handleChange("contestId", e.target.value)}
              />
            </div>
          </div>
        )}
      </fieldset>

      {/* 시작일 / 종료일 */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-medium mb-1">시작일</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={formData.startDate}
            onChange={e => handleChange("startDate", e.target.value)}
          />
        </div>
        <div>
          <label className="block font-medium mb-1">종료일</label>
          <input
            type="date"
            className="w-full border rounded px-3 py-2"
            value={formData.endDate}
            onChange={e => handleChange("endDate", e.target.value)}
          />
        </div>
      </div>

      {/* 모집 정보 */}
      {(formData.communityType === "1" || formData.communityType === "2") && (
        <fieldset className="mb-6">
          <legend className="font-semibold mb-2">모집정보를 입력해주세요.</legend>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">모집종료일</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={formData.recruitEndDate}
                onChange={e => handleChange("recruitEndDate", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">모집 연령</label>
              <input
                type="text"
                placeholder="모집 연령을 선택해주세요."
                className="w-full border rounded px-3 py-2"
                value={formData.ageGroup}
                onChange={e => handleChange("ageGroup", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1">모집 역할</label>
              <input
                type="text"
                placeholder="역할을 입력해주세요."
                className="w-full border rounded px-3 py-2"
                value={formData.recruitments[0].role}
                onChange={e => {
                  const updated = [...formData.recruitments];
                  updated[0].role = e.target.value;
                  setFormData(prev => ({ ...prev, recruitments: updated }));
                }}
              />
            </div>
            <div>
              <label className="block mb-1">모집 인원</label>
              <input
                type="number"
                placeholder="인원을 입력해주세요."
                className="w-full border rounded px-3 py-2"
                value={formData.recruitments[0].count}
                onChange={e => {
                  const updated = [...formData.recruitments];
                  updated[0].count = e.target.value;
                  setFormData(prev => ({ ...prev, recruitments: updated }));
                }}
              />
            </div>
          </div>
        </fieldset>
      )}

      {/* 제목 */}
      <div className="mb-4">
        <label className="block mb-1 font-medium">제목</label>
        <input
          type="text"
          placeholder="제목을 입력해주세요."
          className="w-full border rounded px-3 py-2"
          value={formData.title}
          onChange={e => handleChange("title", e.target.value)}
        />
      </div>

      {/* 에디터 */}
      <div className="mb-6">
        <ReactQuill
          value={content}
          onChange={setContent}
          modules={modules}
          theme="snow"
          placeholder="내용을 입력해 주세요."
          className="bg-white rounded-md h-[300px]"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" className="px-4 py-2 border rounded text-gray-600">
          취소
        </button>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          등록
        </button>
      </div>
    </form>
  );
};

export default CommunityWrite;
