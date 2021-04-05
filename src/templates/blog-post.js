import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ShareButtons from "../components/ShareButtons"
import "../styles/blogSingle.scss"
import { forEach } from "lodash"

const BlogPostTemplate = ({ data: { previous, next, post } }, props) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const title = `Read ${post.title} `
  const tags = post.categories.nodes.map(category => {
    return category.name.toString().replace(/ +/g, "")
  })

  const url = `https://www.kitchen-katanas.com${post.uri}`

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} />
      <div className="blog-single">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className="row justify-content-center">
            <div className="col-12 col-lg-10">
              <header>
                <div className="title-image-wrapper">
                  <div className="row">
                    <div className="col-9">
                      <h1 itemProp="headline">{parse(post.title)}</h1>
                    </div>
                    <div className="col-3">
                      <ShareButtons
                        className="share-buttons"
                        title={title}
                        url={url}
                        tags={tags}
                      />
                    </div>
                  </div>

                  {/* if we have a featured image for this post let's display it */}
                  {featuredImage?.fluid && (
                    <Image
                      fluid={featuredImage.fluid}
                      alt={featuredImage.alt}
                      style={{
                        maxHeight: "250px",
                        width: "100%",
                      }}
                      className="header-image"
                    />
                  )}
                  <div className="title-content">
                    <p>
                      <span>{post.author.node.firstName}</span>{" "}
                      <span>{post.author.node.lastName}</span>
                    </p>
                    <p>{post.date}</p>
                    <ul className="breadcrumbs">
                      {/* <li>
                        <Link to={"/"}>Kitchen Knife 101</Link>
                      </li> */}
                      <li>
                        <Link to={"/kitchen-knife-101"}>Kitchen Knife 101</Link>
                      </li>
                    </ul>
                    <ul className="categoriesList">
                      {post.categories.nodes.map(category => {
                        return (
                          <li>
                            <Link to={category.link}>{category.name}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </header>
            </div>
          </div>
          <div class="row justify-content-center content">
            <div class="col-12 col-lg-10">
              {!!post.content && (
                <section itemProp="articleBody">{parse(post.content)}</section>
              )}

              <hr />

              <footer>
                <Bio />
              </footer>
            </div>
          </div>
        </article>

        <nav className="blog-post-nav">
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.uri} rel="prev">
                  ← {parse(previous.title)}
                </Link>
              )}
            </li>

            <li>
              {next && (
                <Link to={next.uri} rel="next">
                  {parse(next.title)} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostById(
    # these variables are passed in via createPage.pageContext in gatsby-node.js
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    # selecting the current post by id
    post: wpPost(id: { eq: $id }) {
      id
      excerpt
      content
      title
      uri
      author {
        node {
          firstName
          lastName
        }
      }
      date(formatString: "MMMM DD, YYYY")
      categories {
        nodes {
          name
          link
        }
      }

      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              fluid(maxWidth: 1000, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }

    # this gets us the previous post by id (if it exists)
    previous: wpPost(id: { eq: $previousPostId }) {
      uri
      title
    }

    # this gets us the next post by id (if it exists)
    next: wpPost(id: { eq: $nextPostId }) {
      uri
      title
    }
  }
`
