import { cva, type VariantProps } from "class-variance-authority";

export const card = cva("card shadow-sm box-border overflow-hidden", {
  variants: {
    size: {
      sm: "max-w-xs", // max-width: 20rem (320px)
      md: "max-w-sm", // 24rem (384px)
      lg: "max-w-md", // 28rem (448px)
    },
    intent: {
      neutral: "theme-text theme-bg",
      primary: "bg-white border ",
      warning: "bg-my-orange text-white",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "neutral",
  },
});

export type CardVariants = VariantProps<typeof card>;
