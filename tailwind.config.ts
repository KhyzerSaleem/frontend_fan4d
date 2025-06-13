import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				light: {
					DEFAULT: "#e8edf0",
					hover: "#dce3e9",
					active: "#b7c6d2",
				},
				normal: {
					DEFAULT: "#16476d",
					hover: "#144062",
					active: "#123957",
				},
				dark: {
					DEFAULT: "#113552",
					hover: "#0d2b41",
					active: "#0a2031",
				},
				darker: "#081926",
				accent: {
					danger: {
						DEFAULT: "#E92727",
						light: "#FDEEEE",
					},
					success: {
						DEFAULT: "#10B981",
						light: "#ECF9F5",
					},
					warning: {
						DEFAULT: "#F88F2D",
						light: "#FFF6EE",
					},
				},
				text: {
					main: "#12161C",
					sub: "#5A5D61",
					placeholder: "#C1C2C3",
					borders: "#EBEBEC",
				},
				customPalette: {
					"50": "#fef4e6",
					"100": "#fdefd9",
					"200": "#fcddb0",
					"300": "#f49100",
					"400": "#dc8300",
					"500": "#c37400",
					"600": "#b76d00",
					"700": "#925700",
					"800": "#6e4100",
					"900": "#553300",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: {
						height: "0",
					},
					to: {
						height: "var(--radix-accordion-content-height)",
					},
				},
				"accordion-up": {
					from: {
						height: "var(--radix-accordion-content-height)",
					},
					to: {
						height: "0",
					},
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate"), require("daisyui")],
	daisyui: {
	
	},
};
export default config;
