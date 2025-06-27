import type { DetailsProps } from "@/types/communityContentType";

const Details = ({ contentHtml, recruitmentDetailList = [] }: DetailsProps) => {
    return (
        <div className="p-6 border-t border-gray-200 dark:border-gray-700">
            {/* 모집 상세 카드 */}
            {recruitmentDetailList.length > 0 && (
                <div className="mb-8">
                    <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">모집 상세</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {recruitmentDetailList.map((detail) => (
                            <div
                                key={detail.recruitment_detail_id}
                                className="p-4 rounded-xl text-center bg-gray-50 dark:bg-gray-700"
                            >
                                <div className="text-2xl font-bold text-blue-600 mb-1">
                                    {detail.count}
                                </div>
                                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {detail.role}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 상세 설명 HTML */}
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">상세 설명</h2>
            <div
                className="prose max-w-none min-h-[200px] prose-gray dark:prose-invert dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white dark:prose-li:text-gray-300"
                dangerouslySetInnerHTML={{
                    __html: contentHtml || "<p>상세 설명이 없습니다.</p>",
                }}
            />
        </div>
    );
};

export default Details;
