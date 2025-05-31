import { cva } from "class-variance-authority";

export const headerVariants = cva(
  "dark:text-white dark:bg-theme-dark  text-brand-primary bg-white w-full fixed top-0 z-[9999] transition-colors duration-300",
  {
    variants: {
      scrolled: {
        true: "bg-white shadow",
        false: "bg-white/10",
      },
    },
    defaultVariants: {
      scrolled: false,
    },
  }
);

export const hedaerWrap = cva(
  "max-w-[1400px] mx-auto px-8 py-7 flex items-center justify-between font-sans ",
  { variants: {} }
);

export const headerMainLogo = cva("text-3xl font-bold hover:text-accent-sky", {
  variants: {},
});

export const headerLinkHover = cva("hover:scale-105 hover:text-accent-orange transition", {
  variants: {
    highlight: {
      true: "text-my-orange",
    },
  },
});

export const hamBtn = cva("w-8 h-1 my-1 transition rounded-xs bg-brand-primary", {
  variants: {
    theme: {
      top: "",
      middle: "",
    },
  },
});

export const mobileMenu = cva(
  "md:hidden absolute top-full flex flex-col right-0 w-[70%] max-w-[300px] h-screen shadow-lg z-50 gap-2 px-4 py-2 space-y-2",
  {
    variants: {
      theme: {
        w: "bg-white text-brand-primary",
      },
    },
  }
);
