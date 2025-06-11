import { fetchCommunityDetail, type CommunityDetail } from "@/api/community/content";
import { deleteCommunity } from "@/api/community/delete";
import Avatar from "@/components/shared/Avatar";
import CommentItem from "@/components/shared/Comment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const mockComments = [
  {
    id: 1,
    writer: "김철수",
    writeDate: "2025.01.22 08:31",
    content: "프론트엔드 기술은 어떤걸 사용하시나요?",
    imgSrc: "/assets/icons/iconmonstr-user-circle-thin.svg",
  },
];

const CommunityContent = () => {
  const { communityId } = useParams<{ communityId: string }>();
  const [community, setCommunity] = useState<CommunityDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!communityId) return;

    const loadContent = async () => {
      try {
        const data = await fetchCommunityDetail(Number(communityId));
        setCommunity(data);
      } catch (error) {
        console.error("커뮤니티 상세 불러오기 실패:", error);
      }
    };

    loadContent();
  }, [communityId]);

  if (!community) return null;

  const handleDelete = async () => {
    try {
      await deleteCommunity({ communityId: Number(communityId) });
      navigate("/community/list"); // 👉 리스트 페이지로 이동
      alert("삭제가 완료되었습니다.");
      // modal로 ?
      navigate("/community/list");
    } catch (error) {
      console.error("삭제 실패:", error);
      alert("삭제 중 오류가 발생했습니다.");
      // modal로 ?
    }
  };

  const { recruitment_detail_list = [] } = community;

  const ageGroupLabel: Record<string, string> = {
    "1": "대학생",
    "2": "제한없음",
  };

  return (
    <main className="pt-14">
      <div className="max-w-[1400px] mx-auto">
        {/* 게시글 헤더 */}
        <section className="pt-6">
          <div className="flex flex-col gap-2">
            <div className="flex gap-4 pt-8">
              <span className="px-2 py-1 border rounded bg-gray-800 text-white text-sm truncate">
                IT/학술/논문
              </span>
              <span className="text-xl font-bold truncate">{community.title || "제목 없음"}</span>
            </div>
            <div className="flex justify-end gap-4 text-sm">
              <span>{community.nickname}</span>
              <span>{community.reg_date?.slice(0, 10)}</span>
            </div>
          </div>
        </section>

        {/* 모집 정보 */}
        <section className="py-6">
          <div className="border-t-2 border-gray-200 py-5">
            {/* 상단 우측 버튼 */}
            <div className="flex justify-end text-xs text-gray-500 gap-2">
              <button className="cursor-pointer">수정</button>
              <button
                className="cursor-pointer"
                onClick={() => {
                  const modal = document.getElementById("delete_modal");
                  if (modal instanceof HTMLDialogElement) {
                    modal.showModal();
                  }
                }}
              >
                삭제
              </button>
            </div>

            {/* 2단 정보 영역 */}
            <div className="flex flex-col md:flex-row gap-4">
              {/* 왼쪽 열 */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">활동 유형</span>
                  <span className="text-black">
                    {community.community_type === "1" ? "공모전" : "기타"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">모집 연령</span>
                  <span className="text-black">{ageGroupLabel[community.age_group] ?? "-"}</span>
                </div>
              </div>

              {/* 오른쪽 열 */}
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">진행 일정</span>
                  <span className="text-black">
                    {community.start_date ? community.start_date.slice(0, 10) : "-"} ~{" "}
                    {community.end_date ? community.end_date.slice(0, 10) : "-"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-28 text-gray-600 font-semibold">모집 종료</span>
                  <span className="text-black">
                    {community.recruit_end_date ? community.recruit_end_date.slice(0, 10) : null}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 모집 상세 */}
          {recruitment_detail_list.length > 0 && (
            <div className="flex flex-col gap-4 border-t-2 border-gray-200 px-2 py-3">
              <div className="flex flex-wrap gap-6">
                <span className="font-bold">모집 상세</span>
                <div className="flex gap-8 flex-wrap">
                  <div className="flex flex-col gap-2 text-sm">
                    {recruitment_detail_list.map(detail => (
                      <div key={detail.recruitment_detail_id}>
                        <span className="font-bold mr-2">{detail.role}</span>
                        <span>{detail.count}명</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6">
                <span className="font-bold">상세 설명</span>
                <div
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: community.content }}
                />
              </div>
            </div>
          )}
        </section>

        {/* 댓글 섹션 */}
        <section className="py-6">
          <span className="text-sm">댓글 {mockComments.length}개</span>

          <ul className="my-4 flex flex-col gap-4">
            {mockComments.map(comment => (
              <CommentItem
                key={comment.id}
                writer={comment.writer}
                writeDate={comment.writeDate}
                content={comment.content}
                imgSrc={comment.imgSrc}
                size="md"
                intent="default"
                className="border border-gray-200 p-4 rounded"
              />
            ))}
          </ul>

          {/* 댓글 작성 폼 */}
          <form className="flex py-4 gap-4 items-start">
            <Avatar src="/assets/icons/iconmonstr-user-circle-thin.svg" size="md" shape="circle" />
            <div className="flex-1">
              <div className="border border-gray-200 mb-4 rounded">
                <div className="px-2 py-1 border-b">
                  <span className="font-bold text-sm">김닉네임</span>
                </div>
                <input type="text" placeholder="내용을 입력해주세요." className="w-full p-2" />
              </div>
              <div className="flex justify-end gap-2">
                <button type="button" className="w-16 h-8 rounded bg-gray-200">
                  취소
                </button>
                <button type="submit" className="w-16 h-8 rounded bg-gray-800 text-white">
                  등록
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>

      {/* 삭제 확인 모달 */}
      <dialog id="delete_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">정말 삭제하시겠습니까?</h3>
          <p className="py-4">삭제 후에는 복구할 수 없습니다.</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">아니요</button>
            </form>
            <button
              className="btn bg-orange-500 text-white hover:bg-orange-600 text-white"
              onClick={handleDelete}
            >
              예
            </button>
          </div>
        </div>
      </dialog>
    </main>
  );
};

export default CommunityContent;
