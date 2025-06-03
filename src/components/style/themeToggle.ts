import { cva } from "class-variance-authority";

export const themeToggleVariants = cva("swap swap-rotate cursor-pointer", {
  variants: {
    size: {
      sm: "h-6 w-6",
      md: "h-8 w-8",
      lg: "h-10 w-10",
    },
  },
  defaultVariants: {
    size: "lg",
  },
});
