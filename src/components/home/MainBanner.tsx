import { v4 as uuidv4 } from "uuid";
import { useMemo, useState } from "react";
import TextSlider from "./TextSlider";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const items = useMemo(() => {
    const data = [
      {
        id: 106,
        image: "/images/banner_1.png",
        bgColor: "bg-[#f2f2f2]",
        textColor: "brand-primary",
        duration: "2025.05.28 ~ 2025.06.26",
        title: "대구광역시 신청사 건립사업 국제설계 공모",
        summary: "대구광역시 신청사 건립사업 국제설계 공모",
      },
      {
        id: 191,
        image: "https://api.linkareer.com/attachments/581642",
        bgColor: "bg-[#000000]",
        textColor: "white",
        duration: "2025.06.23 ~ 2025.07.11",
        title: "[오비맥주 크리에이티브 공모전] Creative X Challengers 참가자 모집",
        summary: "OB맥주 브랜드 제품(카스, 카스 제로, 한맥, 스텔라 등) 캠페인 아이디어 제안",
      },
      {
        id: 71,
        image: "/images/banner_2.png",
        bgColor: "bg-[#1754A5]",
        textColor: "white",
        duration: "2025.06.05 ~ 2025.07.18",
        title: "제3회 학교안전사고 데이터 분석·활용 경진대회",
        summary: "학교안전사고 예방 관련 자유주제",
      },
    ];

    return data.map(item => ({ ...item, renderId: uuidv4() }));
  }, []); // 빈 배열로 메모이제이션 (최초 렌더링 시 한 번만 생성)

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Navigation, Pagination]}
      autoplay={{ delay: 3000 }}
      navigation
      effect="slide"
      loop={true}
      onSlideChange={swiper => {
        setActiveIndex(swiper.realIndex);
      }}
      scrollbar={{ draggable: true }}
      pagination={{
        type: "progressbar",
      }}
      className="max-w-dvw"
    >
      {items.map(item => (
        <SwiperSlide key={item.renderId}>
          <Link to={`/contest/${item.id}`}>
            <div
              className={`w-full max-h-[800px] h-[80vh] overflow-hidden px-[20%] flex-default ${item.bgColor}`}
            >
              <div className="w-full max-w-[1400px] flex-default md:flex-row flex-col gap-4">
                <img
                  className="order-1 md:order-2 w-full md:w-1/2  flex-1"
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
