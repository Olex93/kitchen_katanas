import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProductIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const products = data.allWcProducts.nodes

  if (!products.length) {
    return (
      <Layout>
        <SEO title="All posts" />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <SEO title="All posts" />

      <Bio />

      <ol style={{ listStyle: `none` }}>
        {products.map(product => {
          const title = product.name

          return (
            <li key={product.id}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={`/shop-kitchen-knives/${product.slug}`} itemProp="url">
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{product.date}</small>
                </header>
                <section itemProp="description">{parse(product.description)}</section>
              </article>
            </li>
          )
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default ProductIndex

export const pageQuery = graphql`
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
`
