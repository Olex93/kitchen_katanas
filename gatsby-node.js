const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts, products & categories from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)
  // const products = await getProducts(gatsbyUtilities)
  const categories = await getCategories(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts/products, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })
  // await createIndividualProductPages({ products, gatsbyUtilities })

  // And a paginated archive for each
  await createBlogPostArchive({ posts, gatsbyUtilities })
  // await createProductArchive({ products, gatsbyUtilities })
  await createCategoryArchives({ categories, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `${post.uri}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/blog-post.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates creates the blog post archive
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
  const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

  const { postsPerPage } = graphqlResult.data.wp.readingSettings

  const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
  const totalPages = postsChunkedIntoArchivePages.length

  return Promise.all(
    postsChunkedIntoArchivePages.map(async (_posts, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          return page === 1
            ? `/kitchen-knife-101`
            : `/kitchen-knife-101/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/blog-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * postsPerPage,

          // We need to tell the template how many posts to display too
          postsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

/**
 * This function creates creates the blog category archive pages
 */
const createCategoryArchives = async ({ categories, gatsbyUtilities }) =>
  Promise.all(
    categories.map(category => {
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        path: `${category.link}`,

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/category-post-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          categoryName: category.name,
          categoryLink: category.link,
        },
      })
    })
  )

// const createCategoryArchives = async ({ categories, gatsbyUtilities }) =>
// Promise.all(
//   categories.map(({category }) =>
//     // createPage is an action passed to createPages
//     // See https://www.gatsbyjs.com/docs/actions#createPage for more info
//     gatsbyUtilities.actions.createPage({
//       // Use the WordPress uri as the Gatsby page path
//       // This is a good idea so that internal links and menus work 👍
//       path: `${post.uri}`,

//       // use the blog post template as the page component
//       component: path.resolve(`./src/templates/blog-post.js`),

//       // `context` is available in the template as a prop and
//       // as a variable in GraphQL.
//       context: {
//         // we need to add the post id here
//         // so our blog post template knows which blog post
//         // the current page is (when you open it in a browser)
//         id: post.id,

//         // We also use the next and previous id's to query them and add links!
//         previousPostId: previous ? previous.id : null,
//         nextPostId: next ? next.id : null,
//       },
//     })
//   )
// )

/**
 * This function creates all the individual product pages in this site
 */

const createIndividualProductPages = async ({ products, gatsbyUtilities }) =>
  Promise.all(
    products.map(product =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: `/shop-kitchen-knives/${product.slug}`,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/product.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: product.id,

          // We also use the next and previous id's to query them and add links!
          // previousPostId: previous ? previous.id : null,
          // nextPostId: next ? next.id : null,
        },
      })
    )
  )

/**
 * This function creates creates the Product archive
 */
async function createProductArchive({ products, gatsbyUtilities }) {
  const productsPerPage = 20
  const productsChunkedIntoArchivePages = chunk(products, productsPerPage)
  const totalPages = productsChunkedIntoArchivePages.length

  return Promise.all(
    productsChunkedIntoArchivePages.map(async (products, index) => {
      const pageNumber = index + 1

      const getPagePath = page => {
        if (page > 0 && page <= totalPages) {
          // Since our homepage is our blog page
          // we want the first page to be "/" and any additional pages
          // to be numbered.
          // "/blog/2" for example
          return page === 1
            ? `/shop-kitchen-knives`
            : `/shop-kitchen-knives/${page}`
        }

        return null
      }

      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      await gatsbyUtilities.actions.createPage({
        path: getPagePath(pageNumber),

        // use the blog post archive template as the page component
        component: path.resolve(`./src/templates/product-archive.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // the index of our loop is the offset of which posts we want to display
          // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
          // etc
          offset: index * productsPerPage,

          // We need to tell the template how many posts to display too
          productsPerPage,

          nextPagePath: getPagePath(pageNumber + 1),
          previousPagePath: getPagePath(pageNumber - 1),
        },
      })
    })
  )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress categories. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */

async function getCategories({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query categoryQuery {
      allWpCategory {
        nodes {
          link
          name
        }
      }
    }
  `)
  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpCategory.nodes
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress products. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */

async function getProducts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query productQuery {
      allWcProducts {
        nodes {
          name
          id
          slug
          stock_quantity
          short_description
          price
          permalink
          description
          categories {
            name
            slug
            id
          }
          attributes {
            id
            name
            options
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWcProducts.nodes
}
