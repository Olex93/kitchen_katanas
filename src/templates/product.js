import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import "../styles/productPage.scss"

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
      {console.log(product)}
      <div className="row productPage">
        <div className="col-10 offset-lg-1">
          <h1 style="font-weight: 800" className="headline">
            {parse(product.name)}
          </h1>
        </div>

        <div className="col-12 col-md-6 col-lg-5 offset-lg-1">
          <GatsbyImage
            image={product.images[0].localFile.childImageSharp.gatsbyImageData}
            alt={product.images[0].alt}
          />
          <p>{parse(product.short_description)}</p>
          {parse(product.description)}
        </div>

        <div className="col-5"></div>

        {!!product.description && (
          <div className="row">
            <div className="offset-1 col-4"></div>
          </div>
        )}

        <hr />

        <footer>
          <Bio />
        </footer>
      </div>
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
    product: wcProducts(id: { eq: $id }) {
      id
      description
      short_description
      name
      date: date_created(formatString: "MMMM DD, YYYY")

      images {
        alt
        localFile {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`
