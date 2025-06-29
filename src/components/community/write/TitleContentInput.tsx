import React, { useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { uploadImage } from "@/api/common/upload"; // 기존 업로드 API 그대로 사용

interface TitleContentInputProps {
  title: string;
  content: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onContentChange: (value: string) => void;
  communityId?: number; // 수정 모드일 때 필요
}

const TitleContentInput: React.FC<TitleContentInputProps> = ({
  title,
  content,
  onTitleChange,
  onContentChange,
  communityId,
}) => {
  // Quill 에디터 ref 추가
  const quillRef = useRef<ReactQuill>(null);

  // ReactQuill 이미지 핸들러
  const imageHandler = async () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      // 파일 크기 체크 (예: 5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        alert('파일 크기는 5MB 이하여야 합니다.');
        return;
      }

      // 파일 타입 체크
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      try {
        // 로딩 표시 (선택적)
        const loadingToast = document.createElement('div');
        loadingToast.textContent = '이미지 업로드 중...';
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

        // 임시 ID로 이미지 업로드 (글 작성 전이므로 -1 사용)
        const imageUrl = await uploadImage({
          file,
          fileName: file.name,
          id: communityId || -1, // 임시 ID 사용
          type: 'community',
        });

        console.log('업로드된 이미지 URL:', imageUrl); // 디버깅용

        // Quill 에디터 인스턴스 가져오기 (수정된 방법)
        const quill = quillRef.current?.getEditor();

        if (quill) {
          const range = quill.getSelection();
          const index = range ? range.index : quill.getLength();

          // 이미지 삽입
          quill.insertEmbed(index, 'image', imageUrl);
          quill.setSelection(index + 1);

          console.log('이미지 삽입 완료:', imageUrl); // 디버깅용
        } else {
          console.error('Quill 에디터 인스턴스를 찾을 수 없습니다.');
          alert('에디터에 이미지를 삽입할 수 없습니다.');
        }

        // 로딩 표시 제거
        document.body.removeChild(loadingToast);

      } catch (error) {
        console.error('이미지 업로드 실패:', error);
        alert('이미지 업로드에 실패했습니다. 다시 시도해주세요.');

        // 로딩 표시 제거 (에러 시에도)
        const existingToast = document.querySelector('div[style*="position: fixed"]');
        if (existingToast) {
          document.body.removeChild(existingToast);
        }
      }
    };
  };

  // ReactQuill 모듈 설정
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ color: [] }, { background: [] }],
        [{ align: [] }],
        ['link', 'image'],
        ['clean'],
      ],
      handlers: {
        image: imageHandler, // 커스텀 이미지 핸들러
      },
    },
  }), [communityId]); // communityId 의존성 추가

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet',
    'color', 'background',
    'align',
    'link', 'image',
  ];

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
              ref={quillRef} // ref 추가
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