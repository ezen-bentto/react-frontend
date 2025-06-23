// style/pagination.ts
import { cva, type VariantProps } from "class-variance-authority";

export const joinGroup = cva("join w-full justify-center");

export const joinButton = cva("join-item btn", {
  variants: {
    intent: {
      default: "",
      primary: "theme-bg theme-text border-gray-200",
      active: "bg-blue-500 text-white",
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
