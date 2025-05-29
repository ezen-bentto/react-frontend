// style/loginForm.ts
import { cva, type VariantProps } from "class-variance-authority";

export const fieldset = cva(
  "fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 text-brand-primary"
);

export const legend = cva("fieldset-legend text-brand-primary");

export const label = cva("label text-brand-primary ");

export const input = cva("input", {
  variants: {
    intent: {
      default: "",
      error: "input-error",
    },
  },
  defaultVariants: {
    intent: "default",
  },
});

export const button = cva("btn btn-neutral mt-4 bg-brand-primary border-brand-primary");

// 타입 정의
export type InputVariants = VariantProps<typeof input>;
