import React, { useEffect, useState } from "react";
import ListItem from "@/components/shared/ListItem";
import { fetchCommunityList, type CommunityItem } from "@/api/community/list";
import { useNavigate } from "react-router-dom";

const CommunityList = () => {

    const [posts, setPosts] = useState<CommunityItem[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const urlParams = new URLSearchParams(window.location.search);
    const communityType = urlParams.get("communityType") || "1";
    // eslint-disable-next-line no-console
    console.log("communityType" + communityType);

    useEffect(() => {
        const loadList = async () => {
            try {
                const data = await fetchCommunityList(`${communityType}`, 1, 10);
                setPosts(data.list);
            } catch (err) {
                console.error("커뮤니티 목록 조회 실패:", err);
            } finally {
                setLoading(false);
            }
        };

        loadList();
    }, [communityType]);


    // 위로가기 핸들러
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // 글쓰기 페이지 이동
    const goToWritePage = () => {
        navigate("/community/write");
    };


    return (
        <main className="bg-white pt-28">
            <div className="max-w-[1400px] mx-auto">
                {/* 필터 */}
                <section className="border-y border-gray-400 py-4">
                    <div className="flex flex-col gap-6">
                        {/* 분야 */}
                        <div>
                            <strong className="text-lg">분야</strong>
                            <ul className="flex flex-wrap gap-2 mt-2">
                                {[
                                    "포스터/웹툰/콘텐츠",
                                    "사진/영상/UCC",
                                    "아이디어/기획",
                                    "IT/학술/논문",
                                    "네이밍/슬로건",
                                    "스포츠/음악",
                                    "미술/디자인/건축",
                                ].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="bg-gray-200 px-3 py-1 rounded">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 연령 */}
                        <div>
                            <strong className="text-lg">연령</strong>
                            <ul className="flex flex-wrap gap-2 mt-2">
                                <li>
                                    <a href="#" className="bg-gray-200 px-3 py-1 rounded">
                                        대학생
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="bg-gray-200 px-3 py-1 rounded">
                                        제한없음
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* 정렬 */}
                        <div>
                            <strong className="text-lg">정렬</strong>
                            <ul className="flex flex-wrap gap-2 mt-2">
                                {["최신순", "인기순", "스크랩순", "종료임박순"].map((item) => (
                                    <li key={item}>
                                        <a href="#" className="bg-gray-200 px-3 py-1 rounded">
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* 검색 */}
                        <div className="relative w-full max-w-xl">
                            <input
                                type="text"
                                placeholder="검색어를 입력해주세요"
                                className="w-full h-10 pl-4 pr-10 rounded bg-gray-100"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2">
                                🔍
                            </span>
                        </div>
                    </div>
                </section>

                {/* 콘텐츠 리스트 */}
                {/* 콘텐츠 리스트 */}
                <section className="mt-6 flex flex-col gap-4">
                    {loading ? (
                        <p>로딩 중...</p>
                    ) : posts.length === 0 ? (
                        <p>게시글이 없습니다.</p>
                    ) : (
                        posts.map((post) => (
                            <ListItem
                                key={post.community_id}
                                type="community"
                                title={post.title}
                                description={post.content}
                                writer={post.nickname}
                                likes={post.scrap_count}
                                comment={post.comment_count}
                                linkSrc={`/community/content/${post.community_id}`}
                                endDate={post.recruit_end_date ?? undefined}
                                size="lg"
                                intent="primary"
                            />
                        ))
                    )}
                </section>

                {/* 글쓰기 + Top 버튼 */}
                <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
                    <button
                        onClick={goToWritePage}
                        className="w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center cursor-pointer">
                        <img
                            src="/assets/icons/iconizer-iconmonstr-pencil-lined.svg"
                            alt="글작성"
                            className="w-5 h-5"
                        />
                    </button>
                    <button
                        onClick={handleScrollToTop}
                        className="w-14 h-14 bg-gray-800 rounded-full flex items-center justify-center cursor-pointer">
                        <img
                            src="/assets/icons/iconmonstr-arrow-66-240.png"
                            alt="위로 가기"
                            className="w-5 h-5"
                        />
                    </button>
                </div>
            </div>
        </main >
    );
};

export default CommunityList;
