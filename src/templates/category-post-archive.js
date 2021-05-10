import React from "react"
import { Link, graphql } from "gatsby"
// import parse from "html-react-parser"
import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import "../styles/blogArchive.scss"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import HorizontalBlogCard from "../components/HorizontalBlogCard"


const CategoryArchive = (
  { data, pageContext: { categoryName, categoryLink, categoryDescription } },
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
    <Layout >
      <SEO title={`${categoryName} Archive`} categoryArchive="true" description={categoryDescription} />
      <div className="row justify-content-center blog-content-list">
        <div className="col-xl-10 col-12">
          <h1>{categoryName}</h1>

          <p className="intro">
            {categoryDescription}
          </p>
          <div>
            {/* ALL ARTICLES */}
            <div className="allArticles">
              <h2 className="brown-underline">All articles</h2>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb-list">
                  <li className="breadcrumb-link">
                    <Link className="breadcrumb-text" to={"/"}>Home</Link>
                  </li>
                  <li className="breadcrumb-link">
                    <Link className="breadcrumb-text" to={"/kitchen-knife-101"}>Kitchen Knife 101</Link>
                  </li>
                  <li className="breadcrumb-link" aria-current="page">
                    <p className="breadcrumb-text active">{categoryName}</p>
                  </li>
                </ol>
              </nav>
              <ol className="blogs-list">
                {posts.map((post, index) => {
                  return <HorizontalBlogCard post={post} key={index} index={index}/>
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
            uri
            description
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
