import type { DarkModeProps } from "@/types/communityContentType";
import { FireOutlined, BulbOutlined } from "@ant-design/icons";

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }: DarkModeProps) => {
    return (
        <div className="fixed top-4 right-4 z-50">
            <button
                onClick={toggleDarkMode}
                className={`p-3 rounded-full shadow-lg transition-all duration-300 ${isDarkMode
                    ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                    : "bg-[#2B2B2B] text-white hover:bg-gray-700"
                    }`}
                aria-label="다크모드 토글"
            >
                {isDarkMode ? <FireOutlined /> : <BulbOutlined />}
            </button>
        </div>
    );
};

export default DarkModeToggle;
