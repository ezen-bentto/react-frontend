// button.ts
import { cva, type VariantProps } from "class-variance-authority";

export const button = cva(
  "btn btn-soft p-4 py-2 font-semibold border-gray-200 text-brand-primary",
  {
    variants: {
      intent: {
        primary: "bg-gray-200",
        fillter: "theme-bg dark:text-white",
        orange: "bg-accent-orange text-white",
        sky: "bg-accent-sky text-white"
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
  }
);

// 타입 자동 추출
export type ButtonVariants = VariantProps<typeof button>;
