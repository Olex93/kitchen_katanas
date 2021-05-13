import React from "react"
import { Link} from "gatsby"
import parse from "html-react-parser"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ShareButtons from "../components/ShareButtons"
import { BiRightArrowAlt } from "react-icons/bi"

export default function FeaturedBlogCard(props) {
  const title = props.post.title
  const categoriesArray = props.post.categories.nodes

  const tags = props.post.categories.nodes.map(category => {
    if (category !== "Uncategorized") {
      return category.name.toString().replace(/ +/g, "")
    }
  })


  const postLink = `${props.post.uri}/`
  console.log(props.index)

  // console.log(props.post.categories.nodes)
  return (
    <li className="blogLi" key={props.post.id}>
      <div className="container-fluid">

        <div className={`row p-0 blogRow ${props.index % 2 == 0 ? "justify-content-start" : "justify-content-end"}`}>
        {props.index % 2 == 0  && 
          <div className="col-md-5 pb-md-5 pl-md-0 image-wrapper p-0">
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
          </div>}
          <div className="col-md-7 content-col p-md-0 mt-md-2">
            <article itemScope itemType="http://schema.org/Article">
              <header>
                <p className="published">
                  <span>{`${props.post.author.node.firstName} ${props.post.author.node.lastName}`}</span>
                  , <span>{props.post.date}</span>
                </p>
                <h3 className="title">
                  <Link to={postLink} itemProp="url">
                    <span itemProp="headline">{parse(title)}</span>
                  </Link>
                </h3>
              </header>
              <section className="article-excerpt" itemProp="description">
                {parse(props.post.excerpt)}<span>... Continue reading <Link to={postLink} className="continue-reading">{`${props.post.title}`}</Link></span>
                <div class="cardFlexBox">
                  <Link to={postLink} itemProp="url">
                    <button className="readArticle">
                      Read full article <BiRightArrowAlt />
                    </button>
                  </Link>
                  <div className="dropdown">
                      {categoriesArray[0].name !== "Uncategorized" && (
                        <button className="category-button dropdown-toggle" type="button" id="category-dropdown-button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Categories:</button>
                      )}
                    <ul className="dropdown-menu category-dropdown"  aria-labelledby="category-dropdown-button">
                      {categoriesArray.map(category => {
                        if (category.name !== "Uncategorized") {
                          return (
                            <li>
                                <Link to={`${category.uri}/`} itemProp="url">
                                  {category.name} <BiRightArrowAlt />
                                </Link>
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
                url={`https://www.kitchen-katanas.com${postLink}`}
                tags={tags}
                className="social-share"
              />
            </article>
          </div>
          {props.index % 2 !== 0 && 
          <div className="col-md-5 pb-md-5 pr-md-0 image-wrapper p-0">
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
          </div>}

        </div>

      </div>
    </li>
  )
}
