import ContestSlider from "@/components/home/ContestSlider";
import MainBanner from "../../components/home/MainBanner";

const Home = () => {
  return (
    <div className="flex justify-center flex-col mt-20  items-center gap-4">
      {/* 메인배너 */}
      <div className="main-banner top-0 left-0">
        <h2 className="sr-only">메인 슬라이더</h2>
        <MainBanner />
      </div>
      <div className="main-contents mt-20">
        <ContestSlider />
      </div>
    </div>
  );
};

export default Home;
