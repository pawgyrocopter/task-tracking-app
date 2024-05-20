/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            roboto: ['Roboto', 'sans-serif'],
        },
        extend: {
            colors: {
                gray: {
                    300: '#F8F8F8',
                    500: '#D9D9D9',
                },
            },
        },
    },
    plugins: [],
}
