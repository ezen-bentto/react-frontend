import { CalendarOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import CountdownBox from "./CountdownBox";
import type { InfoProps } from "@/types/communityContentType";

const Info = ({
    communityType,
    ageGroup,
    startDate,
    endDate,
    recruitEndDate,
    countdownText,
}: InfoProps) => {
    const ageGroupLabel: Record<string, string> = {
        "1": "대학생",
        "2": "직장인/일반인",
        "3": "제한없음",

    };

    return (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gray-900 dark:text-white">
                <TeamOutlined />
                모집 정보
            </h2>

            {recruitEndDate && countdownText && (
                <CountdownBox countdown={countdownText} />
            )}

            <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                            <TeamOutlined className="text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">활동 유형</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                                {communityType === "1" ? "공모전" : "기타"}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-100 dark:bg-purple-900/30">
                            <UserOutlined className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">모집 연령</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                                {ageGroupLabel[ageGroup] ?? "-"}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-100 dark:bg-green-900/30">
                            <CalendarOutlined className="text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">진행 일정</div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                                {startDate?.slice(0, 10) || "-"} ~ {endDate?.slice(0, 10) || "-"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Info;
