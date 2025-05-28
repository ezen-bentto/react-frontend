// button.ts
import { cva, type VariantProps } from "class-variance-authority";

export const button = cva("rounded px-4 py-2 font-semibold", {
  variants: {
    intent: {
      primary: "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-black",
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