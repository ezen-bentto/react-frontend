import { ArrowRightOutlined } from "@ant-design/icons";

const SwiperNavBtn = () => {
  return (
    <div className="flex gap-4">
      <div className="flex-default contest-button-prev nav-btn cursor-pointer w-8 rotate-180">
        <ArrowRightOutlined />
      </div>
      <div className="flex-default contest-button-next nav-btn cursor-pointer w-8">
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default SwiperNavBtn;
