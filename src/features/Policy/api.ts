import { cleanRegion } from "./clearRegion";
import { getPolicyLink } from "./getPolicyLink";
import { type PolicyType } from "./types";

export const fetchAllPolicies = async (): Promise<PolicyType[]> => {
  const files = [
    "/data/seoul-policy-list.json",
    "/data/seoul-gu-policy-list.json",
    "/data/korea-policy-list.json",
    "/data/region-policy-list.json",
  ];

  const responses = await Promise.all(files.map(path => fetch(path).then(res => res.json())));

  const all = responses.flat();

  const unique = Array.from(new Map(all.map(item => [item.link, item])).values());

  const processed = unique.map(item => {
    const category = item.category?.trim() || "분류없음";
    const region = cleanRegion(item.region || "전국");
    const fullLink = getPolicyLink(region, item.link);

    return {
      ...item,
      category,
      region,
      fullLink,
    };
  });

  return processed;
};
