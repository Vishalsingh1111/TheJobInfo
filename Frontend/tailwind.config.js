
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode based on a class (class-based dark mode)
  theme: {
    extend: {
      keyframes: {
        pulseOpacity: {
          '0%': { opacity: '0.5' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.5' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        pulseOpacity: 'pulseOpacity 1.5s ease-in-out infinite', // Reusable pulse opacity animation
        spinSlow: 'spinSlow 2s linear infinite', // Slow spin animation
      },
      backgroundImage: {
        'red-to-white': 'linear-gradient(to top, #f7eded, #fff)', // bottom red, top white
      },
    },
  },
  plugins: [
    require('daisyui'), // DaisyUI plugin for UI components (optional)
  ],
}
