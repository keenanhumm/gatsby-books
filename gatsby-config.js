module.exports = {
  siteMetadata: {
    title: `Beyond Words`,
    description: `Living and reading together.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-remote-images",
      options: {
        nodeType: "Book",
        imagePath: "coverImageUrl",
      },
    },
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-firesource",
      options: {
        credential: require("./firebase.json"),
        types: require("./types.js"),
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
