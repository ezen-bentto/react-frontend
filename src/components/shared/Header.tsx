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
import { Link, NavLink, useLocation } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useThemeStore } from "@/features/common/themeStore";
import { useAuth } from "../../context/AuthContext";

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
 *        2025/06/20           이철욱               해당 페이지 접속시 해당 메뉴 버튼 활성화 표시
 *        2025/06/21           이철욱               커뮤니티 및 하위 메뉴에도 활성화 적용
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
  // 전역 상태를 가져옴
  const { isLoggedIn, logout } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("isLoggedIn"));
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { initTheme } = useThemeStore();

  const location = useLocation();
  const currentPath = location.pathname + location.search;

  const isSubActive = (src: string) => currentPath === src;

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

  // 로그아웃 핸들러가 전역 logout 함수를 호출하고, 홈으로 이동시킴
  const handleLogout = () => {
    logout();
  };

  // // 로그아웃시 localstorage 삭제
  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   localStorage.removeItem("loginProvider");
  //   localStorage.removeItem("userType");
  //   setIsLoggedIn(false);
  //   window.location.href = "/pages/main/main.html";
  // };

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
                <div
                  className={`${headerLinkHover({ highlight: location.pathname.includes("community") })} cursor-pointer`}
                >
                  {item.name}
                </div>
              ) : (
                <NavLink
                  to={item.src}
                  className={({ isActive }) =>
                    `${headerLinkHover({ highlight: isActive })} transition-colors`
                  }
                >
                  {item.name}
                </NavLink>
              )}

              {/* 드롭다운 메뉴 */}
              {item.subMenus && (
                <div
                  className={`absolute top-full left-0 theme-bg border box-border shadow-xl min-w-[140px] z-[9999] py-1 ${
                    activeDropdown === item.id ? "block" : "hidden"
                  }`}
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
                      className={`${headerLinkHover({ highlight: isSubActive(subItem.src) })} block px-4 py-2 text-sm duration-150`}
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
              <NavLink
                to={"/login"}
                className={({ isActive }) =>
                  `${headerLinkHover({ highlight: isActive })} transition-colors`
                }
              >
                로그인
              </NavLink>
              <NavLink
                to={"/signup"}
                className={({ isActive }) =>
                  `${headerLinkHover({ highlight: isActive })} transition-colors`
                }
              >
                회원가입
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to={"/mypage"}
                className={({ isActive }) =>
                  `${headerLinkHover({ highlight: isActive })} transition-colors`
                }
              >
                마이페이지
              </NavLink>
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `${headerLinkHover({ highlight: isActive })} transition-colors`
                }
                onClick={() => {
                  handleLogout();
                }}
              >
                로그아웃
              </NavLink>
            </>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile Toggle Button */}
        <div className="md:hidden cursor-pointer" onClick={() => setIsMobileOpen(prev => !prev)}>
          <div className={`${hamBtn()} ${isMobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`${hamBtn()} ${isMobileOpen ? "opacity-0" : ""}`} />
          <div className={`${hamBtn()} ${isMobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className={mobileMenu({ theme: "w" })}>
          <div className="flex flex-col gap-4">
            {!isLoggedIn ? (
              <>
                <NavLink
                  to={"/login"}
                  className={({ isActive }) =>
                    `${headerLinkHover({ highlight: isActive })} transition-colors`
                  }
                  onClick={() => setIsMobileOpen(prev => !prev)}
                >
                  로그인
                </NavLink>
                <NavLink
                  to={"/signup"}
                  className={({ isActive }) =>
                    `${headerLinkHover({ highlight: isActive })} transition-colors`
                  }
                  onClick={() => setIsMobileOpen(prev => !prev)}
                >
                  회원가입
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={"/mypage"}
                  className={({ isActive }) =>
                    `${headerLinkHover({ highlight: isActive })} transition-colors`
                  }
                  onClick={() => setIsMobileOpen(prev => !prev)}
                >
                  마이페이지
                </NavLink>

                <NavLink
                  to={"/"}
                  className={({ isActive }) =>
                    `${headerLinkHover({ highlight: isActive })} transition-colors`
                  }
                  onClick={() => {
                    setIsMobileOpen(prev => !prev);
                    handleLogout();
                  }}
                >
                  로그아웃
                </NavLink>
              </>
            )}
            {items.map(item => (
              <div key={item.id}>
                {item.subMenus ? (
                  <>
                    <div className={`${headerLinkHover({ highlight: false })} cursor-default`}>
                      {item.name}
                    </div>
                    {item.subMenus.map((subItem, index) => (
                      <Link
                        key={index}
                        to={subItem.src}
                        className={`${headerLinkHover({ highlight: false })} pl-4 text-sm`}
                        onClick={() => setIsMobileOpen(prev => !prev)}
                      >
                        └ {subItem.name}
                      </Link>
                    ))}
                  </>
                ) : (
                  <NavLink
                    to={item.src}
                    className={({ isActive }) =>
                      `${headerLinkHover({ highlight: isActive })} transition-colors`
                    }
                    onClick={() => setIsMobileOpen(prev => !prev)}
                  >
                    {item.name}
                  </NavLink>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end [margin-bottom:50%]">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
};
