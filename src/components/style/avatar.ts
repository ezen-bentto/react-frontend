import { cva } from "class-variance-authority";

export const avatarContainer = cva("avatar");

export const avatarImageWrapper = cva("", {
  variants: {
    size: {
      sm: "w-10",
      md: "w-16",
      lg: "w-24",
      xl: "w-32",
    },
    shape: {
      square: "rounded",
      circle: "rounded-full",
    },
  },
  defaultVariants: {
    size: "lg",
    shape: "circle",
  },
});

export const avatarImage = cva("object-cover w-full h-full");
