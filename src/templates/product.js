import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ProductTemplate = ({ data: { product } }) => {

  return (
    <Layout>
      {/* <SEO title={product.name} description={product.description} /> */}

      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{parse(product.name)}</h1>

          <p>{product.date}</p>

          {/* if we have a featured image for this post let's display it */}
          {product.images?.fluid && (
            <Img fluid={product.wcProducts.images[0].localFile.childImageSharp.fluid} alt={product.wcProducts.images[0].alt} />
          )}
        </header>

        {!!product.description && (
          <section itemProp="articleBody">{parse(product.description)}</section>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </article>

    </Layout>
  )
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
  ) {
    # selecting the current post by id
    product:wcProducts(id: { eq: $id }) {
      id
      description
      name
      date:date_created(formatString: "MMMM DD, YYYY")

      images {
        alt
        localFile {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }

  }
`
