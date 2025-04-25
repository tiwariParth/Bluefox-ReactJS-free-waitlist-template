module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shrink: {
          '0%': { width: '100%' },
          '100%': { width: '0%' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { opacity: '1', transform: 'translateX(0)' },
          '100%': { opacity: '0', transform: 'translateX(100%)' },
        }
      },
      animation: {
        shrink: 'shrink 5s linear forwards',
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideOut: 'slideOut 0.5s ease-in forwards',
      },
    },
  },
  plugins: [],
};