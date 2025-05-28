// button.ts
import { cva, type VariantProps } from "class-variance-authority";

export const button = cva("btn btn-soft p-4 py-2 font-semibold", {
  variants: {
    intent: {
      primary: "bg-my-primary text-white",
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
export type ButtonVariants = VariantProps<typeof button>;
