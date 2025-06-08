import ContestSlider from "@/components/home/ContestSlider";
import MainBanner from "../../components/home/MainBanner";
import Card from "@/components/shared/Card";
import ListItem from "@/components/shared/ListItem";

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
      <section className="main-policy w-full">
        <Card dday="20" text="테스트 정책 text" title="텍스트정책 제목" id={2} />
      </section>
      <section className="main-community w-full">
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
        />
        <ListItem
          type="policy"
          region="전국"
          linkSrc="/"
          comment={2}
          description="테스트"
          likes={123}
          title="테스트 제목"
          writer="작성자"
          intent={"default"}
          size={"md"}
        />
      </section>
    </div>
  );
};

export default Home;
