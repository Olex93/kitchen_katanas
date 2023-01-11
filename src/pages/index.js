import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import homestyles from "../styles/home.scss"
import HorizontalBlogCard from "../components/HorizontalBlogCard"
import { GatsbyImage } from "gatsby-plugin-image"
import CarouselControls from "../components/CarouselControls"
import ArrowIcon from "../components/ArrowIcon"

// Current Styles, query and content taken from category template page

export default (
  { data, pageContext: { categoryName, categoryLink } },
  props
) => {
  const posts = data.allPosts.nodes
  const featuredProducts = data.featuredProducts.nodes
  console.log(featuredProducts)

  return (
    <Layout>
      <SEO
        title="Kitchen Katanas"
        description="Top quality kitchen knives for the everyday home cook. Learn how you can source sharp, handmade knives for a reasonable price."
      />
      {/* <Link to={'/kitchen-knife-101/'} itemProp="url">
                      <span itemProp="headline">Visit the blog</span>
        </Link> */}

      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-6 col-xl-5 mb-5 text-center">
          <h1 className="homeTitle text-center">Kitchen Katanas</h1>
          <p className="text-center standfirst mb-4">
            The UK's number 1 retailer of properly sharp kitchen knives
          </p>
          <Link to="kitchen-knives/"><button className="homeCTAbutton mb-5 readArticle">View our full range <ArrowIcon height="40px" width="40px" color="#fff" /></button></Link>
        </div>
      </div>

      <div className="row  blog-content-list homepage justify-content-center mb-5">
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="mostPopular p-lg-4 p-xl-5">
            <h2 className="productHeading">Trending Products</h2>
            <div
              id="carouselExampleIndicators"
              class="carousel slide"
              data-ride="carousel"
            >
              <ol class="carousel-indicators">
                {featuredProducts.map((product, index) => {
                  return (
                    <li
                      data-target="#carouselExampleIndicators"
                      data-slide-to={index}
                      class={index == 0 ? "active" : ""}
                    ></li>
                  )
                })}
              </ol>
              <div class="carousel-inner">
                {featuredProducts.map((product, index) => {
                  return (
                    <div
                      class={
                        index == 0 ? "carousel-item active" : "carousel-item"
                      }
                    >
                      <div class="productCardWrapper ">
                        <Link to={`kitchen-knives/${product.slug}/`}>
                          <div className="productCardHeader">
                            <span>{product.name}</span>
                          </div>
                          <GatsbyImage
                            image={
                              product.images[0].localFile.childImageSharp
                                .gatsbyImageData
                            }
                            alt={product.images[0].alt}
                            className="mt-0 gatsbyImage"
                          />
                          <button className="productCardButton">
                            View product{" "}
                            <ArrowIcon
                              color="#fff"
                              height="30px"
                              width="30px"
                            />{" "}
                          </button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
              <CarouselControls />
            </div>
          </div>
        </div>

        <div className="col-12 col-xl-8 col-lg-7 ">
          {/* ALL ARTICLES */}
          <div className="allArticles p-lg-4 p-xl-5">
            <h2 className="brown-underline">Recent blog posts</h2>
            <ol className="blogs-list">
              {posts.map((post, index) => {
                return (
                  <HorizontalBlogCard post={post} key={index} index={index} />
                )
              })}
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const homeQuery = graphql`
  query getPosts {
    allPosts: allWpPost(sort: { fields: [date], order: DESC }) {
      nodes {
        id
        uri
        title
        date(formatString: "DD MM YYYY")
        excerpt
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid {
                  src
                }
                gatsbyImageData
              }
            }
            altText
          }
        }
        categories {
          nodes {
            name
            link
            uri
          }
        }
        author {
          node {
            firstName
            lastName
          }
        }
      }
    }
    featuredProducts: allWcProducts(
      filter: { categories: { elemMatch: { slug: { eq: "featured" } } } }
    ) {
      nodes {
        id
        slug
        name
        images {
          alt
          localFile {
            childImageSharp {
              gatsbyImageData
            }
            name
          }
        }
      }
    }
  }
`
