import { cva, type VariantProps } from "class-variance-authority";

export const listItem = cva("w-full flex theme-text theme-bg box-border-black", {
  variants: {
    size: {
      sm: "max-w-xs text-sm",
      md: "max-w-sm text-base min-w-32",
      lg: "max-w-full text-xl",
      min: "",
    },
    intent: {
      default: "",
      primary: "bg-white text-brand-primary",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "default",
  },
});

export type ListItemVariants = VariantProps<typeof listItem>;
