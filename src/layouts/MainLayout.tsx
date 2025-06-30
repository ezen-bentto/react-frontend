import Footer from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import TopButton from "@/components/shared/TopButton";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col w-full relative overflow-hidden theme-text theme-bg font-pretendard">
      <Header />
      <main className="px-6 py-4 max-w-[1400px] min-w-[360px] mx-auto">
        <Outlet />
        <TopButton />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
