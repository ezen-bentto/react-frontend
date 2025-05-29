import { cva, type VariantProps } from "class-variance-authority";

export const card = cva("card bg-base-100 shadow-sm", {
  variants: {
    size: {
      sm: "max-w-xs", // max-width: 20rem (320px)
      md: "max-w-sm", // 24rem (384px)
      lg: "max-w-md", // 28rem (448px)
    },
    intent: {
      neutral: "bg-base-100",
      primary: "bg-white border border-brand-primary text-white",
      warning: "bg-my-orange text-white",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "neutral",
  },
});

export type CardVariants = VariantProps<typeof card>;
