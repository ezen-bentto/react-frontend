// style/pagination.ts
import { cva, type VariantProps } from "class-variance-authority";

export const joinGroup = cva("join");

export const joinButton = cva("join-item btn", {
  variants: {
    intent: {
      default: "",
      primary: "theme-bg theme-text border-gray-200",
      ghost: "btn-ghost",
    },
    size: {
      sm: "btn-sm",
      md: "btn-md",
      lg: "btn-lg",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "md",
  },
});

export type JoinButtonVariants = VariantProps<typeof joinButton>;
