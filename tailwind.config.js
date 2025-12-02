/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#00D09E",
        lightGreen: "#DFF7E2",
        bgGreen: "#F1FFF3",
        greenBar: "#0E3E3E",
        letterAndIcon: "#093030",
        greenBlack: "#031314",
        lightBlue: "#6DB6FE",
        blueButton: "#3299FF",
        oceanBlue: "#0068FF"
      },
    },
  },
  plugins: [],
}