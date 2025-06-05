import React from "react";

const ContestDetail = () => {
    return (
        <div className="p-6 max-w-5xl mx-auto text-gray-800">
            {/* 카테고리 */}
            <div className="flex items-center space-x-2 mb-2">
                <span className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm font-semibold">아이디어/기획</span>
                <h1 className="text-xl font-bold">교육 데이터 분석 공모전 - 학생 부문</h1>
            </div>

            {/* 기본 정보 */}
            <div className="text-sm text-gray-600 space-y-1 mb-4">
                <div><span className="font-semibold mr-2">구분</span>공모전</div>
                <div><span className="font-semibold mr-2">모집 연령</span>대학생</div>
                <div><span className="font-semibold mr-2">일정</span>2025-05-20 ~ 2025-06-20</div>
                <div><span className="font-semibold mr-2">모집 종료</span>모집이 종료되었습니다.</div>
            </div>

            {/* 모집 상세 */}
            <div className="mb-4">
                <h2 className="font-semibold text-gray-700 mb-1">모집 상세</h2>
                <div className="grid grid-cols-2 text-sm gap-2">
                    <div>프론트엔드 1</div>
                    <div>백엔드 1</div>
                </div>
            </div>

            {/* 상세 설명 */}
            <div className="mb-6">
                <h2 className="font-semibold text-gray-700 mb-1">상세 설명</h2>
                <p className="text-sm">팀원 2명 모집합니다. 현재 2명 대기중</p>
            </div>

            {/* 댓글 */}
            <div className="border-t pt-4">
                <h2 className="font-semibold text-gray-700 mb-2">댓글 1개</h2>

                {/* 댓글 목록 */}
                <div className="space-y-3 mb-4">
                    <div className="text-sm">
                        <div className="font-semibold">김철수</div>
                        <div className="text-gray-700">프론트엔드 기술은 어떤걸 사용하시나요?</div>
                        <div className="text-gray-400 text-xs mt-1">2025.01.22 08:31</div>
                    </div>
                </div>

                {/* 댓글 입력 */}
                <div className="flex space-x-2 items-start">
                    <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">김닉네임</div>
                    </div>
                    <div className="flex-1">
                        <textarea
                            className="w-full border rounded p-2 text-sm resize-none"
                            rows={4}
                            placeholder="내용을 입력해주세요."
                        />
                        <div className="flex justify-end mt-2 space-x-2">
                            <button className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm">취소</button>
                            <button className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">등록</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContestDetail;
