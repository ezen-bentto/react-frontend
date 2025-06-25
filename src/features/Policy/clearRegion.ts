import { koreaRegions, seoulRegions } from "./filters";

export const cleanRegion = (rawRegion: string): string => {
  const trimmed = rawRegion.trim();

  if (trimmed === "전국") return "전국";
  if (koreaRegions.slice(0, 2)) return trimmed;
  if (seoulRegions.includes(trimmed)) return trimmed;

  return trimmed;
};
