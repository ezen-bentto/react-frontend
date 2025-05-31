import Footer from "@/components/ui/Footer";
import { Header } from "@/components/ui/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <main className="px-6 py-4 max-w-[1400px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
