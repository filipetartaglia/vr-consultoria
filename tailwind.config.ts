import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1B33",
          2: "#10233F",
        },
        neutral: {
          DEFAULT: "#F4F5F7",
        },
        green: {
          DEFAULT: "#2F6E51",
          wash: "#E7EFE9",
          hover: "#265C44",
        },
        line: "#D9DCE1",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      maxWidth: {
        wrap: "1120px",
      },
      borderRadius: {
        sm: "3px",
      },
      boxShadow: {
        soft: "0 20px 60px -20px rgba(11,27,51,0.35)",
        card: "0 1px 2px rgba(11,27,51,0.04), 0 8px 24px -12px rgba(11,27,51,0.10)",
      },
    },
  },
  plugins: [],
};

export default config;
