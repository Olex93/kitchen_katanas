import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { post } from "jquery"
import ShareButtons from "../components/ShareButtons"
import { BiShareAlt } from "react-icons/bi"
import { motion } from "framer-motion"
import { AnimateSharedLayout } from "framer-motion"


export default function FeaturedBlogCard(props) {
  const categories = props.post.categories.nodes.map(category => {
    return category.name.toString()
  })

  const tags = props.post.categories.nodes.map(category => {
    return category.name.toString().replace(/ +/g, "")
  })

  const postLink = `${props.post.uri}/`


  const [showExcerpt, setShowExcerpt] = React.useState(false)


  return (
    <motion.div>
      <article itemScope itemType="http://schema.org/Article">
        <div
          class="example-1 template-card"
          onMouseEnter={() => setShowExcerpt(true)}
          onMouseLeave={() => setShowExcerpt(false)}
        >
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
              <AnimateSharedLayout>
                <motion.div layout>
                <input type="checkbox" id={`show-menu${postLink}`} />
                  <div class="menu-content">
                    <ShareButtons
                      title={props.post.title}
                      url={`https://www.kitchen-katanas.com${postLink}`}
                      tags={tags}
                    />
                  </div>
                  <div class="content">
                    <motion.span layout class="author">{`${props.post.author.node.firstName} ${props.post.author.node.lastName}`}</motion.span>
                    <h3 class="title">
                      <Link to={postLink} itemProp="url">
                        <span >{props.post.title}</span>
                      </Link>
                    </h3>
                    <div className="excerptText">
                      {showExcerpt && parse(props.post.excerpt)}
                    </div>

                    <label for={`show-menu${postLink}`} class="menu-button">
                      <BiShareAlt className="shareButton" />
                    </label>
                  </div>
                </motion.div>
              </AnimateSharedLayout>


            </div>
          </div>
        </div>
      </article>
    </motion.div>

  )
}
