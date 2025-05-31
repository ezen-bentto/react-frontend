import { cva, type VariantProps } from "class-variance-authority";

export const comment = cva("flex-default gap-4 p-4 size-full rounded-lg shadow-sm", {
  variants: {
    size: {
      md: "max-w-sm text-base",
      lg: "max-w-full text-xl",
    },
    intent: {
      default: "theme-bg theme-text box-border",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "default",
  },
});

export type CommentVariants = VariantProps<typeof comment>;
