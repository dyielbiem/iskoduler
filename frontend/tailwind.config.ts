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
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "1024px",
    //   xl: "1200px",
    // },
    extend: {
      fontFamily: {
        header: ["Playfair Display SC", "sans-serif"],
        body: ["DM Sans", "serif"],
      },
      colors: {
        primary: "#880000",
        secondary: "#0E5887",
        white: "#eeeeee",
        tertiary: "#f1efef",
        activity: "#6E0000",
        assignment: "#056E23",
        class: "#6E0000",
      },
      boxShadow: {
        customShadow: "0px 1px 7px -3px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
