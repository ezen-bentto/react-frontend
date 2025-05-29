// style/nameField.ts
import { cva } from "class-variance-authority";

export const fieldset = cva("fieldset w-full max-w-xl");

export const legend = cva("fieldset-legend text-brand-primary");

export const input = cva("input w-full max-w-xl text-brand-primary", {
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
});

export const optionalLabel = cva("label text-sm text-gray-500");
