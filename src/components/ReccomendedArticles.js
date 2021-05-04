import React from "react"
import { Link } from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { BiRightArrowAlt } from "react-icons/bi"

export default function ReccomendedArticles(props) {
  const title = props.post.title

  return (
    <div className="row no-gutters my-3 blogRow">
      <div className="col-md-5 image-wrapper">
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
      <div className="col-md-7 content-col">
        <div className="recommendedArticles">
          <article itemScope itemType="http://schema.org/Article">
            <header className="recommendedHeader">
              <h3 className="title">
                <Link to={props.post.uri} itemProp="url">
                  <span itemProp="headline">{parse(title)}</span>
                </Link>
              </h3>
            </header>
            <section className="article-excerpt" itemProp="description">
              {parse(props.post.excerpt)}<span>... Continue reading <Link to={props.post.uri} className="continue-reading">{`${props.post.title}`}</Link></span>
              <div class="cardFlexBox">
                <Link to={props.post.uri} itemProp="url">
                  <button className="readArticle">
                    Read full article <BiRightArrowAlt />
                  </button>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </div>
    </div>

  )
}
