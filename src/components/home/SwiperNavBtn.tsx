import { ArrowRightOutlined } from "@ant-design/icons";
interface SwiperNavBtnProps {
  navName: string;
}

const SwiperNavBtn = ({ navName }: SwiperNavBtnProps) => {
  return (
    <div className="flex gap-4">
      <div className={`flex-default ${navName}-button-prev nav-btn cursor-pointer w-8 rotate-180`}>
        <ArrowRightOutlined />
      </div>
      <div className={`flex-default ${navName}-button-next nav-btn cursor-pointer w-8`}>
        <ArrowRightOutlined />
      </div>
    </div>
  );
};

export default SwiperNavBtn;
