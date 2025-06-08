import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import TextSlider from "./TextSlider";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const MainBanner = () => {
  // const { data: items, isLoading, isError } = useMainSlides();
  const [activeIndex, setActiveIndex] = useState(0);

  // if (isLoading) return <div>로딩 중...</div>;
  // if (isError || !items) return <div>에러 발생</div>;
  // bg-amber-500 bg-cyan-950 bg-accent-sky
  const items = useMemo(() => {
    const data = [
      {
        image: "../../../public/images/contest-1.png",
        bgColor: "bg-[#074B72]",
        duration: "2025.06.04 ~ 2025.06.24",
        title: "농촌만들기 \n아이디어 공모전 \n2025년 제 10회 \n대학생이 간다",
        summary: "안녕하세요 반가워요",
      },
      {
        image: "../../../public/images/contest-1.png",
        bgColor: "bg-[#074B72]",
        duration: "2025-05-21 ~",
        title: "청년들을 위한\n통합 페이지\n청바지2",
        summary: "안녕하세요 반가워요",
      },
      {
        image: "../../../public/images/contest-1.png",
        bgColor: "bg-[#34b934]",
        duration: "2025-05-21 ~",
        title: "청년들을 위한\n통합 페이지\n청바지3",
        summary: "안녕하세요 반가워요",
      },
    ];

    return data.map(item => ({ ...item, id: uuidv4() }));
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
        <SwiperSlide key={item.id}>
          <div className={`w-full h-[60vh] overflow-hidden px-[10%] flex-default ${item.bgColor}`}>
            <div className="w-full max-w-[1400px] flex-default md:flex-row flex-col gap-4">
              <img
                className="order-1 md:order-2 w-auto md:w-1/2"
                src={item.image}
                alt={item.title}
              />
              <TextSlider slides={items} activeIndex={activeIndex} />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default MainBanner;
