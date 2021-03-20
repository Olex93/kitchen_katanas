import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

export default function FeaturedBlogCard(props) {
  console.log(props.post)
  return (
    <div className="col-12 col-md-4 ">
      <div className="featuredArticle">
        <article itemScope itemType="http://schema.org/Article">
          <header>
            <h2>
              <Link to={props.post.uri} itemProp="url">
                <span itemProp="headline">{parse(props.post.title)}</span>
              </Link>
            </h2>

            {props.post.featuredImage && (
              <GatsbyImage
                image={getImage(props.post.featuredImage.node.localFile)}
                alt={props.post.featuredImage.altText}
              />
            )}
            <small>{props.post.date}</small>
          </header>
          <section itemProp="description">{parse(props.post.excerpt)}</section>
        </article>
      </div>
    </div>
  )
}
