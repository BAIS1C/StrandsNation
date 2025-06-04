// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",       // Corrected path
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",     // If you use src/pages
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // If you use src/components
    // Add any other paths within 'src' if needed
  ],
  theme: {
    extend: {
      // Your existing 'ee-' colors
      colors: {
        'ee-anchor': '#171923',
        'ee-action-taker': '#F6019D',
        'ee-communicator': '#2F2E91',
        'ee-text': '#E2E8F0',
        'ee-text-secondary': '#A0AEC0',
        'ee-accent1': '#F9E100',
        'ee-accent2': '#C9A33A',
        'ee-glass-bg-primary-val': 'rgba(0, 194, 255, 0.12)',
        'ee-glass-border-primary-val': 'rgba(0, 194, 255, 0.25)',
        'ee-glass-bg-primary-hover-val': 'rgba(0, 194, 255, 0.22)',
        'ee-glass-border-primary-hover-val': 'rgba(0, 194, 255, 0.45)',
        'ee-glass-bg-secondary-val': 'rgba(249, 225, 0, 0.12)',
        'ee-glass-border-secondary-val': 'rgba(249, 225, 0, 0.25)',
      },
      fontFamily: {
        'exo': ['"Exo 2"', 'sans-serif'],
      },
      // If you intended to use the 'mob:' prefix, define it here:
      // screens: {
      //   'mob': '400px', // Example
      // },
    },
  },
  plugins: [],
};