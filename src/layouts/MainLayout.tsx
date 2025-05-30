import Footer from "@/components/ui/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>헤더</header>
      <main className="px-6 py-4 max-w-[1400px] mx-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
