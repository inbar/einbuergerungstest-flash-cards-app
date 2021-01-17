/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

require('dotenv').config();

const stage = process.env.STAGE ? process.env.STAGE : 'DEV';
const GOOGLE_ANALYTICS_TRACKING_ID = {
    BETA: 'G-FX57TQKCSS',
    GAMMA: 'G-16WMQK8TJV',
    PROD: 'G-V6FCH2NWBB'
};

let siteName;
let siteUrl;
let trackingId;

switch (stage) {
    case 'PROD':
        siteName = "Einbürgerungstest Flash Cards App";
        siteUrl = "https://www.einbuergerungstest-flash-cards.app";
        trackingId = GOOGLE_ANALYTICS_TRACKING_ID.PROD;
        break;
    case 'BETA':
        siteName = "Einbürgerungstest Flash Cards App (BETA)";
        siteUrl = "https://beta.einbuergerungstest-flash-cards.app";
        trackingId = GOOGLE_ANALYTICS_TRACKING_ID.BETA;
        break;
    case 'GAMMA':
        siteName = "Einbürgerungstest Flash Cards App (GAMMA)";
        siteUrl = "https://gamma.einbuergerungstest-flash-cards.app";
        trackingId = GOOGLE_ANALYTICS_TRACKING_ID.GAMMA;
        break;
    default:
        siteName = "Einbürgerungstest Flash Cards App (DEV)";
        siteUrl = "localhost:8000";
        trackingId = GOOGLE_ANALYTICS_TRACKING_ID.BETA;
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
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                // You can add multiple tracking ids and a pageview event will be fired for all of them.
                trackingIds: [
                    trackingId, // Google Analytics / GA
                ],
                // This object gets passed directly to the gtag config command
                // This config will be shared across all trackingIds
                gtagConfig: {
                    anonymize_ip: true,
                    cookie_expires: 0,
                },
                pluginConfig: {
                    // Setting this parameter is also optional
                    respectDNT: true
                }
            },
        }
    ]
};
