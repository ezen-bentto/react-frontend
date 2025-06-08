import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Card from "../shared/Card";
import Title from "../shared/Title";
import SwiperNavBtn from "./SwiperNavBtn";
import axios from "axios";
import { useEffect, useState } from "react";
import countDate from "@/utils/countDate";

interface ContestItem {
  id: number;
  writer_id: number;
  title: string;
  img: string;
  organizer: string;
  organizer_type: string;
  participants: string;
  prize: string;
  start_date: string;
  end_date: string;
  homepage: string;
  benefits: string;
  contest_tag: string;
  article: string;
}

const ContestSlider = () => {
  const [items, setItems] = useState<ContestItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<ContestItem[]>("/data/contests-list.json");
      const slicedWithId = response.data.slice(0, 10);
      setItems(slicedWithId);
    } catch (error) {
      console.error("공모전 데이터 로딩 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-[1400px] mx-auto overflow-hidden">
      <div className="flex-default py-4">
        <Title linkSrc="/contest" titleText="이런 공모전 어때요" />
        <SwiperNavBtn navName="contest" />
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
        {items.map(item => (
          <SwiperSlide key={item.id}>
            <Card
              dday={countDate(item.end_date).toString()}
              id={item.id}
              img={item.img}
              text={item.organizer}
              title={item.title}
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
