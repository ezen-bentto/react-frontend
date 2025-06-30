// src/contexts/AuthContext.tsx

import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  id: number;
  nickname: string;
  userType: string; // '1': 개인, '2': 기업, '3': 관리자
  email?: string;
  profileImage?: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  // eslint-disable-next-line no-unused-vars
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
interface DecodedToken {
  userId: number;
  nickname: string;
  userType: string;
  email?: string;
  profileImage?: string;
}

// 상대 경로를 절대 경로 URL로 변환하는 헬퍼 함수
const createFullImageUrl = (path: string | null | undefined): string | undefined => {
  if (path && path.startsWith("/")) {
    return `${import.meta.env.VITE_API_URL}${path}`;
  }
  // 이미 전체 주소이거나, null/undefined이면 그대로 반환
  return path ?? undefined;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedUser: DecodedToken = jwtDecode(token);
        setUser({
          id: Number(decodedUser.userId),
          nickname: decodedUser.nickname,
          userType: decodedUser.userType,
          email: decodedUser.email,
          profileImage: createFullImageUrl(decodedUser.profileImage),
        });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
      }
    }
  }, []);

  const login = (accessToken: string, _refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", _refreshToken);
    try {
      const decodedUser: DecodedToken = jwtDecode(accessToken);
      setUser({
        id: Number(decodedUser.userId),
        nickname: decodedUser.nickname,
        userType: decodedUser.userType,
        email: decodedUser.email,
        profileImage: createFullImageUrl(decodedUser.profileImage),
      });
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Invalid token on login:", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
