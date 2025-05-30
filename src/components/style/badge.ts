import { cva, type VariantProps } from "class-variance-authority";

export const badge = cva("badge p-4 font-semibold", {
  variants: {
    intent: {
      primary: "bg-white text-brand-primary border-brand-primary",
      sky: "bg-accent-sky text-black border-accent-sky",
      orange: "bg-accent-orange text-white border-accent-orange",
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
