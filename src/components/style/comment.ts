import { cva, type VariantProps } from "class-variance-authority";

export const comment = cva("item-center flex flex-col gap-4 p-4", {
  variants: {
    size: {
      md: "max-w-sm text-base",
      lg: "max-w-full text-xl",
    },
    intent: {
      default: "",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "default",
  },
});

export type CommentVariants = VariantProps<typeof comment>;
