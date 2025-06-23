// src/components/common/PublicRoute.tsx

import { type ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    alert("이미 로그인한 상태입니다.");
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
