import React, { useMemo, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface TitleContentInputProps {
  title: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (value: string) => void;
  communityId?: number;
}

declare global {
  interface Window {
    tempImageFiles?: Map<string, { file: File; fileName: string }>;
    uploadedImageIds?: Array<{ fileName: string; url: string }>;
  }
}

const TitleContentInput: React.FC<TitleContentInputProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  communityId,
}) => {
  // Quill 에디터 ref
  const quillRef = useRef<ReactQuill>(null);

  // ReactQuill 이미지 핸들러
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // 파일 크기 체크
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith("image/")) {
        alert("이미지 파일만 업로드 가능합니다.");
        return;
      }

      try {
        // 로딩 표시
        const loadingToast = document.createElement("div");
        loadingToast.textContent = "이미지 업로드 중...";
        loadingToast.style.cssText = `
          position: fixed;
          top: 20px;
          right: 20px;
          background: #333;
          color: white;
          padding: 10px 20px;
          border-radius: 5px;
          z-index: 9999;
        `;
        document.body.appendChild(loadingToast);

        // 1. Base64로 변환하여 즉시 미리보기
        const reader = new FileReader();
        reader.onload = e => {
          const base64Data = e.target?.result as string;

          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection();
            const index = range ? range.index : quill.getLength();

            // Base64로 즉시 표시
            quill.insertEmbed(index, "image", base64Data);
            quill.setSelection(index + 1);

            // 2. 실제 파일 객체를 별도 저장 (Blob 형태로)
            if (!window.tempImageFiles) window.tempImageFiles = new Map();
            window.tempImageFiles.set(base64Data, {
              file: file,
              fileName: file.name,
            });
          }
        };
        reader.readAsDataURL(file);

        // 로딩 표시 제거
        document.body.removeChild(loadingToast);
      } catch (error) {
        console.error("이미지 처리 실패:", error);
        alert("이미지 처리에 실패했습니다.");

        // 로딩 표시 제거 (에러 시에도)
        const existingToast = document.querySelector("div[style*='position: fixed']");
        if (existingToast) {
          document.body.removeChild(existingToast);
        }
      }
    };
  };

  // ReactQuill 모듈 설정
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "underline", "strike"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ color: [] }, { background: [] }],
          [{ align: [] }],
          ["link", "image"],
          ["clean"],
        ],
        handlers: {
          image: imageHandler, // 커스텀 이미지 핸들러
        },
      },
    }),
    [communityId]
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "color",
    "background",
    "align",
    "link",
    "image",
  ];

  // 컴포넌트 언마운트 시 임시 데이터 정리
  useEffect(() => {
    return () => {
      // 컴포넌트 정리 시 임시 데이터 제거
      window.tempImageFiles = new Map();
      window.uploadedImageIds = [];
    };
  }, []);

  return (
    <div className="card-animation border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4">
          <span className="text-white font-bold text-lg">3</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">내용을 작성해주세요</h2>
      </div>

      <div className="space-y-6 mb-8">
        {/* 제목 입력 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
            📝 제목
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onTitleChange}
            placeholder="매력적인 제목을 입력해주세요"
            className="w-full h-12 px-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-gray-800 dark:text-gray-200 focus:border-blue-500 focus:ring-0 transition-colors duration-200 text-lg placeholder-gray-400 dark:placeholder-gray-500"
          />
        </div>

        {/* 내용 입력 */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-300">
            ✍️ 내용
          </label>
          <div className="border-2 border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden focus-within:border-blue-500 transition-colors duration-200">
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={onContentChange}
              theme="snow"
              modules={modules}
              formats={formats}
              className="h-80 dark-quill"
              placeholder="상세한 내용을 입력해주세요..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleContentInput;
