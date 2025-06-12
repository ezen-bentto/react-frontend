import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import TextSlider from "./TextSlider";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => {
    const data = [
      {
        id: 3,
        image: "https://api.linkareer.com/attachments/561810",
        bgColor: "bg-[#074B72]",
        duration: "2025.06.04 ~ 2025.06.24",
        title: "제11회 교보손글씨대회",
        summary: "책 속 문장을 손글씨로 담아, 깊이 있는 감성을 나누어보세요!",
      },
      {
        id: 3,
        image: "https://api.linkareer.com/attachments/582062",
        bgColor: "bg-[#074B72]",
        duration: "2025-05-21 ~",
        title: "청년들을 위한\n통합 페이지\n청바지2",
        summary: "안녕하세요 반가워요",
      },
      {
        id: 3,
        image: "https://api.linkareer.com/attachments/563498",
        bgColor: "bg-[#34b934]",
        duration: "2025.05.01 ~ 2025.07.13",
        title: "제 6회 시험/연구용 유전자변형생물체 안전 콘텐츠 공모전(~7/13)",
        summary: "안녕하세요 반가워요",
      },
    ];

    return data.map(item => ({ ...item, renderId: uuidv4() }));
  }, []); // 빈 배열로 메모이제이션 (최초 렌더링 시 한 번만 생성)

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation]}
      autoplay={{ delay: 3000 }}
      navigation
      effect="slide"
      loop={true}
      onSlideChange={swiper => {
        setActiveIndex(swiper.realIndex);
      }}
      className="max-w-dvw"
    >
      {items.map(item => (
        <SwiperSlide key={item.renderId}>
          <Link to={`/constest/${item.id}`}>
            <div
              className={`w-full max-h-[800px] h-[80vh] overflow-hidden px-[20%] flex-default ${item.bgColor}`}
            >
              <div className="w-full max-w-[1400px] flex-default md:flex-row flex-col gap-4">
                <img
                  className="order-1 md:order-2 w-auto md:w-1/2"
                  src={item.image}
                  alt={item.title}
                />
                <TextSlider slides={items} activeIndex={activeIndex} />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainBanner;
