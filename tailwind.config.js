import { defineConfig } from "tailwindcss";
import daisyui from "daisyui";

export default defineConfig({
  content: ["./src/**/*.{ts,tsx,html}"],
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#26424a",
          secondary: "#f000b8",
          accent: "#37cdbe",
          sky: "#a4d7ee",
          orange: "#fc8d09",
        },
        extend: {
          screens: {
            mobile: "360px",
            tablet: "640px",
            desktop: "1400px", // max-width: 1400px
          },
        },
      },
    ],
  },
});
