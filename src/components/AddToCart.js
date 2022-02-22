import React from "react"
import { useShoppingCart } from "use-shopping-cart"
import {
  BiCart,
  BiMailSend,
  BiPurchaseTag,
  BiRightArrowAlt,
} from "react-icons/bi"
import { Link, graphql } from "gatsby"
import CartOverview from "../components/CartOverview"
import parse from "html-react-parser"
import useWindowDimensions from "../utils/windowDimensions"

export default function AddToCart(props) {
  const { product, handlePurchase, productCategories } = props
  const { cartCount, redirectToCheckout } = useShoppingCart()
  const { height, width } = useWindowDimensions()

  return (
    <div
      id="buy-now"
      className="col-12 col-md-10 offset-md-1 col-lg-4 offset-lg-7 fixed-top-desktop cart"
    >
      <div className="pt-lg-1">
        {width >= 991 && (
          <h1 style="font-weight: 800" className="headline">
            {parse(product.name)}
          </h1>
        )}
        <h3 className="buyTitle mt-lg-0">Buy Now</h3>
        <p className="mt-lg-2">
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
        <p>
          Total price: £{JSON.parse(product.price) + ".00"}{" "}
          {product.sale_price && (
            <span className="salePrice">
              - (Savings: {product.regular_price - product.sale_price}.00)
            </span>
          )}
        </p>
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
          purchasing this product, you agree that you satisfy this requirement.
        </p>

        <hr className="mb-4" />

        <div>
          {product.stock_quantity > 0 ? (
            <button
              className={`fullWidthButton mb-2`}
              onClick={() => handlePurchase()}
            >
              <BiCart style={{ marginRight: 10 }} size={30} /> add to cart
            </button>
          ) : (
            <button
              className={`fullWidthButton mb-2`}
              onClick={() => handlePurchase()}
            >
              <BiMailSend style={{ marginRight: 10 }} size={30} /> enquire now
            </button>
          )}
          {cartCount > 0 && (
            <button
              className="fullWidthButton mb-3 checkout"
              onClick={() => redirectToCheckout()}
            >
              checkout now
            </button>
          )}
        </div>

        <hr className="mb-4 mt-3" />

        <div className="tags">
          <BiPurchaseTag size={30} />
          {productCategories.map(category => {
            return (
              <Link
                to={`/kitchen-knives/${category.slug}/`}
                className="tagButton"
              >
                {category.name}{" "}
                <BiRightArrowAlt className="arrowIcon" size={15} />
              </Link>
            )
          })}
        </div>

        {/* <CartOverview /> */}
      </div>
    </div>
  )
}
