// style/selectInput.ts
import { cva, type VariantProps } from "class-variance-authority";

export const select = cva("select", {
  variants: {
    intent: {
      default: "",
      primary: "bg-brand-primary text-white",
      outline: "select-bordered text-brand-primary border-brand-primary outline-brand-primary ",
    },
    size: {
      sm: "select-sm ",
      md: "select-md",
      lg: "select-lg w-auto",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "sm",
  },
});

export type SelectVariants = VariantProps<typeof select>;
