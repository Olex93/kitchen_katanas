import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ShareButtons from "../components/ShareButtons"
import { BiShareAlt, BiRightArrowAlt } from "react-icons/bi"

export default function FeaturedBlogCard(props) {
  const title = props.post.title.toLowerCase()
  const categoriesArray = props.post.categories.nodes

  const tags = props.post.categories.nodes.map(category => {
    if (category !== "Uncategorized") {
      return category.name.toString().replace(/ +/g, "")
    }
  })

  // console.log(props.post.categories.nodes)
  return (
    <li className="blogLi" key={props.post.id}>
      <div className="container-fluid">
        <div className="row p-0 blogRow">
          <div className="col-md-9 content-col">
            <article itemScope itemType="http://schema.org/Article">
              <header>
                <p className="published">
                  <span>{`${props.post.author.node.firstName} ${props.post.author.node.lastName}`}</span>
                  , <span>{props.post.date}</span>
                </p>
                <h3 className="title">
                  <Link to={props.post.uri} itemProp="url">
                    <span itemProp="headline">{parse(title)}</span>
                  </Link>
                </h3>
              </header>
              <section className="article-text" itemProp="description">
                {parse(props.post.excerpt)}
                <div class="cardFlexBox">
                  <button className="readArticle">
                    Read full article <BiRightArrowAlt />
                  </button>
                  <div>
                    {categoriesArray.length == 1 &&
                      categoriesArray[0].name !== "Uncategorized" && (
                        <p class="pHeading">category:</p>
                      )}
                    {categoriesArray.length > 1 &&
                      categoriesArray[0].name !== "Uncategorized" && (
                        <p class="pHeading">categories:</p>
                      )}
                    <ul>
                      {categoriesArray.map(category => {
                        if (category.name !== "Uncategorized") {
                          return (
                            <li>
                              <button className="category-button">
                                <Link to={category.uri} itemProp="url">
                                  {category.name} <BiRightArrowAlt />
                                </Link>
                              </button>
                            </li>
                          )
                        }
                      })}
                    </ul>
                  </div>
                </div>
              </section>
              <ShareButtons
                title={props.post.title}
                url={`https://www.kitchen-katanas.com${props.post.uri}`}
                tags={tags}
                className="social-share"
              />
            </article>
          </div>
          <div className="col-md-3 p-0">
            {props.post.featuredImage && (
              <GatsbyImage
                className="blogImg"
                image={getImage(props.post.featuredImage.node.localFile)}
                alt={props.post.featuredImage.altText}
                layout="fluid"
                width={200}
                height={200}
              />
            )}
          </div>
        </div>
      </div>
    </li>
  )
}
