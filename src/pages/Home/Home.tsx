import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AlertModal from "@/components/ui/AlertModal";

const Home = () => {
  return (
    <div className="flex  justify-between items-center flex-col gap-4">
      <h1>홈 페이지</h1>
      <Button className="bg-my-primary text-white w-2xs text-xl">로그인</Button>
      <Badge className="bg-my-orange text-white h-6  text-xl">D-999</Badge>
      <AlertModal className="bg-white p-4 text-my-primary">안냥</AlertModal>
    </div>
  );
};

export default Home;
