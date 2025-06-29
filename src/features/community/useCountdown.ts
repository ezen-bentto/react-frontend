import { useEffect, useState } from "react";

export const useCountdown = (endDate?: string) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    if (!endDate) return;

    const calculate = () => {
      const end = new Date(endDate);
      const now = new Date();

      if (isNaN(end.getTime())) {
        setCountdown("날짜 형식 오류");
        return;
      }

      // 마감일을 23:59:59로 설정
      end.setHours(23, 59, 59, 999);

      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setCountdown("모집이 종료되었습니다.");
        return;
      }

      const totalSec = Math.floor(diff / 1000);
      const days = Math.floor(totalSec / (60 * 60 * 24));
      const hours = String(Math.floor((totalSec % (60 * 60 * 24)) / (60 * 60))).padStart(2, "0");
      const minutes = String(Math.floor((totalSec % (60 * 60)) / 60)).padStart(2, "0");
      const seconds = String(totalSec % 60).padStart(2, "0");

      setCountdown(`${days}일 ${hours}시간 ${minutes}분 ${seconds}초`);
    };

    calculate(); // 최초 실행
    const timer = setInterval(calculate, 1000); // 1초마다 갱신

    return () => clearInterval(timer);
  }, [endDate]);

  return countdown;
};