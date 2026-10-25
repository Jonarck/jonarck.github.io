import typography from '@tailwindcss/typography';

// Adapted from Astro Nano. System fonts keep every page visually consistent.
export default {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,md,mdx,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [typography],
};
