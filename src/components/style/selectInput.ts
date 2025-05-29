// style/selectInput.ts
import { cva, type VariantProps } from "class-variance-authority";

export const select = cva("select", {
  variants: {
    intent: {
      default: "",
      primary: "bg-primary text-white",
      outline: "select-bordered",
    },
    size: {
      sm: "select-sm",
      md: "select-md",
      lg: "select-lg",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
  },
});

export type SelectVariants = VariantProps<typeof select>;
