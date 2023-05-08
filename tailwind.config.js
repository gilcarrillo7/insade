/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./src/pages/**/*.{js,jsx,ts,tsx}",
		"./src/components/**/*.{js,jsx,ts,tsx}",
		"./node_modules/tw-elements/dist/js/**/*.js",
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: "15px",
				sm: "85px",
			},
		},
		fontFamily: {
			sans: ["ITCAvant", "sans-serif"],
		},
		extend: {
			colors: {
				gray: "#868686",
				greenmain: "#8FB436",
				greensecond: "#518752",
			},
		},
	},
	plugins: [],
};
