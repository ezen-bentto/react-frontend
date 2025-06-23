// src/routers/ProtectedRoute.tsx

import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: string[]; // '1', '2', '3' 과 같은 역할 배열
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { isLoggedIn, user } = useAuth();
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인하지 않았다면 로그인 페이지로
    // 현재 페이지 위치를 state로 넘겨서, 로그인 성공 후 원래 있던 페이지로 돌아오게
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 특정 역할만 접근 가능하도록 설정했다면, 현재 유저의 역할과 비교
  if (allowedRoles && user && !allowedRoles.includes(user.userType)) {
    // 권한이 없다면 홈페이지나 접근 거부 페이지로
    alert("이 페이지에 접근할 권한이 없습니다.");
    return <Navigate to="/" replace />;
  }

  // 모든 검사를 통과했다면, 자식 컴포넌트(원래 가려던 페이지)로
  return <>{children}</>;
};
