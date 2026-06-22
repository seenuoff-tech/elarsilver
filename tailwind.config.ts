import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'silver-chrome': '#C0C0C0',
        'deep-graphite': '#121212',
        'luxury-platinum': '#E5E4E2',
        'diamond-white': '#F9F9FB',
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(180deg, #000000 0%, #111111 50%, #050505 100%)',
        'silver-metallic': 'linear-gradient(135deg, #7F7F7F 0%, #F5F5F7 25%, #C0C0C0 50%, #ECEFF1 75%, #4A4A4A 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
