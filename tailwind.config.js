/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}', './lib/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0a0a0a',
        gold: {
          50: '#FFFBEF',
          100: '#FDF6E3',
          200: '#FAE9B8',
          300: '#F5D77E',
          400: '#F2C14E',
          500: '#E0A82E',
          600: '#C08A1E',
          700: '#8F6515',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-grotesk)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        sharp: '6px 6px 0 0 #0a0a0a',
        'sharp-sm': '3px 3px 0 0 #0a0a0a',
      },
      backgroundImage: {
        'gold-rise':
          'linear-gradient(180deg, rgba(242,193,78,0) 0%, rgba(242,193,78,0.28) 55%, rgba(224,168,46,0.45) 100%)',
        'gold-sheen': 'linear-gradient(135deg, #F5D77E 0%, #E0A82E 55%, #C08A1E 100%)',
      },
      transitionTimingFunction: {
        sharp: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
