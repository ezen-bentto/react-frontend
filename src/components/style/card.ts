import { cva, type VariantProps } from "class-variance-authority";

export const card = cva("card bg-base-100 shadow-sm", {
  variants: {
    size: {
      sm: "w-64",
      md: "w-80",
      lg: "w-96",
    },
    intent: {
      neutral: "bg-base-100",
      primary: "bg-white border border-brand-primary",
      warning: "bg-my-orange text-white",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "neutral",
  },
});

export type CardVariants = VariantProps<typeof card>;
