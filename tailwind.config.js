/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["light", "dark", "cyberpunk"],
  },
  plugins: [require("@tailwindcss/typography"),require('@tailwindcss/forms'),require("daisyui")]
}

