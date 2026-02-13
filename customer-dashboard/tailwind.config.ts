import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#10B981', // Emerald green for customer theme
        secondary: '#F59E0B', // Amber for accents
        accent: '#8B5CF6', // Purple for highlights
      },
    },
  },
  plugins: [],
}
export default config
