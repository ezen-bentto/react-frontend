import Title from "../shared/Title";
import SwiperNavBtn from "./SwiperNavBtn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import axios from "axios";
import ListItem from "../shared/ListItem";
import { v4 as uuidv4 } from "uuid";

interface PolicyItem {
  title: string;
  category: string;
  region: string;
  description: string;
  fullLink: string;
  link: string;
}

const PolicySider = () => {
  const [items, setItems] = useState<PolicyItem[]>([]);

  const fetchData = async () => {
    try {
      const response = await axios.get<Omit<PolicyItem, "id">[]>("/data/korea-policy-list.json");
      const slicedWithId = response.data.slice(0, 10).map(item => ({
        ...item,
        id: uuidv4(),
      }));
      setItems(slicedWithId);
    } catch (error) {
      console.error("정책 데이터 로딩 오류:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex-default py-4">
        <Title linkSrc="/policy" titleText="지원 할 수 있는 정책" />
        <SwiperNavBtn navName={"policy"} />
      </div>
      <Swiper
        modules={[Navigation]}
        navigation={{
          nextEl: ".policy-button-next",
          prevEl: ".policy-button-prev",
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
        {items &&
          items.map((item, idx) => (
            <SwiperSlide key={idx}>
              <ListItem
                type="policy"
                linkSrc={item.fullLink}
                description={item.description}
                title={item.title}
                intent={"default"}
                size={"md"}
                region={item.region}
              />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default PolicySider;
