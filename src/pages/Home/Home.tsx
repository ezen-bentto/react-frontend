import ContestSlider from "@/components/home/ContestSlider";
import MainBanner from "../../components/home/MainBanner";
import Fillter from "@/components/shared/Fillter";
import { filterData } from "@/constants/filterData";
import WriteButton from "@/components/shared/WriteButton";

const Home = () => {
  return (
    <div className="flex justify-center flex-col mt-19 md:mt-20  items-center gap-4">
      {/* 메인배너 */}
      <section className="main-banner">
        <h2 className="sr-only">메인 슬라이더</h2>
        <MainBanner />
      </section>
      <section className="main-contents mt-20 w-full">
        <ContestSlider />
      </section>

      <section className="main-community w-full">
        <Fillter
          filters={filterData}
          onFilterChange={(group, value) => console.info(group, value)}
          onSearchSubmit={() => {}}
        />
      </section>
      <WriteButton />
    </div>
  );
};

export default Home;
