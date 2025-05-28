import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AlertModal from "@/components/ui/AlertModal";
import Card from "@/components/ui/Card";
import ListItem from "@/components/ui/ListItem";

const Home = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-4 p-8 max-w-7xl m-auto">
      <h1>홈 페이지</h1>
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
      <Badge intent="orange" size="lg">
        D-999
      </Badge>

      <hr />
      <AlertModal>안냥</AlertModal>

      <hr />

      <div className="flex gap-8">
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
      <ul className="list bg-base-100 rounded-box shadow-md w-full">
        <ListItem
          description="이거슨 설명"
          title="이런 저런 아주 멋진일 하실 참여자를 모집합니다."
          writer="김독자"
          intent={"primary"}
          size={"md"}
        />
        <ListItem
          description="이거슨 설명"
          title="이런 저런 아주 멋진일 하실 참여자를 모집합니다."
          writer="김독자"
          intent={"primary"}
          size={"md"}
        />
        <ListItem
          description="이거슨 설명"
          title="이런 저런 아주 멋진일 하실 참여자를 모집합니다."
          writer="김독자"
          intent={"primary"}
          size={"md"}
        />
      </ul>

      <hr />
    </div>
  );
};

export default Home;
