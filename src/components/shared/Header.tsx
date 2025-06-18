import { useEffect, useState, useMemo } from "react";
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
import { ThemeToggle } from "./ThemeToggle";
import { useThemeStore } from "@/features/common/themeStore";

/**
 *
 * header 컴포넌트
 * 웹 최상단에 위치하는 컴포넌트
 * 모바일이면 중앙 nav 메뉴가 사라지고 햄버거 버튼이 활성화된다.
 * 다크모드 버튼 활성화를 시킬 수 있는 toggle 버튼이 있다.
 * 현재는 쓰이지 않지만 스크롤 위치에 따라 header 가 투명화되는 기능이 있다.
 *
 *
 * @function Header.tsx
 * @date 2025/05/31
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/05/31           이철욱               신규작성
 *        2025/06/10           김혜미               커뮤니티 메뉴 분리
 *
 * @param opacityEffect 높이에 따른 header 컴포넌트 투명화 매개변수다.
 * 바닐라 프로젝트 초창기에 구현하였으나 디자인상 불필요하여 현재는 쓰이지 않는다.
 */

interface HeaderMenu {
  name: string;
  src: string;
  id: string;
  subMenus?: { name: string; src: string }[];
}

const headerMenus: HeaderMenu[] = [
  { name: "공모전", src: "/contest", id: "" },
  { name: "청년정책", src: "/policy", id: "" },
  {
    name: "커뮤니티",
    src: "#",
    id: "",
    subMenus: [
      { name: "공모전", src: "/community/list?communityType=1" },
      { name: "스터디", src: "/community/list?communityType=2" },
      { name: "자유", src: "/community/list?communityType=3" },
    ],
  },
];

interface HeaderProps {
  opacityEffect?: boolean;
}

export const Header = ({ opacityEffect = false }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("isLoggedIn"));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { initTheme } = useThemeStore();

  // UUID 생성을 useMemo로 최적화하여 리렌더링 시에도 동일한 ID 유지
  const items = useMemo(() => headerMenus.map(item => ({ ...item, id: uuidv4() })), []);

  // opacityEffect 가 활성화될 경우 쓰이는 useEffect
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

  // 로그아웃시 localstorage 삭제
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loginProvider");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    window.location.href = "/pages/main/main.html";
  };

  // 사용자가 설정한 테마값
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <header className={headerVariants({ scrolled: isScrolled })}>
      <div className={hedaerWrap()}>
        <h1 className={headerMainLogo()}>
          <Link to={"/"}>청바지</Link>
        </h1>

        <nav className="hidden md:flex gap-6 flex-1 justify-center text-base font-bold">
          {items.map(item => (
            <div
              key={item.id}
              className="relative group"
              onMouseEnter={() => {
                if (item.subMenus) {
                  setActiveDropdown(item.id);
                }
              }}
              onMouseLeave={() => {
                setActiveDropdown(null);
              }}
            >
              {item.subMenus ? (
                <div className={`${headerLinkHover({ highlight: true })} cursor-pointer`}>
                  {item.name}
                </div>
              ) : (
                <Link to={item.src} className={headerLinkHover({ highlight: true })}>
                  {item.name}
                </Link>
              )}

              {/* 드롭다운 메뉴 */}
              {item.subMenus && (
                <div
                  className={`absolute top-full left-0 bg-white border border-gray-200 rounded-md shadow-xl min-w-[140px] z-[9999] py-1 ${
                    activeDropdown === item.id ? "block" : "hidden"
                  }`}
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                  }}
                  onMouseEnter={() => {
                    setActiveDropdown(item.id);
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                  }}
                >
                  {item.subMenus.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.src}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <nav className="hidden items-center md:flex gap-4 text-sm ">
          {!isLoggedIn ? (
            <>
              <Link to={"/login"} className={headerLinkHover()}>
                로그인
              </Link>
              <Link to={"/signup"} className={headerLinkHover()}>
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
          <ThemeToggle />
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
              <Link to={"/signup"} className={headerLinkHover()}>
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
            <div key={item.id}>
              {item.subMenus ? (
                <>
                  <div className={`${headerLinkHover({ highlight: true })} cursor-default`}>
                    {item.name}
                  </div>
                  {item.subMenus.map((subItem, index) => (
                    <Link
                      key={index}
                      to={subItem.src}
                      className={`${headerLinkHover()} pl-4 text-sm`}
                    >
                      └ {subItem.name}
                    </Link>
                  ))}
                </>
              ) : (
                <Link to={item.src} className={headerLinkHover({ highlight: true })}>
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
};
