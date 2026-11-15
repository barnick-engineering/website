import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          hover: "hsl(var(--primary-hover))",
          strong: "hsl(var(--primary-strong))",
        },
        "ink-2": "hsl(var(--ink-2))",
        "surface-ink": "hsl(var(--surface-ink))",
        "on-ink": {
          DEFAULT: "hsl(var(--on-ink) / <alpha-value>)",
          muted: "hsl(var(--on-ink-muted))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "0",
        md: "0",
        sm: "0",
      },
      screens: {
        xs: "375px",
      },
      fontSize: {
        "display-xl": [
          "clamp(2.125rem, 1.35rem + 3.3vw, 3.75rem)",
          { lineHeight: "1.06", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "display-l": [
          "clamp(1.75rem, 1.3rem + 1.9vw, 2.5rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em", fontWeight: "600" },
        ],
        "display-m": [
          "clamp(1.375rem, 1.2rem + 0.8vw, 1.75rem)",
          { lineHeight: "1.2", fontWeight: "500" },
        ],
        price: [
          "clamp(2.5rem, 2.1rem + 1.6vw, 3rem)",
          { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        lead: ["1.125rem", { lineHeight: "1.6" }],
      },
      boxShadow: {
        paper: "0 1px 0 #D6CEBD, 0 18px 32px -24px rgba(17,17,17,.22)",
      },
      transitionTimingFunction: {
        press: "cubic-bezier(0.2, 0, 0, 1)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: [
          "var(--font-display-latin)",
          "var(--font-display-bengali)",
          "Georgia",
          "serif",
        ],
        bengali: [
          "var(--font-bengali)",
          "var(--font-bengali-latin)",
          "var(--font-sans)",
          "system-ui",
          "sans-serif",
        ],
      },
      animation: {
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      keyframes: {
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
    },
  },
  plugins: [animate],
} satisfies Config;
