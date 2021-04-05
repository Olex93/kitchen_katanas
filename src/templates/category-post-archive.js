import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/blogArchive.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import HorizontalBlogCard from "../components/HorizontalBlogCard"

const CategoryArchive = (
  { data, pageContext: { categoryName, categoryLink } },
  props
) => {
  const posts = data.allPosts.nodes

  if (!posts.length) {
    return (
      <Layout>
        <SEO title="No posts" />
        <Bio />
        <p>No blog posts found for this category</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title="All posts" />
      <div className="row justify-content-center blog-content-list">
        <div className="col-lg-10 ">
          <h1>{categoryName}</h1>

          <p className="intro">
            Hey 👋 I'm Alex and this is my blog.
            <span>
              {" "}
              I started Kitchen Katanas to bring quality kitchen knives to the
              everyday home cook. Here, I share my own experience as an avid
              cook, as I continue to journey into the world of quality kitchen
              knives.
            </span>
          </p>
          <div>
            {/* ALL ARTICLES */}
            <div className="allArticles">
              <h2 className="brown-underline">All articles</h2>
              <ol className="blogs-list">
                {posts.map(post => {
                  return <HorizontalBlogCard post={post} />
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryArchive

export const categoryQuery = graphql`
  query getSpecificCategoryPosts($categoryName: String) {
    allPosts: allWpPost(
      filter: {
        categories: { nodes: { elemMatch: { name: { eq: $categoryName } } } }
      }
      sort: { fields: [date], order: DESC }
    ) {
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
          }
        }
        author {
          node {
            firstName
          }
        }
      }
    }
  }
`
