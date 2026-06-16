/** @type {import('tailwindcss').Config} */
const primary = {
  50: '#FEF2F8',
  100: '#FAD3E7',
  200: '#F494CB',
  300: '#E45FAD',
  400: '#C93B87',
  500: '#A62265',
  600: '#8F1D56',
  700: '#791849',
  800: '#66153E',
  900: '#551233',
};

const secondary = {
  50: '#EAF6F6',
  100: '#C5E9E9',
  200: '#9BDCDC',
  300: '#69CBCB',
  400: '#3DBABA',
  500: '#2C9C9C',
  600: '#268A8A',
  700: '#217878',
  800: '#1B6666',
  900: '#155454',
};

const gray = {
  50: '#F9F9F9',
  100: '#F0F0F0',
  200: '#E0E0E0',
  300: '#CCCCCC',
  400: '#B3B3B3',
  500: '#999999',
  600: '#808080',
  700: '#666666',
  800: '#4D4D4D',
  900: '#333333',
};

const dark = {
  50: '#FAFAFA',
  100: '#F4F4F4',
  200: '#E8E8E8',
  300: '#D0D0D0',
  400: '#AEAEAE',
  500: '#8C8C8C',
  600: '#6B6B6B',
  700: '#4B4B4B',
  800: '#2E2E2E',
  900: '#161616',
};

const neutral = {
  50: '#F9F7F7',
  100: '#F2EFEF',
  200: '#E4DDDD',
  300: '#D5CBCB',
  400: '#BCAFAF',
  500: '#A29393',
  600: '#887878',
  700: '#6D5E5E',
  800: '#524646',
  900: '#3C3232',
};

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './.storybook/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.5rem',
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
        '2xl': '1320px',
      },
    },
    extend: {
      spacing: {
        'section-sm': '3rem',
        'section-md': '4rem',
        'section-lg': '5rem',
      },
      colors: {
        primary,
        secondary,
        gray,
        dark,
        neutral,
      },
      fontFamily: {
        sans: ['IRANSans', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
