const countDate = (targetDay: string, isCommunity: boolean = false) => {
  const today = new Date();
  const targetDate = new Date(targetDay);

  // 커뮤니티 타입인 경우 마감일을 23:59:59로 설정
  if (isCommunity) {
    targetDate.setHours(23, 59, 59, 999);
  }

  // 밀리초 단위 차이 계산
  const diffTime = targetDate.getTime() - today.getTime();

  // 밀리초를 일수로 변환
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

export default countDate;