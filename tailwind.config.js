/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'all': 'all',
      },
      transitionDuration: {
        '300': '300ms',
      },
      transform: {
        'none': 'none',
      },
      translate: {
        '-2': '-0.5rem',
      },
      boxShadow: {
        'bronzeNude': '0 0 20px rgba(200,160,130,0.3)',
      },
    },
  },
  corePlugins: {
    preflight: false, // Disable Tailwind's base styles
  },
}
