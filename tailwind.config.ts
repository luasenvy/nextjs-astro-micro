import TailwindTypography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Geist Sans", ...fontFamily.sans],
        mono: ["Geist Mono", ...fontFamily.mono],
      },
    },
  },
  plugins: [TailwindTypography],
} satisfies Config;
