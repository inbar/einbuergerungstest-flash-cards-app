/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require('dotenv').config();

const stage = process.env.STAGE ? process.env.STAGE : 'DEV';
let siteName;
let siteUrl;

switch (stage) {
    case 'PROD':
        siteName = "Einbürgerungs Flash Cards App";
        siteUrl = "https://www.einbuergerungstest-flash-cards.app";
        break;
    case 'BETA':
        siteName = "Einbürgerungs Flash Cards App (BETA)";
        siteUrl = "https://beta.einbuergerungstest-flash-cards.app";
        break;
    case 'GAMMA':
        siteName = "Einbürgerungs Flash Cards App (GAMMA)";
        siteUrl = "https://gamma.einbuergerungstest-flash-cards.app";
        break;
    default:
        siteName = "Einbürgerungs Flash Cards App (DEV)";
        siteUrl = "localhost:8000";
}

module.exports = {
    siteMetadata: {
        name: siteName,
        url: siteUrl
    },
    /* Your site config here */
    plugins: [
        `gatsby-plugin-less`,
        `gatsby-plugin-sharp`, 
        `gatsby-transformer-sharp`,
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-plugin-layout`,
            options: {
                component: require.resolve(`./src/components/layout.jsx`)
            }
        },
        `gatsby-transformer-yaml`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/resources/data`,
            }
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                path: `${__dirname}/resources/images`,
                name: `images`
            }
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                icon: `static/logo/logo_500.png`,
                name: `Einbürgerungstest Flash Cards`,
                short_name: `Einbürgerungstest`,
                start_url: `/home`,
                background_color: `#FFCC00`,
                theme_color: `#FFCC00`,
                display: `browser`
            },
        },
        
    ]
};
