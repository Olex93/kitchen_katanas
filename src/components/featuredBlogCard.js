import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { post } from "jquery"
import ShareButtons from "../components/ShareButtons"
import { BiShareAlt } from "react-icons/bi"

export default function FeaturedBlogCard(props) {
  const categories = props.post.categories.nodes.map(category => {
    return category.name.toString()
  })

  const tags = props.post.categories.nodes.map(category => {
    return category.name.toString().replace(/ +/g, "")
  })

  return (
    <div className="col-12 col-lg-4 col-sm-6 ">
      <article itemScope itemType="http://schema.org/Article">
        <div class="example-1 template-card">
          <div class="wrapper">
            <div class="date">
              <span class="day">{props.post.date}</span>
            </div>
            {props.post.featuredImage && (
              <GatsbyImage
                image={getImage(props.post.featuredImage.node.localFile)}
                alt={props.post.featuredImage.altText}
                layout="fluid"
              />
            )}
            <div class="data">
              <div class="content">
                <span class="author">{`${props.post.author.node.firstName} ${props.post.author.node.lastName}`}</span>
                <h3 class="title">
                  <Link to={props.post.uri} itemProp="url">
                    <span>{props.post.title}</span>
                  </Link>
                </h3>
                <p className="text article-excerpt">
                  {parse(props.post.excerpt)}
                </p>
                <label for={`show-menu${props.post.uri}`} class="menu-button">
                  <BiShareAlt className="shareButton" />
                </label>
              </div>
              <input type="checkbox" id={`show-menu${props.post.uri}`} />
              <div class="menu-content">
                <ShareButtons
                  title={props.post.title}
                  url={`https://www.kitchen-katanas.com${props.post.uri}`}
                  tags={tags}
                />
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
