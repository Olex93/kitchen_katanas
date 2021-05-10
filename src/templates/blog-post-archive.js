import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/blogArchive.scss"

// import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import FeaturedBlogCard from "../components/featuredBlogCard"
import HorizontalBlogCard from "../components/HorizontalBlogCard"
// import Slider from "react-slick";


const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allPosts.nodes
  const featuredPosts = data.featuredPosts.nodes

  // const settings = {
  //   dots: true,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: 2,
  //   slidesToScroll: 1
  // };

  if (!posts.length) {
    return (
      <Layout>
        <SEO title="Kitchen Katanas: articles, guides and reviews." />
        <Bio />
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
      <div className="row justify-content-center blog-content-list">
        <div className="col-12 col-xl-10 ">
          <h1>Kitchen knife 101</h1>
          <p className="intro">
            Here's everything I wish I knew back when I started buying decent knives!
            <span>
              {" "}
              Learn what makes a great knife, how to look after your knives, which knives suite what and more...
            </span>
          </p>
          <div>
            {/* FEATURED ARTICLES */}
            {/* <div className="featured-wrapper">
              <h2 className="brown-underline">Featured articles</h2>
              <div className="featuredArticles  ">
                <Slider {...settings}>
                  {featuredPosts.map((post, index) => {
                    return (
                      <div>
                      <FeaturedBlogCard post={post} key={post.uri} index={index} />
                      </div>
                    )
                  })}
                </Slider>
              </div>
            </div> */}

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
      <div className="row justify-content-center">
        <div className="col-10">
          {previousPagePath && (
            <>
              <Link to={previousPagePath}>Previous page</Link>
              <br />
            </>
          )}
          {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allPosts: allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        featuredImage {
          node {
            link
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
    featuredPosts: allWpPost(
      sort: { fields: [date], order: DESC }
      limit: 3
      skip: 0
      filter: { isSticky: { eq: true } }
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "DD MM YY")
        title
        excerpt
        author {
          node {
            firstName
            lastName
          }
        }
        categories {
          nodes {
            name
            uri
          }
        }
        featuredImage {
          node {
            link
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
      }
    }
  }
`
