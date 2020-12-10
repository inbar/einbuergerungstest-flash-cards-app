/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
    siteMetadata: {
        name: "Einbürgerungs Flash Cards App",
        url: "https://www.einbuergerungstest-flash-cards.app"
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
                icon: `resources/images/logo_500.png`,
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
