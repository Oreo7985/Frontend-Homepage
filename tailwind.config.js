/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#3B82F6',
        secondary: '#F87171',
        'dark': '#1F2937',
        'light': '#E5E7EB',
      },
      fontFamily:{
        'sans': ['Inter','system-ui' ,'sans-serif'],
      },
      spacing:{
        '128': '32rem',
        '144': '36rem',
      },
      container:{
        center:true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
}

