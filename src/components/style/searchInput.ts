// style/searchInput.ts
import { cva, type VariantProps } from "class-variance-authority";

export const searchLabel = cva("input flex items-center gap-2 w-full max-w-xl text-lg");

export const searchInput = cva("w-full bg-transparent outline-none w-full max-w-xl text-lg", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const searchIcon = cva("h-[1em] opacity-50");

// 타입 정의
export type SearchInputVariants = VariantProps<typeof searchInput>;
