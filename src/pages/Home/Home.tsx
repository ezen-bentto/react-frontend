import ContestSlider from "@/components/home/ContestSlider";
import MainBanner from "../../components/home/MainBanner";
import PopularContestList from "@/components/home/PopularContestList";
import PolicySider from "@/components/home/PolicySider";
import CommunityList from "../Community/CommunityList";
const Home = () => {
  return (
    <div className="flex justify-center flex-col mt-19 md:mt-20  items-center gap-8">
      {/* 메인배너 */}
      <section className="main-banner">
        <h2 className="sr-only">메인 슬라이더</h2>
        <MainBanner />
      </section>

      <section className="main-contents mt-20 w-full">
        <ContestSlider />
      </section>
      <section>
        <PopularContestList />
      </section>

      <section className="main-policy w-full">
        <PolicySider />
      </section>
      <section className="w-full">
        <CommunityList />
      </section>
    </div>
  );
};

export default Home;
