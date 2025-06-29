import type { CountDownProps } from "@/types/communityContentType";
import { ClockCircleOutlined } from "@ant-design/icons";

const CountdownBox = ({ countdown }: CountDownProps) => {
  const isExpired = countdown.includes("모집이 종료되었습니다") || countdown.includes("모집 종료");

  return (
    <div className="mb-6 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <ClockCircleOutlined />
          <span className="font-semibold">모집 마감까지</span>
        </div>
        <div className={`text-2xl font-bold tracking-wider ${isExpired ? "text-red-200" : ""}`}>
          {countdown}
        </div>
      </div>
    </div>
  );
};

export default CountdownBox;
