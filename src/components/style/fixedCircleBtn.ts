import { cva } from "class-variance-authority";

export const fixedCircleBtn = cva(
  `
    fixed z-[1000] rounded-full cursor-pointer
    border !border-gray-200 dark:border-gray-400
    w-16 h-16
    md:w-14 md:h-14
  `,
  {
    variants: {
      color: {
        top: "bg-brand-primary dark:bg-theme-dark right-12 bottom-20",
        write: "bg-accent-orange right-12 bottom-40 flex items-center justify-center", // 글쓰기 버튼 전용 스타일
      },
      hidden: {
        true: "hidden",
        false: "", // 아무 것도 적용 안 함
      },
    },
    defaultVariants: {
      hidden: false,
    },
  }
);
