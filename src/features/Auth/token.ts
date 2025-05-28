export const getNickName = () => {
  const userName = localStorage.getItem("nickName");
  return userName;
};

export const setNickName = (name: string) => {
  localStorage.setItem("nickName", name);
};

export const getToken = () => {
  const token = localStorage.getItem("token");
  return token; // 로컬 스토리지에 "token"필드가 없는 경우엔 null을 반환
};

export const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const setUserId = (userId: string) => {
  localStorage.setItem("userId", userId);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

export const removeNickName = () => {
  localStorage.removeItem("nickName");
};

export const removeUserId = () => {
  localStorage.removeItem("userId");
};
