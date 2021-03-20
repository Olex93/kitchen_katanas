import React from "react"
import { Link, graphql } from "gatsby"
import parse from "html-react-parser"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/blogArchive.scss"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import FeaturedBlogCard from "../components/featuredBlogCard"

const BlogIndex = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}) => {
  const posts = data.allPosts.nodes
  const featuredPosts = data.featuredPosts.nodes

  if (!posts.length) {
    return (
      <Layout>
        <SEO title="All posts" />
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
        <div className="col-10">
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
          <div className="titleWrapper">
            <h1>Kitchen Knife 101</h1>
            <p>Featured articles</p>

            {/* FEATURED ARTICLES */}
            <div className="featuredArticles row ">
              {featuredPosts.map(post => {
                return <FeaturedBlogCard post={post} key={post.uri} />
              })}
            </div>

            {/* ALL ARTICLES */}
            <div className="allArticles">
              <p>All articles</p>
              <ol style={{ listStyle: `none` }}>
                {posts.map(post => {
                  const title = post.title

                  return (
                    <li key={post.uri}>
                      <article itemScope itemType="http://schema.org/Article">
                        <header>
                          <h2>
                            <Link to={post.uri} itemProp="url">
                              <span itemProp="headline">{parse(title)}</span>
                            </Link>
                          </h2>
                          <small>{post.date}</small>
                        </header>
                        <section itemProp="description">
                          {parse(post.excerpt)}
                        </section>
                      </article>
                    </li>
                  )
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
        excerpt
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
        title
        excerpt
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
