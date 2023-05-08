import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
	siteMetadata: {
		siteUrl: `https://www.insade.com`,
	},
	plugins: [
		"gatsby-plugin-sass",
		"gatsby-plugin-postcss",
		{
			resolve: "gatsby-plugin-manifest",
			options: {
				icon: "src/images/favicon.svg",
			},
		},
		{
			resolve: `gatsby-source-wordpress`,
			options: {
				url: `https://insade.mx/wp/graphql`,
			},
		},
	],
};

export default config;
