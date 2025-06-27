import type { ChangeEvent } from "react";

type FileInputProps = {
  onFileSelect: (file: File) => void;
  className?: string;
};

const FileInput = ({ onFileSelect, className = "" }: FileInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      e.target.value = "";
      return;
    }

    onFileSelect(file);
  };

  return (
    <input
      type="file"
      accept="image/*"
      className={`file-input ${className}`}
      onChange={handleChange}
    />
  );
};

export default FileInput;
