// components/ReactQuillEditor.tsx
import ReactQuill from "react-quill-new";
import Quill from "quill";
import { fetchUpload } from "@/api/common/upload";

// 서버에 이미지 업로드 요청하는 함수
const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetchUpload(formData);

  return res.data.url; // S3 이미지 URL
};

// Quill 툴바 설정 + 이미지 핸들러 포함
const createEditorModules = () => ({
  toolbar: {
    container: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image"],
      ["clean"],
    ],
    handlers: {
      // eslint-disable-next-line no-unused-vars
      image: function (this: Quill) {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();

        input.onchange = async () => {
          const file = input.files?.[0];
          if (!file) return;
          console.info(file);

          try {
            const url = await uploadImage(file);
            const range = this.getSelection(true);
            this.insertEmbed(range.index, "image", url);
            this.setSelection(range.index + 1);
          } catch (err) {
            console.error("이미지 업로드 실패:", err);
          }
        };
      },
    },
  },
});

type Props = {
  value: string;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  className?: string;
};

const ReactQuillEditor = ({ value, onChange, className }: Props) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      theme="snow"
      placeholder="내용을 입력하세요..."
      modules={createEditorModules()}
      className={className}
    />
  );
};

export default ReactQuillEditor;
