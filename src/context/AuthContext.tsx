// src/contexts/AuthContext.tsx

import { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthUser {
  id: number;
  nickname: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthUser | null;
  // eslint-disable-next-line no-unused-vars
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedUser: { userId: number; nickname: string } = jwtDecode(token);
        setUser({ id: Number(decodedUser.userId), nickname: decodedUser.nickname });
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.clear();
      }
    }
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    try {
      const decodedUser: { userId: number; nickname: string } = jwtDecode(accessToken);
      setUser({ id: Number(decodedUser.userId), nickname: decodedUser.nickname });
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
