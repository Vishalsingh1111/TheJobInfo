
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // Enables dark mode based on a class (class-based dark mode)
  theme: {
    fontFamily: {
      sans: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
      mono: ['Inter', 'system-ui', '-apple-system', '"Segoe UI"', 'Roboto', 'Arial', 'sans-serif'],
    },
    fontWeight: {
      thin: '400',
      extralight: '400',
      light: '400',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '700',
      black: '700',
    },
    fontSize: {
      xs: ['0.8125rem', { lineHeight: '1.45' }],
      sm: ['0.875rem', { lineHeight: '1.5' }],
      base: ['1rem', { lineHeight: '1.65' }],
      lg: ['1.125rem', { lineHeight: '1.6' }],
      xl: ['1.25rem', { lineHeight: '1.5' }],
      '2xl': ['1.5rem', { lineHeight: '1.35' }],
      '3xl': ['1.75rem', { lineHeight: '1.3' }],
      '4xl': ['2.25rem', { lineHeight: '1.2' }],
      '5xl': ['2.5rem', { lineHeight: '1.2' }],
      '6xl': ['3rem', { lineHeight: '1.1' }],
    },
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
