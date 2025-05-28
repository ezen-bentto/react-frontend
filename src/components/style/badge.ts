import { cva, type VariantProps } from "class-variance-authority";

export const badge = cva("badge p-4 font-semibold", {
  variants: {
    intent: {
      primary: "bg-white text-my-primary",
      sky: "bg-my-sky text-black",
      orange: "bg-my-orange text-white",
    },
    size: {
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "sm",
  },
});

// 타입 자동 추출
export type BadgeVariants = VariantProps<typeof badge>;
