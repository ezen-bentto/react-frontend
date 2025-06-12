import { z } from "zod";

/**
 *
 * 공모전 스키마 정의
 *
 * @function regContestSchema, getContestDetailSchema, modContestSchema, delContestSchema
 * @date 2025/06/09
 * @history
 * -------------------------------------------------------
 *           변경일             작성자             변경내용
 * -------------------------------------------------------
 *
 *        2025/06/09           한유리
 * @param 없음
 */

// 공모전 리스트
export const getContestListSchema = z.object({
  id: z.number(),
  title: z.string(),
  img: z.string(),
  organizer: z.string(),
  prize: z.string(),
  start_date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  end_date: z.string().refine(val => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  participants: z.string(),
  benefits: z.string(),
  contest_tag: z.string(),
  views: z.string(),
});

export type getContestList = z.infer<typeof getContestListSchema>;
// 공모전 상세 select
