import MainBanner from "../../components/home/MainBanner";

const Home = () => {
  return (
    <div className="flex justify-center flex-col mt-20  items-center gap-4">
      {/* 메인배너 */}
      <div className="main-banner top-0 left-0">
        <h2 className="sr-only">메인 슬라이더</h2>
        <MainBanner />
      </div>
      <div className="main-contents mt-180">
        {/* 통합검색 넣을까 말까 */}
        {/* 공모전 */}
        <div className="">공모전이랍니다~</div>
        {/* 청년정책 */}
        <div className="">청년정책이랍니다~</div>
        {/* 커뮤니티 */}
        <div className="">커뮤니티이랍니다~</div>
      </div>
    </div>
  );
};

export default Home;
