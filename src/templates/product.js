import React, { useState } from "react"
import { graphql } from "gatsby"
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
import { BiDownArrowAlt } from "react-icons/bi"
import ProductBreadcrumbs from "../components/ProductBreadcrumbs"
import { useEffect } from "react"
import AddToCart from "../components/AddToCart"
import useWindowDimensions from "../utils/windowDimensions"

// const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)

const ProductTemplate = ({ data: { product, stripeProductInfo } }) => {
  const { addItem } = useShoppingCart()
  const { cartCount, redirectToCheckout } = useShoppingCart()
  const [knifeOrigin, setKnifeOrigin] = useState("")
  const [knifeMakeProcess, setKnifeMakeProcess] = useState("")
  const [knifeType, setKnifeType] = useState("")
  const [productCategories, setProductCategories] = useState([])
  const [primaryProductCategory, setPrimaryProductCategory] = useState([])
  const { height, width } = useWindowDimensions()

  const knifeTypes = [
    "Utility Knives",
    "Santoku",
    "Peeling Knives",
    "Paring Knives",
    "Nakiri",
    "Boning Knives",
    "Bread Knives",
    "Bunka Knives",
    "Carving Knives",
    "Chef Knives",
    "Cleaver",
    "Filleting Knives",
    "Gyuto Knives",
    "Higonokami Knives",
    "Kiritsuke Knives",
    "Petty Knives",
  ]
  const knifeOrigins = [
    "Japanese Knives",
    "British Knives",
    "German Knives",
    "Chinese Knives",
  ]
  const makeProcesses = ["Machine made", "Handmade"]

  //Set key product categories
  useEffect(() => {
    if (product.categories.length > 0) {
      product.categories.forEach(category => {
        //Knife type
        if (knifeTypes.includes(category.name)) {
          setKnifeType(category)
        }
        //Knife Origin
        if (knifeOrigins.includes(category.name)) {
          setKnifeOrigin(category)
        }

        //Knife Make Process
        if (makeProcesses.includes(category.name)) {
          setKnifeMakeProcess(category)
        }
      })
    }
  }, [])

  //Create product categories array and primary category field for SEO component
  useEffect(() => {
    if (knifeOrigin !== "") {
      setProductCategories(productCategories => [
        ...productCategories,
        knifeOrigin,
      ])
    }
    if (knifeType !== "") {
      setProductCategories(productCategories => [
        ...productCategories,
        knifeType,
      ])
    }
    if (knifeMakeProcess !== "") {
      setProductCategories(productCategories => [
        ...productCategories,
        knifeMakeProcess,
      ])
    }
    if (knifeOrigin.name == "Japanese Knives") {
      setPrimaryProductCategory(knifeOrigin)
    } else {
      setPrimaryProductCategory(knifeType)
    }
  }, [knifeOrigin, knifeMakeProcess, knifeType])

  //Product data for loading Stripe checkout
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

  return (
    <Layout>
      <SEO
        title={product.name}
        product={product}
        primaryProductCategory={primaryProductCategory}
      />
      {console.log("info", stripeProductInfo.id)}

      <div className="row productPage">
        <div className="col-12 col-md-10 offset-md-1">
          <ProductBreadcrumbs
            product={product}
            categories={productCategories}
          />
        </div>

        <div className="col-12 col-md-10 offset-md-1 offset-lg-7 col-lg-4 mt-lg-4 pt-md-3 fixed-top-desktop">
          {width < 991 && (
            <h1 style="font-weight: 800" className="headline">
              {parse(product.name)}
            </h1>
          )}
          <a href="#buy-now" className="buyTitle button-mobile">
            Buy now <BiDownArrowAlt className="arrowIcon" size={15} />
          </a>
        </div>

        {width >= 991 && (
          <AddToCart
            product={product}
            handlePurchase={handlePurchase}
            productCategories={productCategories}
          />
        )}

        <div
          id="productInfo"
          className="col-12 offset-md-1 col-md-10 col-lg-5 offset-lg-1"
        >
          <GatsbyImage
            image={product.images[0].localFile.childImageSharp.gatsbyImageData}
            alt={product.images[0].alt}
            className="mt-0"
          />
          <p>{parse(product.short_description)}</p>
        </div>

        {width < 991 && (
          <AddToCart
            product={product}
            handlePurchase={handlePurchase}
            productCategories={productCategories}
          />
        )}

        <div className="col col-lg-4 spacer-div">&nbsp;</div>

        <div id="productInfo" className="col-12 col-md-10 col-lg-5 offset-md-1">
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
      categories {
        name
        slug
      }
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
