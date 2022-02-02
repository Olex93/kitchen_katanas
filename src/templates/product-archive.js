import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ProductIndex = ({ pageContext: { products, pageSlug } }) => {
  {
    console.log(products)
  }

  if (!products.length) {
    return (
      <Layout>
        <SEO title="All posts" />
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
                    <Link
                      to={`/shop-kitchen-knives/${product.slug}`}
                      itemProp="url"
                    >
                      <span itemProp="headline">{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{product.date}</small>
                </header>
                <section itemProp="description">
                  {product.description && parse(product.description)}

                  {/* Featured Image */}
                  {product.images[0] !== null &&
                  <GatsbyImage
                    image={
                      product.images[0].localFile.childrenImageSharp[0]
                        .gatsbyImageData
                    }
                    alt={"1"}
                  />}

                  {/* All images */}
                  {/* {product.images.map(image => {
                    return (
                      <GatsbyImage
                        image={
                          image.localFile.childrenImageSharp[0].gatsbyImageData
                        }
                        alt={"1"}
                      />
                    )
                  })} */}
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )
}

export default ProductIndex
