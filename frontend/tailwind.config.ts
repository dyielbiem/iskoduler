import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
    },
    extend: {
      fontFamily: {
        header: ["Playfair Display SC", "sans-serif"],
        body: ["DM Sans", "serif"],
      },
      colors: {
        primary: "#880000",
        secondary: "#0E5887",
        white: "#f1f1f1",
        activity: "#6E0B0B",
        assignment: "#056E23",
      },
      boxShadow: {
        customShadow: "0px 2px 8px -2px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
