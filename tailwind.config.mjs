/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        xs: "320px"
      },
      colors: {
        'foreground': 'var(--foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        'secondary': 'var(--secondary)',
        'border-color': 'var(--border-color)',
        'accent': 'var(--accent)',
        'bg-card': 'var(--bg-card)',
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
        serif: ['var(--font-playfair)'],
        mono: ['var(--font-mono-sapce)']
      },
    },
  },
  plugins: [],
};
