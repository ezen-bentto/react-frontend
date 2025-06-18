import { useEffect, useState } from "react";
import { fixedCircleBtn } from "../style/fixedCircleBtn";
import { UpOutlined } from "@ant-design/icons";

/**
 *
 * TopButton 컴포넌트
 * 화면 우측 하단에 위치하며, 스크롤 위치가 일정 이상일 때 나타나고 클릭 시 최상단으로 이동
 * `cva`를 통해 보여짐 여부만 제어하며, 배경 이미지와 스타일은 Tailwind로 구성
 *
 * @function TopButton.tsx
 * @date 2025/06/11
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/11           이철욱               최초 작성 - cva 기반 마이그레이션
 *
 * @returns 화면 우측 하단 고정 Top 버튼
 */

const TopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      setVisible(scrollTop > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleClick}
      aria-label="Scroll to top"
      className={fixedCircleBtn({ hidden: !visible, color: "top" })}
    >
      <UpOutlined className="text-4xl !text-white " />
    </button>
  );
};

export default TopButton;
