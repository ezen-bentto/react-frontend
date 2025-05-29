// src/styles/alert-modal.variants.ts
import { cva, type VariantProps } from "class-variance-authority";

export const modal = cva("modal", {
  variants: {
    size: {
      sm: "w-1/4",
      md: "w-1/2",
      lg: "w-3/4",
      full: "w-full h-full",
    },
    intent: {
      info: "bg-white text-brand-primary",
      warning: "bg-yellow-100 text-yellow-800",
      danger: "bg-red-100 text-red-800",
    },
  },
  defaultVariants: {
    size: "full",
    intent: "info",
  },
});

export type ModalVariants = VariantProps<typeof modal>;
