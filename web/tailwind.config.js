/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  darkMode: "class",
  theme: {
    colors: {
      background: "rgb(var(--color-background) / <alpha-value>)",
      foreground: "rgb(var(--color-foreground) / <alpha-value>)",
      primary: "rgb(var(--color-primary) / <alpha-value>)",
      info: "rgb(var(--color-info) / <alpha-value>)",
      success: "rgb(var(--color-success) / <alpha-value>)",
      warn: "rgb(var(--color-warn) / <alpha-value>)",
      error: "rgb(var(--color-error) / <alpha-value>)",
      transparent: "transparent",
      current: "currentColor",
      black: "rgb(0 0 0 / <alpha-value>)",
      white: "rgb(255 255 255 / <alpha-value>)",
    },
  },
  plugins: [],
};
