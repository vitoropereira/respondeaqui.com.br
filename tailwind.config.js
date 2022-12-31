module.exports = {
  plugins: [require("@tailwindcss/forms"), require("tailwind-scrollbar")],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "ui-sans-serif"],
      },
      colors: {
        brand: {
          500: "#1d2daa",
        },
        light: {
          background: "#f5f5f5",
          backgroundSecond: "#dbdbdb",
          backgroundHover: "#dbdbdb",
          backgroundActive: "#EBEBEB",
          chatBackground: "#E5DDD5",
          border: " #eee",
          text: "#000",
          textSecondary: "#222E35",
          lastMessage: "#3B4A54",
        },
        dark: {
          background: "#121214",
          backgroundSecond: "#29292e",
          backgroundHover: "#323238",
          backgroundActive: "#27272A",
          chatBackground: "#52525B",
          border: "#374045",
          text: "#ffff",
          textSecondary: "#667781",
          lastMessage: "#D1D7DB",
        },
      },
    },
  },
  darkMode: "class",
};
