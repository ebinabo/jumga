const colors = require("tailwindcss/colors");

module.exports = {
	purge: [
		"./components/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
	],
	darkMode: false,
	theme: {
		extend: {
			padding: {
				"3/4": "75%",
			},
			colors: {
				primary: colors.rose,
				secondary: colors.amber,
				gray: colors.coolGray,
				accentOne: colors.lightBlue,
				accentTwo: colors.cyan,
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
