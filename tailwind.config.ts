import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',        // App Router pages
    './pages/**/*.{ts,tsx}',      // If you're using Pages Router too
    './components/**/*.{ts,tsx}', // Any reusable components
  ],
  theme: {
    extend: {

    },
  },
  plugins: [],
};

export default config;
