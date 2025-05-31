import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  // eslint-disable-next-line no-unused-vars
  setTheme: (theme: Theme) => void;
  initTheme: () => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
  theme: "light", // 기본값

  toggleTheme: () =>
    set(state => {
      const newTheme = state.theme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", newTheme === "dark");
      localStorage.setItem("theme", newTheme);
      return { theme: newTheme };
    }),

  setTheme: theme => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    set({ theme });
  },

  initTheme: () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme") as Theme | null;
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = stored ?? (prefersDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", theme === "dark");
      set({ theme });
    }
  },
}));
