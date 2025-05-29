// style/nameField.ts
import { cva } from "class-variance-authority";

export const fieldset = cva("fieldset");

export const legend = cva("fieldset-legend");

export const input = cva("input", {
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
