/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'scale(1) translate(0px, 0px)',
          },
          '33%': {
            transform: 'scale(1.1) translate(20px, -20px)',
          },
          '66%': {
            transform: 'scale(0.9) translate(-20px, 20px)',
          },
        },
      },
      animation: {
        'blob': 'blob 15s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}