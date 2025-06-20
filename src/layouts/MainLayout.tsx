import Footer from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import TopButton from "@/components/shared/TopButton";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="theme-text theme-bg w-full overflow-hidden font-pretendard">
      <Header />
      <main className="px-6 py-4 max-w-[1400px] mx-auto">
        <Outlet />
        <TopButton />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
