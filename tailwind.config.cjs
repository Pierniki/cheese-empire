/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        hero: ['Press Start 2P', 'yolo'],
        serif: ['Playfair Display', 'serif'],
        pacifico: ['Pacifico', 'cursive'],
        roboto: ['Roboto Slab', 'swag']
      }
    }
  },
  plugins: []
};
