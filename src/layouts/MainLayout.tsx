import Footer from "@/components/shared/Footer";
import { Header } from "@/components/shared/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="dark:text-white bg-white dark:bg-brand-primary">
      <Header />
      <main className="px-6 py-4 max-w-[1400px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
