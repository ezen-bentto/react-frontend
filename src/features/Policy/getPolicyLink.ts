import { koreaRegions, seoulRegions } from "./filters";

export const getPolicyLink = (region: string, link: string) => {
  if (region === "전국") {
    return `https://youth.seoul.go.kr/infoData/youthPlcyInfo/view.do?plcyBizId=${link}`;
  }

  if (koreaRegions.includes(region)) {
    return `https://youth.seoul.go.kr/infoData/youthPlcyInfo/view.do?plcyBizId=${link}`;
  }

  if (region === "서울") {
    return `https://youth.seoul.go.kr/infoData/plcyInfo/view.do?plcyBizId=${link}`;
  }

  if (seoulRegions.includes(region)) {
    return `https://youth.seoul.go.kr/infoData/plcyInfo/view.do?plcyBizId=${link}`;
  }
  return "https://youth.seoul.go.kr/mainA.do";
};