import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/productArchive.scss"
import ProductCard from "../components/ProductCard"
import { filterProductsGlobalState, selectedFiltersGlobalState } from "../store"
import { useRecoilState } from "recoil"
import ProductFilterLeftBar from "../components/ProductFilterLeftBar"

import CartOverview from "../components/CartOverview"
import { loadStripe } from "@stripe/stripe-js"
import { CartProvider } from "use-shopping-cart"
const stripePromise = loadStripe(process.env.GATSBY_STRIPE_PUBLISHABLE_KEY)


const ProductIndex = ({ pageContext: { products, pageSlug } }) => {
  const [filteredProducts, setFilteredProducts] = useRecoilState(
    filterProductsGlobalState
  )
  const [selectedFilters] = useRecoilState(selectedFiltersGlobalState)

  //---------------- FILTER THE PRODUCTS USING THE SELECTED FILTERS GLOBAL ARRAY --------------
  const filterProducts = () => {
    if (selectedFilters.length == 0) {
      setFilteredProducts(products)
    } else {
      //Empty out filtered products
      setFilteredProducts([])

      products.forEach(product => {
        const productCategories = []
        //get a list of all of the product's categories
        product.categories.forEach(category => {
          productCategories.push(category.name)
        })

        //check if the product categories contains the selected filter categories
        if (
          selectedFilters.every(filterItem =>
            productCategories.includes(filterItem)
          )
        ) {
          //add the product to filteredProducts list
          setFilteredProducts(filterProducts => [...filterProducts, product])
        } else {
          console.log("not found")
        }
      })
    }
  }

  useEffect(() => {
    // console.log("Use effect selected filters", selectedFilters)
    filterProducts()
  }, [selectedFilters])

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
    <Layout>
      <SEO title="All posts" />
      <div className="productArchive container-fluid">
        <div className="row">
          <div className="col-3 desktopFilter">
            <ProductFilterLeftBar />
          </div>
          <div className="col-9">
            <div className="productTiles row">
              {/* <CartProvider
                mode="client-only"
                stripe={stripePromise}
                successUrl={`${window.location.origin}/kitchen-knives/`}
                cancelUrl={`${window.location.origin}/kitchen-knives/`}
                currency="GBP"
                allowedCountries={["US", "GB", "CA"]}
                billingAddressCollection={true}
              > */}
                {/* ------------------------------ Mapping through products here --------------------- */}
                {filteredProducts.map(product => {
                  return <ProductCard product={product} />
                })}
                {/* <CartOverview /> */}
              {/* </CartProvider> */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductIndex
