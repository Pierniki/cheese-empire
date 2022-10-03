/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hero: ['Press Start 2P', 'cursive'],
        serif: ['Playfair Display', 'sans-serif'],
        pacifico: ['Pacifico', 'cursive']
      }
    }
  },
  plugins: []
};
