module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        shrink: {
          'from': { width: '100%' },
          'to': { width: '0%' },
        },
      },
      animation: {
        shrink: 'shrink 5s linear forwards',
      },
    },
  },
  plugins: [],
};