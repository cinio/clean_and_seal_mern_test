import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./public/index.html",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {},
    },
    plugins: [
        daisyui
    ],
    daisyui: {
        themes: ["cupcake"],
    }
}