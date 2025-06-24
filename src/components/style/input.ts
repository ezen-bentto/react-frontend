// style/nameField.ts
import { cva, type VariantProps } from "class-variance-authority";

export const fieldset = cva(
  "fieldset w-full max-w-xl text-lg text-brand-primary! dark:text-white!"
);

export const legend = cva("fieldset-legend text-inherit");

export const input = cva(
  "input  w-full max-w-xl !text-brand-primary dark:!text-white dark:!bg-gray-500 placeholder:text-gray-400",
  {
    variants: {
      status: {
        normal: "",
        error: "input-error",
        success: "input-success",
      },
    },
    defaultVariants: {
      status: "normal",
    },
  }
);

export type InputVariants = VariantProps<typeof input>;
