import type { Contest } from "@/types/contestType";
import countDate from "@/utils/countDate";
import Badge from "../shared/Badge";
import Button from "../shared/Button";
import { useBookmark, useBookmarkMutation } from "@/features/contest/useBookmark";
import { StarOutlined } from "@ant-design/icons";

interface DetailInfoProps {
  data?: Contest;
}

function DetailInfo({ data }: DetailInfoProps) {
  if (!data) {
    return <div>로딩 중...</div>;
  }
  const { bookmarkCount, isBookmarked } = useBookmark(data.id);
  const { mutate, isPending } = useBookmarkMutation(data.id);

  const shareButtons = [
    {
      name: "Facebook",
      icon: "📘",
      color: "bg-blue-600",
      url: (pageUrl: string) =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`,
    },
    {
      name: "Twitter",
      icon: "🐦",
      color: "bg-sky-500",
      url: (pageUrl: string) =>
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent("이 페이지를 공유해요!")}`,
    },
    {
      name: "Naver",
      icon: "N",
      color: "bg-green-500",
      url: (pageUrl: string) =>
        `https://share.naver.com/web/shareView.nhn?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent("페이지 제목")}`,
    },
  ];

  return (
    <div className="rounded-lg shadow-sm border p-6 mb-20">
      <div className="flex items-start justify-between">
        {/* dday */}
        <div className="mt-2">
          <Badge intent="orange">D - {countDate(data.end_date.toString())}</Badge>
        </div>

        {/* 조회수 찜 */}
        <div className="flex items-center gap-4">
          <button
            className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-md transition-colors"
            onClick={mutate}
            disabled={isPending}
          >
            <div
              className={`w-8 h-8 bg-gray-200 ${isBookmarked ? "text-yellow-400" : "text-brand-primary"} rounded-full flex items-center justify-center`}
            >
              <StarOutlined />
            </div>
            <span className="text-xs text-gray-600">{bookmarkCount ? bookmarkCount : 0}</span>
          </button>
          <button className="flex flex-col items-center gap-1 p-2 hover:bg-gray-50 rounded-md transition-colors">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              👀
            </div>
            <span className="text-xs text-gray-600">356</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* 왼쪽: 이미지 */}
        <div className="flex justify-center flex-shrink-0">
          <div className="w-72 h-96 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={data.img ?? undefined}
              alt={data.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* 오른쪽: 정보 */}
        <div className="flex-1">
          {/* 제목 */}
          <div className="flex justify-between items-start mb-6">
            <h1 className="text-2xl font-bold leading-tight">{data.title}</h1>
          </div>

          {/* 정보 테이블 */}
          <div className="space-y-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 왼쪽 컬럼 */}
              <div className="space-y-4">
                <InfoRow label="주최사" value={data.organizer} />
                <InfoRow label="기업형태" value={data.organizer_type} />
                <InfoRow label="시상규모" value={data.prize} />
                <InfoRow label="추가혜택" value={data.benefits} />
                <InfoRow
                  label="관심분야"
                  value={
                    <div className="flex gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                        {data.contest_tag}
                      </span>
                    </div>
                  }
                />
                <InfoRow
                  label="활동분야"
                  value={
                    <div className="flex gap-2 text-gray-700">
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">서포터즈</span>
                      <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">기자단</span>
                    </div>
                  }
                />
              </div>

              {/* 오른쪽 컬럼 */}
              <div className="space-y-4">
                <InfoRow label="접수대상" value={data.participants} />
                <InfoRow label="접수기간" value={`${data.start_date} ~ ${data.end_date}`} />
                <InfoRow
                  label="홈페이지"
                  value={
                    <a
                      href={data.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline block truncate"
                    >
                      {data.homepage}
                    </a>
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-8 md:gap-8 md:mb-6 items-center flex-wrap">
            {/* 지원하기 */}
            <Button
              intent="sky"
              type="button"
              size="lg"
              onClickFnc={() => {
                if (data.homepage) {
                  window.open(data.homepage, "_blank", "noopener,noreferrer");
                }
              }}
            >
              홈페이지 지원
            </Button>

            {/* 공유하기 */}
            <div className="flex gap-2">
              {shareButtons.map(button => (
                <button
                  key={button.name}
                  className={`w-10 h-10 rounded-md ${button.color} text-white flex items-center justify-center hover:opacity-80 transition-opacity`}
                  title={button.name}
                  onClick={() => {
                    const url = window.location.href; // 현재 페이지 URL
                    window.open(button.url(url), "_blank", "noopener,noreferrer");
                  }}
                >
                  {button.icon}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 정보 행 컴포넌트
interface InfoRowProps {
  label: string;
  value: React.ReactNode;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex w-full">
      <dt className="w-20 flex-shrink-0 text-sm font-medium">{label}</dt>
      <dd className="text-sm flex-1 truncate">{value}</dd>
    </div>
  );
}

export default DetailInfo;
