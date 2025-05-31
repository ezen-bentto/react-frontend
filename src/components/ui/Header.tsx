import { useEffect, useState } from "react";
import {
  hamBtn,
  headerLinkHover,
  headerMainLogo,
  headerVariants,
  hedaerWrap,
  mobileMenu,
} from "@/components/style/header";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";

interface HeaderMenu {
  name: string;
  src: string;
  id: string;
}

const headerMenus: HeaderMenu[] = [
  { name: "공모전", src: "/contest", id: "" },
  { name: "청년정책", src: "/policy", id: "" },
  { name: "통계", src: "#", id: "" },
  { name: "커뮤니티", src: "/community", id: "" },
];

interface HeaderProps {
  opacityEffect?: boolean;
}

export const Header = ({ opacityEffect = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("isLoggedIn"));

  const items = headerMenus.map(item => ({ ...item, id: uuidv4() }));

  useEffect(() => {
    if (!opacityEffect) {
      setIsScrolled(true);
      return;
    }

    const onScroll = () => {
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [opacityEffect]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginProvider");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    window.location.href = "/pages/main/main.html";
  };

  return (
    <header className={headerVariants({ scrolled: isScrolled })}>
      <div className={hedaerWrap()}>
        <h1 className={headerMainLogo()}>
          <Link to={"/"}>청바지</Link>
        </h1>

        <nav className="hidden md:flex gap-6 flex-1 justify-center text-base font-bold">
          {items.map(item => (
            <Link key={item.id} to={item.src} className={headerLinkHover({ highlight: true })}>
              {item.name}
            </Link>
          ))}
        </nav>

        <nav className="hidden md:flex gap-4 text-sm text-gray-500">
          {!isLoggedIn ? (
            <>
              <Link to={"/login"} className={headerLinkHover()}>
                로그인
              </Link>
              <Link to={"/join"} className={headerLinkHover()}>
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to={"/mypage"} className={headerLinkHover()}>
                마이페이지
              </Link>
              <Link to={"/logout"} className={headerLinkHover()}>
                로그아웃
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsMobileOpen(!isMobileOpen)}>
          <div className={`${hamBtn()} ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`${hamBtn()} ${isMobileOpen ? "opacity-0" : ""}`} />
          <div className={`${hamBtn()} ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className={mobileMenu({ theme: "w" })}>
          {!isLoggedIn ? (
            <>
              <Link to={"/login"} className={headerLinkHover()}>
                로그인
              </Link>
              <Link to={"/join"} className={headerLinkHover()}>
                회원가입
              </Link>
            </>
          ) : (
            <>
              <Link to={"/mypage"} className={headerLinkHover()}>
                마이페이지
              </Link>
              <Link to={"/logout"} className={headerLinkHover()} onClick={handleLogout}>
                로그아웃
              </Link>
            </>
          )}
          {items.map(item => (
            <Link key={item.id} to={item.src} className={headerLinkHover({ highlight: true })}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};
