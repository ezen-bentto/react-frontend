import ContestSlider from "@/components/home/ContestSlider";
import MainBanner from "../../components/home/MainBanner";
import ListItem from "@/components/shared/ListItem";
import PolicySider from "@/components/home/PolicySider";
import PopularContestList from "@/components/home/PopularContestList";

const Home = () => {
  return (
    <div className="flex justify-center flex-col mt-19 md:mt-20  items-center gap-4">
      {/* 메인배너 */}
      <section className="main-banner">
        <h2 className="sr-only">메인 슬라이더</h2>
        <MainBanner />
      </section>

      <section>
        <PopularContestList />
      </section>
      <section className="main-contents mt-20 w-full">
        <ContestSlider />
      </section>
      <section className="main-policy w-full">
        <PolicySider />
      </section>
      <section className="main-community w-full flex justify-start flex-col gap-4">
        <ListItem
          type="community"
          linkSrc="/"
          comment={2}
          description="테스트"
          likes={123}
          title="테스트 제목"
          writer="작성자"
          intent={"default"}
          size={"lg"}
          endDate={"2025-06-30"}
          category="공모전"
        />
      </section>
    </div>
  );
};

export default Home;
