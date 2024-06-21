// tailwind.config.js

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        fredokaOne: ['"Fredoka One"', 'cursive'],
      },
      colors: {
        tealC: '#1BA4AA',
        greenC: '#7BC950',
        lavenderC: '#B185EA',
        orangeC: '#F68E5F',
        roseC: '#D7b0ac',
      },
    },
  },
  plugins: [],
};
