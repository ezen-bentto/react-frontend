// style/selectInput.ts
import { cva, type VariantProps } from "class-variance-authority";

export const select = cva("select", {
  variants: {
    intent: {
      default: "theme-bg theme-text box-border outline-none!",
      outline: "select-bordered theme-bg theme-text box-border outline-brand-primary ",
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
