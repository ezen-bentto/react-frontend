import { v4 as uuidv4 } from "uuid";
// interface MainBannerProps {}

import { Carousel } from "antd";
import { useMemo, useState } from "react";
import TextSlider from "./TextSlider";

const MainBanner = () => {
  // const { data: items, isLoading, isError } = useMainSlides();
  const [activeIndex, setActiveIndex] = useState(0);

  // if (isLoading) return <div>로딩 중...</div>;
  // if (isError || !items) return <div>에러 발생</div>;

  const items = useMemo(() => {
    const data = [
      {
        image: "#",
        bgColor: "bg-amber-500",
        duration: "2025-05-21 ~",
        title: "청년들을 위한\n통합 페이지\n청바지1",
        summary: "안녕하세요 반가워요",
      },
      {
        image: "#",
        bgColor: "bg-accent-sky",
        duration: "2025-05-21 ~",
        title: "청년들을 위한\n통합 페이지\n청바지2",
        summary: "안녕하세요 반가워요",
      },
      {
        image: "#",
        bgColor: "bg-cyan-950",
        duration: "2025-05-21 ~",
        title: "청년들을 위한\n통합 페이지\n청바지3",
        summary: "안녕하세요 반가워요",
      },
    ];

    return data.map(item => ({ ...item, id: uuidv4() }));
  }, []); // 빈 배열로 메모이제이션 (최초 렌더링 시 한 번만 생성)

  return (
    <div className="relative w-full">
      <Carousel
        className="w-full max-w-screen mx-auto"
        autoplay
        arrows
        effect="fade"
        draggable={true}
        beforeChange={(_, next) => setActiveIndex(next)}
      >
        {items.map(item => (
          <div
            key={item.id}
            className={`w-full h-[320px] flex items-center justify-center ${item.bgColor}`}
          >
            <span className="text-white whitespace-pre-line">{item.title}</span>
          </div>
        ))}
      </Carousel>

      <TextSlider slides={items} activeIndex={activeIndex} />
    </div>
  );
};

export default MainBanner;
