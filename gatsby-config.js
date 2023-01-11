/**
 * 👋 Hey there!
 * This file is the starting point for your new WordPress/Gatsby site! 🚀
 * For more information about what this file is and does, see
 * https://www.gatsbyjs.com/docs/gatsby-config/
 *
 */

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  /**
   * Adding plugins to this array adds them to your Gatsby site.
   *
   * Gatsby has a rich ecosystem of plugins.
   * If you need any more you can search here: https://www.gatsbyjs.com/plugins/
   */
   siteMetadata: {
    siteUrl: `https://www.kitchenkatanas.co.uk`,
  },
  plugins: [
    {
      /**
       * First up is the WordPress source plugin that connects Gatsby
       * to your WordPress site.
       *
       * visit the plugin docs to learn more
       * https://github.com/gatsbyjs/gatsby/blob/master/packages/gatsby-source-wordpress/README.md
       *
       */
      resolve: `gatsby-source-wordpress`,
      options: {
        // the only required plugin option for WordPress is the GraphQL url.
        url:
          process.env.WPGRAPHQL_URL ||
          `https://app-6060d325c1ac181868f8defd.closte.com/graphql`,
          useACF: true,
      },
    },

    /**
     * We need this plugin so that it adds the "File.publicURL" to our site
     * It will allow us to access static url's for assets like PDF's
     *
     * See https://www.gatsbyjs.org/packages/gatsby-source-filesystem/ for more info
     */
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `assets`,
        path: `${__dirname}/content/assets`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    /**
     * The following two plugins are required if you want to use Gatsby image
     * See https://www.gatsbyjs.com/docs/gatsby-image/#setting-up-gatsby-image
     * if you're curious about it.
     */
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-5ZC7NQZ",
        includeInDevelopment: false,
      },
    },

    {
      // See https://www.gatsbyjs.com/plugins/gatsby-plugin-manifest/?=gatsby-plugin-manifest
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kitchen Katanas`,
        short_name: `KK`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/KK_favicon.png`,
      },
    },
    {
      resolve: "@pasdo501/gatsby-source-woocommerce",
      options: {
        // Base URL of WordPress site
        api: "app-6060d325c1ac181868f8defd.closte.com",
        verbose: true,
        https:true,
        api_keys: {
          consumer_key: process.env.WOO_CONSUMER_KEY,
          consumer_secret: process.env.WOO_CONSUMER_SECRET,
        },
        // Array of strings with fields you'd like to create nodes for...
        fields: ["products", "products/categories", "products/attributes"],
      },
    },

    {
      resolve: `gatsby-plugin-use-shopping-cart`,
      options: {
        mode: "payment",
        cartMode: "client-only",
        stripePublicKey: process.env.GATSBY_STRIPE_PUBLISHABLE_KEY,
        successUrl: "https://www.kitchenkatanas/order-details/", // url must start with http or https
        cancelUrl: "https://www.kitchenkatanas/shopping-cart/", // url must start with http or https
        currency: "GBP",
        allowedCountries: [ "GB" ],
        billingAddressCollection: true,

      },
    },

    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price"],
        secretKey: process.env.GATSBY_STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },

    // See https://www.gatsbyjs.com/plugins/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    // `gatsby-plugin-remove-trailing-slashes`,
    `gatsby-plugin-preact`,
    `gatsby-plugin-sitemap`,


    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        // Setting a color is optional.
        color: `#b76914`,
        // Disable the loading spinner.
        showSpinner: false,
      },
    },

    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `PT Sans/:400,700`,
          `PTSans-Bold`,
          `PT Serif\:400`, // you can also specify font weights and styles
        ],
        display: "swap",
      },
    },

    /**
     * this (optional) plugin enables Progressive Web App + Offline functionality
     * To learn more, visit: https://gatsby.dev/offline
     */
    // `gatsby-plugin-offline`,
  ],
}
