import { cva } from "class-variance-authority";

export const headerVariants = cva(
  "theme-bg theme-text border-b border-gray-500 w-full fixed top-0 z-[9999]",
  {
    variants: {
      scrolled: {
        true: "shadow",
        false: "",
      },
    },
    defaultVariants: {
      scrolled: false,
    },
  }
);

export const hedaerWrap = cva("max-w-[1400px] mx-auto px-8 py-7 flex-default font-sans ", {
  variants: {},
});

export const headerMainLogo = cva("text-3xl font-bold hover:text-accent-sky", {
  variants: {},
});

export const headerLinkHover = cva("hover:scale-105 hover:text-accent-orange", {
  variants: {
    highlight: {
      true: "text-my-orange",
    },
  },
});

export const hamBtn = cva("w-8 h-1 my-1 rounded-xs bg-brand-primary dark:bg-white transition", {
  variants: {
    theme: {
      top: "",
      middle: "",
    },
  },
});

export const mobileMenu = cva(
  "md:hidden absolute theme-bg theme-text top-full  right-0 w-[70%] max-w-[300px] h-screen shadow-lg z-50 px-4 py-2 space-y-2 flex flex-col justify-between",
  {
    variants: {
      theme: {
        w: "bg-white text-brand-primary",
      },
    },
  }
);
