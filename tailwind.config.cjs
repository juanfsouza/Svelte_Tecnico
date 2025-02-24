/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,svelte,ts}', // Certifique-se de que o TailwindCSS será aplicado ao seu código Svelte.
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1D4ED8', // Uma cor azul moderna
        secondary: '#10B981', // Uma cor verde para botões de ação
      },
    },
  },
  plugins: [require('daisyui')],
}
