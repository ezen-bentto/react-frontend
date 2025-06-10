import { cva } from "class-variance-authority";

export const topBtn = cva(
  `
    fixed z-[1000] rounded-full cursor-pointer
    bg-brand-primary dark:bg-theme-dark 
    border !border-gray-200 dark:border-gray-400
    right-12 bottom-20
    w-16 h-16
    md:w-14 md:h-14
  `,
  {
    variants: {
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
