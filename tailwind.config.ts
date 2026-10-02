import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          950: '#05070f',
          900: '#0a0e1c',
          850: '#0e1326',
          800: '#131a31',
          700: '#1c2544',
        },
        electric: '#3b82f6',
        cyan: { DEFAULT: '#22d3ee' },
        violet: { DEFAULT: '#8b5cf6' },
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(99,102,241,0.55)',
        card: '0 20px 50px -20px rgba(2,6,23,0.6)',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(4%,-6%,0) scale(1.08)' },
        },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        dash: { to: { strokeDashoffset: '0' } },
      },
      animation: {
        drift: 'drift 18s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;
