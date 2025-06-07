import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Card from "../shared/Card";
import Title from "../shared/Title";
import SwiperNavBtn from "./SwiperNavBtn";

const ContestSlider = () => {
  const items = [0, 0, 0, 0, 0, 0];

  return (
    <div className="w-full max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex-default py-4">
        <Title linkSrc="/contest" titleText="이런 공모전 어때요" />
        <SwiperNavBtn />
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".contest-button-next",
          prevEl: ".contest-button-prev",
        }}
        spaceBetween={16}
        loop={true}
        breakpoints={{
          1280: { slidesPerView: 4 },
          1024: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          640: { slidesPerView: 1 },
        }}
      >
        {items.map((_, i) => (
          <SwiperSlide key={i}>
            <Card
              dday="20"
              id={i}
              img="https://api.linkareer.com/attachments/583730"
              text="설명 텍스트"
              title={`공모전 ${i + 1}`}
              intent="neutral"
              size="sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ContestSlider;
