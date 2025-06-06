import { cva, type VariantProps } from "class-variance-authority";

export const selectWrapper = cva("custom-select", {
  variants: {
    intent: {
      default: "w-bg-white text-gray-800 border border-gray-300",
      outline: "border border-blue-500 text-blue-700 bg-white",
    },
    size: {
      sm: "w-25 text-sm h-8 px-2",
      md: "w-40 text-base h-10 px-3",
    },
  },
  defaultVariants: {
    intent: "default",
    size: "sm",
  },
});

export type SelectVariants = VariantProps<typeof selectWrapper>;
