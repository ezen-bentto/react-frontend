import { cva, type VariantProps } from "class-variance-authority";

export const listItem = cva("list-row items-center gap-4 p-4", {
  variants: {
    size: {
      sm: "text-sm",
      md: "text-base",
    },
    intent: {
      default: "",
      primary: "bg-white text-my-primary",
    },
  },
  defaultVariants: {
    size: "md",
    intent: "default",
  },
});

export type ListItemVariants = VariantProps<typeof listItem>;
