import { cva, type VariantProps } from "class-variance-authority";

export const comment = cva("item-center flex gap-4 p-4 size-full rounded-lg shadow-sm", {
  variants: {
    size: {
      md: "max-w-sm text-base",
      lg: "max-w-full text-xl",
    },
    intent: {
      default: "border-brand-primary bg-white",
    },
  },
  defaultVariants: {
    size: "lg",
    intent: "default",
  },
});

export type CommentVariants = VariantProps<typeof comment>;
