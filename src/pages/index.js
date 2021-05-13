import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import homestyles from "../styles/home.scss"
import HorizontalBlogCard from "../components/HorizontalBlogCard"


// Current Styles, query and content taken from category template page 

export default (
  { data, pageContext: { categoryName, categoryLink } },
  props) => {
  const posts = data.allPosts.nodes

  return <Layout >
    <SEO title="Kitchen Katanas" description="Top quality kitchen knives for the everyday home cook. Learn how you can source sharp, handmade knives for a reasonable price."/>
        {/* <Link to={'/kitchen-knife-101/'} itemProp="url">
                      <span itemProp="headline">Visit the blog</span>
        </Link> */}

    <div className="row justify-content-center blog-content-list">
      <div className="col-lg-10 ">
        <h1>Kitchen Katanas</h1>

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
              {posts.map((post, index) => {
                return <HorizontalBlogCard post={post} key={index} index={index} />
              })}
            </ol>
          </div>
        </div>
      </div>
    </div>

  </Layout>
}


export const homeQuery = graphql`
  query getPosts {
    allPosts: allWpPost(
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
  }
`
