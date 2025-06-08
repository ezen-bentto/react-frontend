import { cva, type VariantProps } from "class-variance-authority";

export const badge = cva("badge p-4 font-semibold", {
  variants: {
    intent: {
      primary: "bg-brand-primary text-white border-brand-primary ",
      default: "bg-gray-200 text-brand-primary border-gray-200",
      orange: "bg-accent-orange text-white border-accent-orange",
    },
    size: {
      sm: "text-sm",
      lg: "text-lg",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "sm",
  },
});

// 타입 자동 추출
export type BadgeVariants = VariantProps<typeof badge>;
