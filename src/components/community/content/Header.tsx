import { HeartFilled, HeartOutlined } from "@ant-design/icons";
import Badge from "@/components/shared/Badge";
import type { HeaderProps } from "@/types/communityContentType";

const Header = ({ community, getCategoryName, onToggleScrap }: HeaderProps) => {
  return (
    <div className="p-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          {community.category_type === 1 && (
            <Badge intent="primary" size="sm">
              {getCategoryName(Number(community.category_type))}
            </Badge>
          )}

          <div className="flex items-center gap-4 ml-auto">
            {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <EyeOutlined />
              <span className="text-sm">조회수</span>
            </div> */}

            <button
              onClick={onToggleScrap}
              className={`flex items-center justify-center p-2 rounded-full transition-all duration-200 ${
                community.scrap_yn
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
              }`}
            >
              {community.scrap_yn ? <HeartFilled /> : <HeartOutlined />}
            </button>
          </div>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold leading-tight text-gray-900 dark:text-white">
          {community.title || "제목 없음"}
        </h1>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-700">
                <img
                  src="/assets/icons/iconmonstr-user-circle-thin.svg"
                  alt="작성자"
                  className="w-5 h-5 object-contain"
                />
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-200">
                {community.nickname}
              </span>
            </div>
            <span className="text-gray-500 dark:text-gray-400">
              {community.reg_date?.slice(0, 10)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
