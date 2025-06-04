import { v4 as uuidv4 } from "uuid";
// interface MainBannerProps {}

import { Carousel } from "antd";
import { useState } from "react";
import TextSlider from "./TextSlider";

const MainBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  // api 로 백에서 슬라이드 데이터를 받는다고 가정
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

  //uuidv4 로 id 값 박아줘잇
  const items = data.map(item => ({ ...item, id: uuidv4() }));

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
            <span className="text-white">{item.title}</span>
          </div>
        ))}
      </Carousel>

      <TextSlider slides={items} activeIndex={activeIndex} />
    </div>
  );
};
export default MainBanner;
