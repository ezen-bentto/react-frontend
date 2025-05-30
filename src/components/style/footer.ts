import { cva } from "class-variance-authority";

export const footerWrapper = cva("bg-brand-primary text-white text-lg mt-auto py-8 w-full");

export const footerSection = cva("w-full max-w-screen-xl mx-auto px-8", {
  variants: {
    spacing: {
      top: "mb-4",
      middle: "mb-4",
      bottom: "flex justify-between items-center md:flex-row flex-col gap-2",
    },
  },
});

export const footerLink = cva("text-white text-xs mx-1 hover:underline", {
  variants: {
    highlight: {
      true: "text-my-orange",
    },
  },
});

export const footerCopy = cva("text-xs opacity-80 text-center md:text-right");
