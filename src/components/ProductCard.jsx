import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import parse from "html-react-parser"
import "../styles/productCard.scss"

export default function ProductCard(props) {
  const { product } = props
  const title = product.name
  const categoriesArray = product.categories
  const productDescription = product.description
  const productShortDescription = product.shortDescription
  const productID = product.id
  const productImagesArray = product.images
  const productPrice = product.price
  const slug = product.slug
  const stockQuantity = product.stockQuantity

  // console.log(product)

  return (
    <li className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3" key={product.id}>
      <Link
        to={`/kitchen-knives/${product.slug}/`}
        itemProp="url"
        className="productLinkWrapper"
      >
        <article
          className="post-list-item"
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className="article-inner">
            <header>
              {/* Featured Image */}
              {product.images.length > 0 && (
                <div className="productImageWrapperOuter">
                  <div className="productImageWrapperInner">
                    <GatsbyImage
                      image={
                        product.images[0].localFile.childrenImageSharp[0]
                          .gatsbyImageData
                      }
                      alt={"1"}
                    />
                  </div>
                </div>
              )}
              <h2 className="productName">{parse(title)}</h2>
              <p className="productPrice">£{productPrice}.00</p>
            </header>
          </div>
        </article>
      </Link>
    </li>
  )
}
