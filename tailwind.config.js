/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          darkest: '#030508',
          main: '#05070B',
          secondary: '#080B12',
          panel: '#0B0F17',
          elevated: '#111622',
          hover: '#161D2C',
        },
        border: {
          subtle: '#141A28',
          DEFAULT: '#1E2638',
          bright: '#2D3A54',
        },
        accent: {
          cyan: '#00E5FF',
          cyanDim: '#0284C7',
          green: '#00E676',
          greenDim: '#059669',
          purple: '#B388FF',
          purpleDim: '#7C3AED',
          amber: '#FFB300',
          orange: '#FF9100',
          orangeDim: '#D97706',
          red: '#FF5252',
          redDim: '#DC2626',
          blue: '#448AFF',
          blueDim: '#2563EB',
        }
      },
      fontFamily: {
        mono: ['"Geist Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 15px -3px rgba(0, 229, 255, 0.3)',
        'glow-green': '0 0 15px -3px rgba(0, 230, 118, 0.3)',
        'glow-purple': '0 0 15px -3px rgba(179, 136, 255, 0.3)',
        'glow-orange': '0 0 15px -3px rgba(255, 145, 0, 0.3)',
        'glow-red': '0 0 15px -3px rgba(255, 82, 82, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 1s infinite alternate',
      },
      keyframes: {
        typing: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-2px)' },
        }
      }
    },
  },
  plugins: [],
}
