import React from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

interface TitleContentInputProps {
    title: string;
    content: string;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onContentChange: (value: string) => void;
}

const TitleContentInput: React.FC<TitleContentInputProps> = ({
    title,
    content,
    onTitleChange,
    onContentChange,
}) => {
    return (
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
                            value={content}
                            onChange={onContentChange}
                            theme="snow"
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
