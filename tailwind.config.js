/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purpleCustom: {
          300: "#964B7D", // Adjust the shade number and color code as needed
        },
      },
    },
  },
  plugins: [],
};
