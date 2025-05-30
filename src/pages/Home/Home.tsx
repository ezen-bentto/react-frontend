import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AlertModal from "@/components/ui/AlertModal";
import Card from "@/components/ui/Card";
import ListItem from "@/components/ui/ListItem";
import SelectInput from "@/components/ui/SelectInput";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import Input from "@/components/ui/input";
import Avatar from "@/components/ui/Avatar";

const Home = () => {
  return (
    <div className="flex justify-center flex-col  items-center gap-4">
      <h1>홈 페이지</h1>
      <h2>버튼들</h2>
      <Button intent="primary" size="lg">
        btn
      </Button>
      <Button intent="sky" size="sm">
        btn
      </Button>
      <Button intent="orange" size="lg">
        btn
      </Button>

      <hr />
      <h2>뱃지</h2>
      <Badge intent="orange" size="lg">
        D-999
      </Badge>

      <hr />
      <AlertModal>안냥</AlertModal>

      <hr />
      <h2>카드</h2>
      <div className="flex flex-col sm:flex-row gap-8 ">
        <Card
          id={23}
          dday="D-999"
          img="https://api.linkareer.com/attachments/572054"
          text="안녕이것은 설명"
          title="이것은 타이틀"
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          id={23}
          dday="D-999"
          img="https://api.linkareer.com/attachments/572059"
          text="안녕이것은 설명"
          title="이것은 타이틀"
          intent={"neutral"}
          size={"lg"}
        />
        <Card
          id={23}
          dday="D-999"
          img="https://api.linkareer.com/attachments/572130"
          text="안녕이것은 설명"
          title="이것은 타이틀"
          intent={"neutral"}
          size={"lg"}
        />
      </div>

      <hr />
      <h2>리스트</h2>
      <ul className="list bg-base-100 rounded-box w-full shadow-md ">
        <ListItem
          description="이거슨 설명"
          title="이런 저런 아주 멋진일 하실 참여자를 모집합니다."
          writer="김독자"
          intent={"primary"}
          size={"lg"}
          comment={66}
        />
      </ul>

      <hr />

      <hr />
      <h2>입력값</h2>
      <Input legendText="적어라 너의 이름을" />
      <SearchInput />

      <hr />
      <h2>정렬</h2>
      <SelectInput
        options={["최신순", "인기순", "마감순"]}
        placeholder="Pick a color"
        intent="outline"
        size="lg"
      />

      <hr />
      <h2>페이지네이션</h2>
      <Pagination
        currentPage={22}
        onPrevious={() => {}}
        onNext={() => {}}
        intent="primary"
        size="lg"
      />

      <hr />
      <Avatar
        src="https://img.daisyui.com/images/profile/demo/gordon@192.webp"
        alt="아바타"
        shape="circle"
        size="lg"
      />
    </div>
  );
};

export default Home;
