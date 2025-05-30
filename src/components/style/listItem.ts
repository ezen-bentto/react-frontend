import { cva, type VariantProps } from "class-variance-authority";

export const listItem = cva("items-center flex flex-col gap-4 p-4", {
  variants: {
    size: {
      sm: "max-w-xs text-sm",
      md: "max-w-sm text-base",
      lg: "max-w-full text-xl",
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

//    // 28rem (448px)
