import { create } from "zustand";
import {
  getNickName,
  getToken,
  removeNickName,
  removeToken,
  removeUserId,
  setNickName,
  setToken,
  setUserId,
} from "@/features/Auth/token";

interface StoreState {
  nickName: string | null;
  isLoggedIn: boolean; // 상태 변수(state)
  // eslint-disable-next-line no-unused-vars
  storeLogin: (token: string, name: string, userId: number) => void;
  storeLogout: () => void;
}

export const useAuthStore = create<StoreState>(set => ({
  nickName: getToken() ? getNickName() : null,
  isLoggedIn: getToken() ? true : false, // 초기값 설정
  storeLogin: (token: string, name: string, userId: number) => {
    set({ isLoggedIn: true });
    setNickName(name);
    setUserId(`${userId}`);
    setToken(token);
  },
  storeLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
    removeNickName();
    removeUserId();
  },
}));
