import { type PolicyType } from "./types";

export const fetchAllPolicies = async (): Promise<PolicyType[]> => {
  const files = ["/data/seoul-policy-list.json", "/data/seoul-gu-policy-list.json"];
  // const files = ["/data/seoul-policy-list.json", "/data/seoul-gu-policy-list.json", "/data/korea-policy-list.json", "/data/region-policy-list.json"];
  const responses = await Promise.all(files.map(path => fetch(path).then(res => res.json())));

  const all = responses.flat();

  // ✅ link 기준으로 중복 제거
  const unique = Array.from(new Map(all.map(item => [item.link, item])).values());

  return unique;
};
