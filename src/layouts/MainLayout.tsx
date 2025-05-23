import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div>
      <header>헤더</header>
      <main>
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};

export default MainLayout;
