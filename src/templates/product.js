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
import getStripe from "../utils/stripe"
import { loadStripe } from "@stripe/stripe-js"
import { useShoppingCart } from "use-shopping-cart"
import CartOverview from "../components/CartOverview"
import { BiCart, } from "react-icons/bi"

// const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const ProductTemplate = ({ data: { product, stripeProductInfo } }) => {
  const { addItem } = useShoppingCart()
  const { cartCount, redirectToCheckout } = useShoppingCart()

  const productData = {
    name: product.name,
    description: product.short_description,
    id: stripeProductInfo.id,
    price: stripeProductInfo.unit_amount,
    currency: stripeProductInfo.currency,
    image: product.images[0].localFile.childImageSharp.original.src,
  }

  const handlePurchase = () => {
    addItem(productData)
  }

  console.log(product)

  return (
    <Layout>
      <SEO title={product.name} description={product.description} />
      {console.log("info", stripeProductInfo.id)}
      <div className="row productPage">
        <div className="col-5 offset-lg-7 mt-5 pt-5 fixed-top">
          <h1 style="font-weight: 800" className="headline mt-5">
            {parse(product.name)}
          </h1>
        </div>

        <div id="productInfo" className="col-12 col-md-12 col-lg-5 offset-lg-1">
          <GatsbyImage
            image={product.images[0].localFile.childImageSharp.gatsbyImageData}
            alt={product.images[0].alt}
            className="mt-0"
          />
          <p>{parse(product.short_description)}</p>
          {parse(product.description)}
          <div className="mb-5">
            <h3 id="deliveryInfo">Delivery Information</h3>
            <p>
              Delivery is typically within 2 weeks however due to the handmade
              nature of many of our knives, we are unable to garantee a delivery
              date.
            </p>
            <p>
              Often, knives are shipped direct from the makers and may arrive in
              packaging containing information surrounding the manufactorer.
            </p>
          </div>
        </div>

        <div className="col-5 col-lg-4 offset-lg-7 fixed-top mt-5">
          <div className="mt-5 pt-5">
            <p className="mt-5 pt-3">
              Product price:{" "}
              {product.sale_price ? (
                <>
                  <span className="strike">£{product.regular_price}.00</span>{" "}
                  <span className="salePrice">£{product.sale_price}.00</span>
                </>
              ) : (
                <span className="regularPrice">£{product.price}.00</span>
              )}{" "}
            </p>
            <p>Delivery charge: Free</p>
            <p>Total price: £{JSON.parse(product.price) + ".00"} </p>
            <hr className="mb-4" />

            <div className="internalLinks mb-3">
              <a className="" href="#productInfo">
                View product summary
              </a>
              <a className="" href="#deliveryInfo">
                View delivery info
              </a>
            </div>

            <p className="disclaimer mt-1">
              You need to be 18+ years old to purchase this chef knife. By
              purchasing this product, you agree that you satisfy this
              requirement.
            </p>

            <hr className="mb-4" />

            <div>
              <button
                className={`fullWidthButton mb-3`}
                onClick={() => handlePurchase()}
              >
                <BiCart style={{ marginRight: 10 }} size={30} /> add to cart
              </button>
              {cartCount > 0 && (
                <button
                  className="fullWidthButton mb-3 checkout"
                  onClick={() => redirectToCheckout()}
                >
                  checkout now
                </button>
              )}
            </div>

            {/* <CartOverview /> */}
          </div>
        </div>

        {!product.description && (
          <div className="row">
            <div className="offset-1 col-4"></div>
          </div>
        )}

        <hr />

        <footer>{/* <Bio /> */}</footer>
      </div>
    </Layout>
  )
}

export default ProductTemplate

export const pageQuery = graphql`
  query ProductById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $stripePriceId: String
  ) {
    stripeProductInfo: stripePrice(id: { eq: $stripePriceId }) {
      id
      type
      unit_amount
    }
    product: wcProducts(id: { eq: $id }) {
      id
      description
      short_description
      name
      slug
      price
      sale_price
      regular_price
      stock_quantity
      rating_count
      average_rating
      date_created(formatString: "MM DD, YYY")
      attributes {
        name
        id
        options
      }
      images {
        alt
        localFile {
          childImageSharp {
            gatsbyImageData
            original {
              src
            }
          }
        }
      }
    }
  }
`
