export const getPolicyLink = (region: string, link: string) => {
  switch (region) {
    case "korea":
    case "region":
      return `https://youth.seoul.go.kr/infoData/youthPlcyInfo/view.do?plcyBizId=${link}`;
    case "seoul":
    case "seoul-gu":
      return `https://youth.seoul.go.kr/infoData/plcyInfo/view.do?plcyBizId=${link}`;
    default:
      return "https://youth.seoul.go.kr/mainA.do";
  }
};
