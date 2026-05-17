import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class', // <-- Activé correctement ici !
  content: [
    './app/**/*.{ts,tsx}',        
    './pages/**/*.{ts,tsx}',      
    './components/**/*.{ts,tsx}', 
  ],
  theme: {
    extend: {
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      },
      animation: {
        'slide-up': 'slide-up 0.5s ease-out forwards',
      }
    },
  },
  plugins: [],
};

export default config;