import axios from "axios";
import { type PolicyType } from "./types";

export const fetchAllPolicies = async (): Promise<PolicyType[]> => {
  const responses = await Promise.all([
    axios.get<PolicyType[]>("/data/seoul-policy-list.json"),
    axios.get<PolicyType[]>("/data/seoul-gu-policy-list.json"),
    axios.get<PolicyType[]>("/data/korea-policy-list.json"),
    axios.get<PolicyType[]>("/data/region-policy-list.json"),
  ]);
  return responses.flatMap(res => res.data);
};
