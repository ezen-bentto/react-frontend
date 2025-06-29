// components/shared/FileInput.tsx
import type { ChangeEvent } from "react";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

type FileInputProps = {
  onFileSelect: (file: File, save_name: string) => void;
  className?: string;
  selectedFileName?: string;
};

const FileInput = ({ onFileSelect, selectedFileName, className = "" }: FileInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("최대 2MB 이하의 파일만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    onFileSelect(file, file.name);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input type="file" accept="image/*" className="file-input" onChange={handleChange} />
      {selectedFileName && (
        <p className="text-sm text-gray-600"> 등록한 파일: {selectedFileName}</p>
      )}
    </div>
  );
};

export default FileInput;
