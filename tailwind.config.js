/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#b9e0fe',
          300: '#7cc5fd',
          400: '#36a7fa',
          500: '#0c87eb',
          600: '#006bc9',
          700: '#0055a3',
          800: '#004886',
          900: '#003c70',
          950: '#002647',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        "flip-words": {
          "0%": {
            transform: "translateY(0%)"
          },
          "7.69%": {
            transform: "translateY(-100%)"
          },
          "15.38%": {
            transform: "translateY(-200%)"
          },
          "23.07%": {
            transform: "translateY(-300%)"
          },
          "30.76%": {
            transform: "translateY(-400%)"
          },
          "38.45%": {
            transform: "translateY(-500%)"
          },
          "46.14%": {
            transform: "translateY(-600%)"
          },
          "53.83%": {
            transform: "translateY(-700%)"
          },
          "61.52%": {
            transform: "translateY(-800%)"
          },
          "69.21%": {
            transform: "translateY(-900%)"
          },
          "76.90%": {
            transform: "translateY(-1000%)"
          },
          "84.59%": {
            transform: "translateY(-1100%)"
          },
          "92.28%": {
            transform: "translateY(-1200%)"
          },
          "100%": {
            transform: "translateY(-1300%)"
          }
        }
      },
      animation: {
        "flip-words": "flip-words 26s steps(1) infinite"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
  safelist: [
    'from-emerald-400',
    'to-blue-500',
    'from-white/40',
    'to-white/30',
    'from-emerald-400/40',
    'to-blue-500/40',
    'from-white/50',
    'to-white/40',
    'backdrop-blur-sm',
    {
      pattern: /from|to|bg|border|text|shadow|opacity/,
    },
  ],
}
