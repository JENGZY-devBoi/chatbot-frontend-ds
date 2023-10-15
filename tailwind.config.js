/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'author': '#77649a',

      'chat-other': '#E7DCFC',
      'chat-other-color': '#77649a',

      'chat-owner': '#D5E1FF',
      'chat-owner-color': '#4B70C7',

      'primary': '#E0D9CF',
      'secondary': '#F5E8F7',
      'grey-200': '#F0F0F0',
      'brown': '#696047',
    },
    extend: {},
  },
  plugins: [],
}