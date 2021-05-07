import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"
import parse from "html-react-parser"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

import Layout from "../components/layout"
import SEO from "../components/seo"
import ShareButtons from "../components/ShareButtons"
import "../styles/blogSingle.scss"
import { BiListUl } from "react-icons/bi"
import ReccomendedArticles from "../components/ReccomendedArticles"
import { AnimateSharedLayout, motion } from "framer-motion"


const BlogPostTemplate = (
  { data: { previous, next, post, relatedCategories } },
  props
) => {
  const featuredImage = {
    fluid: post.featuredImage?.node?.localFile?.childImageSharp?.fluid,
    alt: post.featuredImage?.node?.alt || ``,
  }

  const title = `Read ${post.title} `
  const tags = post.categories.nodes.map(category => {
    return category.name.toString().replace(/ +/g, "")
  })
  const url = `https://www.kitchen-katanas.com${post.uri}`

  // console.log(relatedCategories.nodes)

  const [visibleHeadings, setVisibleHeadings] = React.useState(null)

  React.useEffect(() => {
    //These next 5 lines parse the html content retrieved from wordpress API and
    // pull out headings to use in the table of contents
    const rawContent = post.content
    var postContent = document.createElement("html")
    postContent.innerHTML = rawContent
    var headingsHTML = postContent.getElementsByTagName("h2")
    var headings = [].slice.call(headingsHTML)

    const bodyHeadings = document.querySelectorAll("h2")
    for (var i = 0; i < bodyHeadings.length; i++) {
      bodyHeadings[i].setAttribute(
        "id",
        bodyHeadings[i].innerHTML.replace(/ +/g, "-").toLowerCase()
      )
    }

    setVisibleHeadings(headings)
  }, [])

  return (
    <Layout>
      <SEO title={post.title} description={post.excerpt} post={post} />
      <div className="blog-single">
        <article
          className="blog-post"
          itemScope
          itemType="http://schema.org/Article"
        >
          <div className="row ">
            <div className="col-12 col-lg-12 col-xl-10 mr-auto ml-auto">
              <header>
                <div className="title-image-wrapper">
                  <div className="row">
                    <div className="col-12 col-md-8">
                      <h1 itemProp="headline">{parse(post.title)}</h1>
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb-list">
                          <li className="breadcrumb-link">
                            <Link className="breadcrumb-text" to={"/"}>
                              Home
                            </Link>
                          </li>
                          <li className="breadcrumb-link">
                            <Link
                              className="breadcrumb-text"
                              to={"/kitchen-knife-101"}
                            >
                              Kitchen Knife 101
                            </Link>
                          </li>
                          <li className="breadcrumb-link">
                            {post.categories.nodes.length == 1 ? (
                              <Link
                                className="breadcrumb-text"
                                to={post.categories.nodes[0].link}
                              >
                                {post.categories.nodes[0].name}
                              </Link>
                            ) : (
                              <div className="dropdown show">
                                <a
                                  className="dropdown-toggle breadcrumb-text"
                                  href="#"
                                  role="button"
                                  id="dropdownMenuLink"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Categories
                                </a>

                                <div
                                  class="dropdown-menu breadcrumb-dropdown"
                                  aria-labelledby="dropdownMenuLink"
                                >
                                  <ul>
                                    {post.categories.nodes.map(
                                      (category, index) => {
                                        return (
                                          <>
                                            <li>
                                              <Link
                                                className="breadcrumb-text"
                                                to={category.link}
                                              >
                                                {category.name}
                                              </Link>
                                            </li>
                                          </>
                                        )
                                      }
                                    )}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </li>
                          <li class="breadcrumb-link " aria-current="page">
                            <p class="breadcrumb-text active">{post.title}</p>
                          </li>
                        </ol>
                      </nav>
                    </div>
                    <div className="col-12 col-md-4 mt-auto text-md-right">
                      <p class="author d-none d-md-inline-block">
                        <span>{post.author.node.firstName}</span>{" "}
                        <span>{post.author.node.lastName}</span>
                        <span className="date">{post.date}</span>
                      </p>
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
                  <div className="share-content">
                    <ShareButtons
                      className="share-buttons"
                      title={title}
                      url={url}
                      tags={tags}
                    />
                  </div>
                </div>
              </header>
            </div>
          </div>

          <div class="row post-content justify-content-start">
            <div class="col-0 col-xl-1"></div>
            <div class="col-12 col-md-4 col-lg-3">
              <hr></hr>
              <p className="tableOfContentsTitle pHeading">
                <BiListUl /> Table of contents
              </p>
              {visibleHeadings !== null && (
                <ol className="tableOfContents">
                  {visibleHeadings.map((heading, index) => {
                    return (
                      <li>
                        <a
                          href={`#${heading.innerHTML
                            .replace(/ +/g, "-")
                            .toLowerCase()}`}
                        >
                          {heading.innerHTML}
                        </a>
                      </li>
                    )
                  })}
                </ol>
              )}
            </div>
            <div class="col-12 col-md-7 col-lg-8 col-xl-6 ml-md-5 mr-lg-auto">
              {!!post.content && (
                <section itemProp="articleBody">{parse(post.content)}</section>
              )}
              <footer></footer>
            </div>
          </div>
        </article>
        <AnimateSharedLayout >
          <motion.div layout className="more-blog-content row  justify-content-center">
            {/* <div class="col-12 col-md-5">
              <hr></hr>
              <p className="pHeading">Recent articles</p>
            </div> */}
            <div class="col-10">
              <hr></hr>
              <p className="pHeading">More articles in this category</p>
              <div className="row">
              {relatedCategories.nodes.map((relatedPost, index) => {
                if (relatedPost.title !== post.title) {
                  return (
                    <div className="col-6">
                    <ReccomendedArticles layout post={relatedPost} key={index} />
                    </div>
                  )
                }
              })}
              </div>
            </div>
            {/* <div class="col-12 col-md-5 justify-content-end">
              <ShareButtons />
            </div> */}
          </motion.div>
        </AnimateSharedLayout>

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
    $relatedCategories: [String]
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

    relatedCategories: allWpPost(
      filter: {
        categories: {
          nodes: { elemMatch: { name: { in: $relatedCategories } } }
        }
      }
    ) {
      nodes {
        title
        uri
        excerpt
        id
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
