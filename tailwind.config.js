const colors = require("tailwindcss/colors");

module.exports = {
    mode: "jit",
    purge: ["./src/pages/**/*.{js,ts,jsx,tsx}"],
    darkMode: true,
    theme: {
        extend: {
            fontFamily: {
                sans: ["Roboto", "ui-sans-serif"],
            },
        },
    },
    plugins: [],
};