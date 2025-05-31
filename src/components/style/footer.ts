import { cva } from "class-variance-authority";

export const footerWrapper = cva(
  "bg-brand-primary dark:bg-theme-dark text-white text-base mt-auto py-8 w-full border-t border-gray-200 dark:border-gray-400"
);

export const footerSection = cva("w-full max-w-screen-xl mx-auto px-8", {
  variants: {
    spacing: {
      top: "mb-4",
      middle: "mb-4",
      bottom: "md:flex-row flex-col gap-2",
    },
  },
});

export const footerLink = cva("text-xs mx-1 hover:underline", {
  variants: {
    highlight: {
      true: "hover:text-accent-orange",
    },
  },
});

export const footerCopy = cva("text-xs opacity-80 text-center md:text-right");
