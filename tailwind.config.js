/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fc',
          100: '#e1e9f8',
          200: '#c5d5f2',
          300: '#9bb9ea',
          400: '#6a95df',
          500: '#4373d3',
          600: '#2c56b8',
          700: '#234495',
          800: '#1e387c',
          850: '#152654',
          900: '#0c1633',
          950: '#070c1e',
        },
        brand: {
          purple: '#8b5cf6',
          'purple-dark': '#6d28d9',
          'purple-light': '#a78bfa',
          indigo: '#6366f1',
          blue: '#3b82f6',
          emerald: '#10b981',
          rose: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(11, 21, 45, 0.37)',
        'glass-hover': '0 12px 40px 0 rgba(99, 102, 241, 0.2)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-blue': '0 0 25px -5px rgba(59, 130, 246, 0.4)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' }
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-slow': 'pulseSlow 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
