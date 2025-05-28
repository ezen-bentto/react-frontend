import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AlertModal from "@/components/ui/AlertModal";
import Card from "@/components/ui/Card";

const Home = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-4">
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
    </div>
  );
};

export default Home;
